// Home page: search form lists, popular vacancies, categories, vacancy list and sidebar.

var jobList = document.getElementById('job-list');
var moreButton = document.getElementById('more-jobs');
var filterButtons = document.querySelectorAll('#job-filters button');
var jobState = { type: '', page: 1 };

// ---------- search form ----------

async function loadSearchLists() {
  try {
    fillSelect(document.getElementById('hero-location'), await apiGet('locations'));
    fillSelect(document.getElementById('hero-category'), await apiGet('categories'));
  } catch (error) {
    // the form still works, it just has no list of cities and categories
  }
}

// ---------- popular vacancies (slider) ----------

async function loadHot() {
  var track = document.getElementById('hot-track');
  await loadInto(track, async function () {
    var data = await apiGet('jobs', { featured: 1, limit: 4 });
    track.replaceChildren();
    data.items.forEach(function (job) {
      var card = el('article', 'hot-card');

      // top row: logo (or the first letter of the company) and the title with the city
      var head = el('div', 'hot-card__head');
      var title = el('div');
      title.appendChild(el('h3', '', job.title));
      title.appendChild(el('p', 'hot-card__place', job.city));
      head.append(companyLogo(job, 'hot-card__logo'), title);

      var link = el('a', 'btn', t('job.view'));
      link.href = 'vacancies.html?q=' + encodeURIComponent(job.title);

      card.append(head, el('p', 'clamp-3', job.description), link);
      track.appendChild(card);
    });
    setupSlider(track, document.getElementById('hot-dots'));
  });
}

// ---------- categories (icons come from the CSS sprite) ----------

// put six photos into assets/img/categories/ (see README.md there) and set this to true
var USE_CATEGORY_PHOTOS = true;

async function loadCategories() {
  var grid = document.getElementById('category-grid');
  grid.classList.toggle('has-photos', USE_CATEGORY_PHOTOS);
  await loadInto(grid, async function () {
    var categories = await apiGet('categories');
    grid.replaceChildren();
    categories.filter(function (category) { return category.icon !== null; }).forEach(function (category) {
      var card = el('a', 'category-card');
      card.href = 'vacancies.html?category=' + category.slug;
      var text = el('span', 'category-card__text');
      text.append(el('strong', '', category.name), el('span', '', t('cat.count') + ' ' + category.count));
      if (USE_CATEGORY_PHOTOS) {
        // a real photo: assets/img/categories/<slug>.jpg
        var photo = el('img');
        photo.src = 'assets/img/categories/' + category.slug + '.jpg';
        photo.alt = '';
        photo.width = 600;
        photo.height = 450;
        photo.loading = 'lazy';
        card.classList.add('category-card--photo');
        card.append(photo, text);
      } else {
        var tile = el('span', 'category-card__icon tone-' + category.slug);
        tile.appendChild(svgIcon('cat-' + category.slug));
        card.append(tile, text);
      }
      grid.appendChild(card);
    });

    // the same data fills the "Jobs by category" list in the sidebar
    var list = document.getElementById('side-categories');
    list.replaceChildren();
    categories.forEach(function (category) {
      list.appendChild(sideItem('vacancies.html?category=' + category.slug, category.name, category.count));
    });
  });
}

function sideItem(href, name, count) {
  var item = el('li');
  var link = el('a');
  link.href = href;
  link.append(el('span', '', name), el('span', '', String(count)));
  item.appendChild(link);
  return item;
}

// ---------- vacancy list with tabs and the "more" button ----------

async function loadJobs(reset) {
  if (reset) {
    jobState.page = 1;
    moreButton.hidden = true;
  }

  async function work() {
    var data = await apiGet('jobs', { type: jobState.type, page: jobState.page, limit: 6 });
    if (reset) jobList.replaceChildren();
    if (data.total === 0) jobList.appendChild(emptyState(t('empty.jobs')));
    data.items.forEach(function (job) { jobList.appendChild(renderJobCard(job)); });
    moreButton.hidden = jobState.page >= data.pages;
  }

  if (reset) {
    await loadInto(jobList, work);
  } else {
    moreButton.disabled = true;
    try {
      await work();
    } catch (error) {
      jobState.page--;
    }
    moreButton.disabled = false;
  }
}

filterButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    filterButtons.forEach(function (other) { other.setAttribute('aria-pressed', String(other === button)); });
    jobState.type = button.dataset.type;
    loadJobs(true);
  });
});

moreButton.addEventListener('click', function () {
  jobState.page++;
  loadJobs(false);
});

// ---------- sidebar ----------

async function loadLocations() {
  var list = document.getElementById('side-locations');
  await loadInto(list, async function () {
    var locations = await apiGet('locations');
    list.replaceChildren();
    locations.forEach(function (location) {
      list.appendChild(sideItem('vacancies.html?location=' + location.slug, location.name, location.count));
    });
  });
}

// "Top rated" shows one vacancy, the dots switch between three
async function loadTopJobs() {
  var box = document.getElementById('top-job');
  var dotsBox = document.getElementById('top-dots');
  await loadInto(box, async function () {
    var data = await apiGet('jobs', { sort: 'rating', limit: 3 });
    var jobs = data.items;
    var dots = [];

    function show(index) {
      var job = jobs[index];
      var card = el('article');
      card.appendChild(el('div', 'top-job__cover', job.category));
      card.appendChild(el('h3', '', job.title));
      card.appendChild(el('p', 'job-card__company', job.company));
      card.appendChild(el('p', 'job-card__desc clamp-3', job.description));
      card.appendChild(el('p', 'job-card__type', t('job.type') + ' ' + t('job.' + job.job_type)));
      card.appendChild(jobMeta('pin', job.address));
      card.appendChild(jobMeta('money', formatSalary(job)));
      var apply = el('button', 'btn', t('job.applyfull'));
      apply.type = 'button';
      apply.dataset.jobId = job.id;
      apply.dataset.jobTitle = job.title;
      card.appendChild(apply);
      box.replaceChildren(card);
      dots.forEach(function (dot, i) { dot.setAttribute('aria-current', String(i === index)); });
    }

    dotsBox.replaceChildren();
    jobs.forEach(function (job, index) {
      var dot = el('button');
      dot.type = 'button';
      dot.setAttribute('aria-label', t('page') + ' ' + (index + 1));
      dot.addEventListener('click', function () { show(index); });
      dotsBox.appendChild(dot);
      dots.push(dot);
    });
    show(0);
  });
}

async function loadBlogPreview() {
  var box = document.getElementById('side-blog');
  await loadInto(box, async function () {
    var data = await apiGet('posts', { limit: 3 });
    box.replaceChildren();
    data.items.forEach(function (post) {
      var card = el('a', 'blog-mini');
      card.href = 'blog.html';
      card.style.backgroundImage = 'url(' + imageFile(post.image) + ')';
      card.appendChild(el('h3', '', post.title));
      card.appendChild(el('span', '', timeAgo(post.created_at) + ' · ' + t('likes') + ' ' + post.likes));
      box.appendChild(card);
    });
  });
}

// ---------- start ----------

function loadAll() {
  loadSearchLists();
  loadHot();
  loadCategories();
  loadJobs(true);
  loadLocations();
  loadTopJobs();
  loadBlogPreview();
}

loadAll();
document.addEventListener('languagechange', loadAll);
