// Helper functions used on all pages.

// ---------- data ----------
// The website works without a server: all data lives in data.js (the DATA object).
// apiGet / apiPost keep the same shape as a real REST API, so the pages do not care where data comes from.

var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
var PHONE_RE = /^\+?[0-9\s()-]{7,20}$/;

function pick(row, field, lang) {
  return row[field + '_' + lang];
}

function toInt(value, fallback, min, max) {
  var number = parseInt(value, 10);
  if (isNaN(number)) return fallback;
  return Math.min(Math.max(number, min), max);
}

function agoToIso(minutes) {
  return new Date(Date.now() - minutes * 60000).toISOString();
}

function paginate(list, params, defaultLimit, maxLimit) {
  var limit = toInt(params.limit, defaultLimit, 1, maxLimit);
  var page = toInt(params.page, 1, 1, 1000);
  return {
    items: list.slice((page - 1) * limit, page * limit),
    total: list.length,
    page: page,
    pages: Math.max(1, Math.ceil(list.length / limit))
  };
}

function categoryOf(job) {
  return DATA.categories.filter(function (c) { return c.id === job.category_id; })[0];
}

function jobView(job, lang) {
  var category = categoryOf(job);
  return {
    id: job.id,
    title: pick(job, 'title', lang),
    company: pick(job, 'company', lang),
    description: pick(job, 'description', lang),
    city_slug: job.city,
    city: pick(job, 'city', lang),
    address: pick(job, 'address', lang),
    job_type: job.job_type,
    salary_from: job.salary_from,
    salary_to: job.salary_to,
    tags: pick(job, 'tags', lang),
    logo: job.logo,
    photo: JOB_PHOTOS[job.title_en],
    featured: job.featured,
    rating: job.rating,
    created_at: agoToIso(job.age_min),
    category_slug: category.slug,
    category: pick(category, 'name', lang)
  };
}

function getJobs(params, lang) {
  var q = (params.q || '').trim().toLowerCase();
  var list = DATA.jobs.filter(function (job) {
    if (q) {
      var text = [job.title_uk, job.title_en, job.company_uk, job.company_en, job.description_uk, job.description_en]
        .join(' ').toLowerCase();
      if (text.indexOf(q) < 0) return false;
    }
    if (params.category && categoryOf(job).slug !== params.category) return false;
    if (params.location && job.city !== params.location) return false;
    if (['full', 'part', 'intern'].indexOf(params.type) >= 0 && job.job_type !== params.type) return false;
    if (params.min_salary && !(job.salary_to >= toInt(params.min_salary, 0, 0, 1000000))) return false;
    if (String(params.featured) === '1' && !job.featured) return false;
    return true;
  });

  var byDate = function (a, b) { return a.age_min - b.age_min; };
  var sorts = {
    date: byDate,
    salary: function (a, b) { return (b.salary_to || 0) - (a.salary_to || 0); },
    title: function (a, b) { return pick(a, 'title', lang).localeCompare(pick(b, 'title', lang), lang); },
    rating: function (a, b) { return (b.rating - a.rating) || byDate(a, b); }
  };
  list.sort(function (a, b) { return (sorts[params.sort] || byDate)(a, b) || (a.id - b.id); });

  var result = paginate(list, params, 6, 50);
  result.items = result.items.map(function (job) { return jobView(job, lang); });
  return result;
}

function getPosts(params, lang) {
  var q = (params.q || '').trim().toLowerCase();
  var list = DATA.posts.filter(function (post) {
    if (q) {
      var text = [post.title_uk, post.title_en, post.excerpt_uk, post.excerpt_en].join(' ').toLowerCase();
      if (text.indexOf(q) < 0) return false;
    }
    if (params.category && post.categories.indexOf(params.category) < 0) return false;
    if (/^\d{4}-\d{2}$/.test(params.month || '') && agoToIso(post.age_min).slice(0, 7) !== params.month) return false;
    return true;
  });
  list.sort(function (a, b) { return (a.age_min - b.age_min) || (b.id - a.id); });

  var result = paginate(list, params, 4, 20);
  result.items = result.items.map(function (post) {
    return {
      id: post.id,
      title: pick(post, 'title', lang),
      excerpt: pick(post, 'excerpt', lang),
      image: post.image,
      categories: post.categories.map(function (slug) {
        var category = DATA.post_categories.filter(function (c) { return c.slug === slug; })[0];
        return { slug: slug, name: category ? pick(category, 'name', lang) : slug };
      }),
      likes: post.likes,
      comments: post.comments,
      created_at: agoToIso(post.age_min)
    };
  });
  return result;
}

function getSidebar(lang) {
  var categories = DATA.post_categories.map(function (c) {
    return {
      slug: c.slug,
      name: pick(c, 'name', lang),
      count: DATA.posts.filter(function (p) { return p.categories.indexOf(c.slug) >= 0; }).length
    };
  }).sort(function (a, b) { return (b.count - a.count) || a.name.localeCompare(b.name, lang); });

  var months = {};
  DATA.posts.forEach(function (p) {
    var month = agoToIso(p.age_min).slice(0, 7);
    months[month] = (months[month] || 0) + 1;
  });
  var archive = Object.keys(months).sort().reverse().map(function (month) {
    return { month: month, count: months[month] };
  });

  var recent = DATA.posts.slice().sort(function (a, b) { return a.age_min - b.age_min; }).slice(0, 4)
    .map(function (p) {
      return { id: p.id, title: pick(p, 'title', lang), image: p.image, created_at: agoToIso(p.age_min) };
    });

  var author = lang === 'en'
    ? { name: 'Adele Gonzalez', bio: 'Career coach and editor of the blog. She writes about job search, interviews and professional growth.' }
    : { name: 'Адель Гонсалес', bio: 'Кар’єрний коуч і редакторка блогу. Пише про пошук роботи, співбесіди та професійний розвиток.' };
  author.photo = 'author.webp';
  return { categories: categories, archive: archive, recent: recent, author: author };
}

// Returns data in the same shape as the REST API. It is async so the pages can show "Loading...".
async function apiGet(path, params) {
  params = params || {};
  var lang = getLang();

  if (path === 'categories') {
    return DATA.categories.map(function (c) {
      return {
        slug: c.slug,
        name: pick(c, 'name', lang),
        icon: c.icon,
        count: DATA.jobs.filter(function (j) { return j.category_id === c.id; }).length
      };
    });
  }
  if (path === 'locations') {
    var cities = {};
    DATA.jobs.forEach(function (j) {
      cities[j.city] = cities[j.city] || { slug: j.city, name: pick(j, 'city', lang), count: 0 };
      cities[j.city].count += 1;
    });
    return Object.keys(cities).map(function (key) { return cities[key]; })
      .sort(function (a, b) { return (b.count - a.count) || a.name.localeCompare(b.name, lang); });
  }
  if (path === 'jobs') return getJobs(params, lang);
  if (path === 'posts') return getPosts(params, lang);
  if (path === 'blog/sidebar') return getSidebar(lang);
  if (path === 'team') {
    return DATA.team.map(function (m) {
      return { id: m.id, name: pick(m, 'name', lang), role: pick(m, 'role', lang), photo: m.photo };
    });
  }
  if (path === 'testimonials') {
    return DATA.testimonials.map(function (r) {
      return { id: r.id, author: pick(r, 'author', lang), rating: r.rating, text: pick(r, 'text', lang), logo: r.logo };
    });
  }
  throw new Error('Unknown data: ' + path);
}

// Checks form fields. Returns { field: errorCode } (empty when everything is fine).
function validateFields(body, rules) {
  var errors = {};
  Object.keys(rules).forEach(function (field) {
    var rule = rules[field];
    var value = typeof body[field] === 'string' ? body[field].trim() : '';
    if (!value) {
      if (rule.required) errors[field] = 'required';
    } else if (rule.min && value.length < rule.min) {
      errors[field] = 'too_short';
    } else if (rule.max && value.length > rule.max) {
      errors[field] = 'too_long';
    } else if (rule.type === 'email' && !EMAIL_RE.test(value)) {
      errors[field] = 'invalid';
    } else if (rule.type === 'phone' && !PHONE_RE.test(value)) {
      errors[field] = 'invalid';
    }
  });
  return errors;
}

// There is no server, so forms are only checked and the success message is shown.
// Returns { ok, data }: validation errors come back as ok = false.
async function apiPost(path, body) {
  body = body || {};
  var errors;

  if (path === 'applications') {
    var contact = body.kind !== 'apply';
    errors = validateFields(body, {
      name: { required: true, min: 2, max: 80 },
      email: { required: true, type: 'email', max: 120 },
      phone: { type: 'phone' },
      message: { required: contact, min: contact ? 10 : 0, max: 1000 }
    });
  } else if (path === 'subscribers') {
    errors = validateFields(body, { email: { required: true, type: 'email', max: 120 } });
  } else if (/^posts\/\d+\/like$/.test(path)) {
    var id = parseInt(path.split('/')[1], 10);
    var post = DATA.posts.filter(function (p) { return p.id === id; })[0];
    if (!post) return { ok: false, data: { error: 'not_found' } };
    post.likes = Math.max(post.likes + (body.action === 'unlike' ? -1 : 1), 0);
    return { ok: true, data: { likes: post.likes } };
  } else {
    return { ok: false, data: { error: 'not_found' } };
  }

  if (Object.keys(errors).length) return { ok: false, data: { error: 'validation', fields: errors } };
  return { ok: true, data: { ok: true } };
}

// ---------- creating elements ----------

function el(tag, className, text) {
  var node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function svgIcon(name) {
  var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', 'icon');
  svg.setAttribute('aria-hidden', 'true');
  var use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  use.setAttribute('href', 'assets/img/sprite.svg#icon-' + name);
  svg.appendChild(use);
  return svg;
}

function imageFile(name) {
  return 'assets/img/' + name;
}

// ---------- loading and error messages ----------

// Runs work() and shows an error message if it fails.
async function loadInto(container, work) {
  try {
    await work();
  } catch (error) {
    container.replaceChildren(el('p', 'state', t('error')));
  }
}

function emptyState(text) {
  return el('p', 'state', text);
}

// ---------- formatting ----------

function locale() {
  return getLang() === 'en' ? 'en-GB' : 'uk-UA';
}

function formatSalary(job) {
  var format = new Intl.NumberFormat(locale());
  if (!job.salary_from && !job.salary_to) return t('job.salary.none');
  return format.format(job.salary_from) + ' – ' + format.format(job.salary_to) + ' ₴';
}

function timeAgo(isoDate) {
  var seconds = (Date.now() - new Date(isoDate).getTime()) / 1000;
  var rtf = new Intl.RelativeTimeFormat(locale(), { numeric: 'auto' });
  var days = Math.floor(seconds / 86400);
  if (days >= 1) return rtf.format(-days, 'day');
  var hours = Math.floor(seconds / 3600);
  if (hours >= 1) return rtf.format(-hours, 'hour');
  return rtf.format(-Math.max(1, Math.floor(seconds / 60)), 'minute');
}

function monthName(month) {
  return new Date(month + '-01T12:00:00').toLocaleDateString(locale(), { month: 'long', year: 'numeric' });
}

// ---------- vacancy card (home page and vacancies page) ----------

// A photo for every profession: put the file assets/img/jobs/<name>.webp (see the README in that folder).
// If the file is missing, the company logo or the first letter of its name is shown instead.
var JOB_PHOTOS = {
  'Illustration Designer': 'illustrator',
  'Creative Designer': 'designer',
  'Accountant': 'accountant',
  'Chief Accountant': 'chief-accountant',
  'Frontend Developer': 'frontend',
  'Backend Developer (Node.js)': 'backend',
  'QA Engineer': 'qa',
  'System Administrator': 'sysadmin',
  'General Practitioner': 'doctor',
  'Nurse': 'nurse',
  'Civil Servant': 'civil-servant',
  'Records Specialist': 'records',
  'Cook': 'cook',
  'Restaurant Manager': 'restaurant',
  'Journalist': 'journalist',
  'SMM Manager': 'smm'
};

function companyLogo(job, className) {
  if (job.photo) {
    var photo = el('img', className + ' is-photo');
    photo.src = 'assets/img/jobs/' + job.photo + '.webp';
    photo.alt = job.title;
    photo.width = 109;
    photo.height = 69;
    photo.loading = 'lazy';
    // no such file yet: show the logo or the letter block
    photo.addEventListener('error', function () {
      photo.replaceWith(logoOrLetter(job, className));
    });
    return photo;
  }
  return logoOrLetter(job, className);
}

// A company without a photo gets a coloured block with the icon of its category.
function logoOrLetter(job, className) {
  var block = el('div', 'job-card__initials cat-' + job.category_slug);
  block.appendChild(svgIcon('cat-' + job.category_slug));
  block.setAttribute('role', 'img');
  block.setAttribute('aria-label', job.company);
  return block;
}

function jobMeta(iconName, text) {
  var line = el('p', 'job-card__meta');
  line.appendChild(svgIcon(iconName));
  line.appendChild(el('span', '', text));
  return line;
}

function renderJobCard(job) {
  var card = el('article', 'job-card');

  var side = el('div');
  side.appendChild(companyLogo(job, 'job-card__logo'));
  var tags = el('div', 'job-card__tags');
  job.tags.forEach(function (tag) { tags.appendChild(el('span', 'tag', tag)); });
  side.appendChild(tags);

  var body = el('div');
  body.appendChild(el('h3', '', job.title));
  body.appendChild(el('p', 'job-card__company', job.company));
  body.appendChild(el('p', 'job-card__desc clamp-3', job.description));
  body.appendChild(el('p', 'job-card__type', t('job.type') + ' ' + t('job.' + job.job_type)));
  body.appendChild(jobMeta('pin', job.address));
  body.appendChild(jobMeta('money', formatSalary(job)));

  var actions = el('div', 'job-card__actions');
  var fav = el('button', 'icon-btn');
  fav.type = 'button';
  fav.setAttribute('aria-pressed', 'false');
  fav.setAttribute('aria-label', t('job.fav'));
  fav.appendChild(svgIcon('heart'));
  fav.addEventListener('click', function () {
    var on = fav.getAttribute('aria-pressed') !== 'true';
    fav.setAttribute('aria-pressed', String(on));
    fav.replaceChildren(svgIcon(on ? 'heart-fill' : 'heart'));
  });
  var apply = el('button', 'apply-btn', t('job.apply'));
  apply.type = 'button';
  apply.dataset.jobId = job.id;
  apply.dataset.jobTitle = job.title;
  actions.append(fav, apply);

  card.append(side, body, actions);
  return card;
}

// ---------- slider with dots (a scrollable row of cards) ----------

function setupSlider(track, dotsBox) {
  dotsBox.replaceChildren();
  var items = Array.prototype.slice.call(track.children);
  if (items.length < 2) return;

  var dots = items.map(function (item, index) {
    var dot = el('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', t('page') + ' ' + (index + 1));
    dot.addEventListener('click', function () {
      track.scrollTo({ left: item.offsetLeft, behavior: 'smooth' });
    });
    dotsBox.appendChild(dot);
    return dot;
  });

  function update() {
    var current = 0;
    items.forEach(function (item, index) {
      if (Math.abs(item.offsetLeft - track.scrollLeft) < Math.abs(items[current].offsetLeft - track.scrollLeft)) {
        current = index;
      }
    });
    dots.forEach(function (dot, index) { dot.setAttribute('aria-current', String(index === current)); });
  }

  track.addEventListener('scroll', function () { window.requestAnimationFrame(update); });
  update();
}

// ---------- page numbers ----------

// hrefFor(page) must return the address of the page.
function renderPagination(container, page, pages, hrefFor) {
  container.replaceChildren();
  if (pages <= 1) return;

  function link(label, target, current, ariaLabel) {
    var item;
    if (target < 1 || target > pages || current) {
      item = el('span', '', label);
      if (current) item.setAttribute('aria-current', 'page');
      else item.setAttribute('aria-disabled', 'true');
    } else {
      item = el('a', '', label);
      item.href = hrefFor(target);
    }
    if (ariaLabel) item.setAttribute('aria-label', ariaLabel);
    container.appendChild(item);
  }

  link('‹', page - 1, false, t('prev'));
  for (var number = 1; number <= pages; number++) {
    link(String(number), number, number === page, t('page') + ' ' + number);
  }
  link('›', page + 1, false, t('next'));
}

// ---------- fill a <select> with options from the API ----------

// The first option ("All ...") is written in the HTML and stays in place.
function fillSelect(select, items) {
  var selected = select.value;
  while (select.options.length > 1) select.remove(1);
  items.forEach(function (item) {
    var option = el('option', '', item.name);
    option.value = item.slug;
    select.appendChild(option);
  });
  select.value = selected;
}
