// Blog page: posts, sidebar, likes. Filters (search, category, archive month)
// and page numbers are stored in the address, for example blog.html?category=art&page=2.

var blogParams = new URLSearchParams(location.search);
var postList = document.getElementById('post-list');
var blogPage = Math.max(1, parseInt(blogParams.get('page'), 10) || 1);

var SOCIAL_LINKS = [
  ['facebook', 'Facebook', 'https://www.facebook.com/'],
  ['twitter', 'Twitter', 'https://twitter.com/'],
  ['dribbble', 'Dribbble', 'https://dribbble.com/'],
  ['behance', 'Behance', 'https://www.behance.net/']
];

function socialLinks() {
  var box = el('div', 'socials');
  SOCIAL_LINKS.forEach(function (item) {
    var link = el('a');
    link.href = item[2];
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.setAttribute('aria-label', item[1]);
    link.appendChild(svgIcon(item[0]));
    box.appendChild(link);
  });
  return box;
}

function blogAddress(extra) {
  var next = new URLSearchParams();
  ['q', 'category', 'month'].forEach(function (name) {
    if (blogParams.get(name)) next.set(name, blogParams.get(name));
  });
  Object.keys(extra).forEach(function (name) { next.set(name, extra[name]); });
  var text = next.toString();
  return 'blog.html' + (text ? '?' + text : '');
}

// ---------- likes (the liked posts are remembered in the browser) ----------

function likedPosts() {
  try {
    return JSON.parse(localStorage.getItem('likedPosts')) || [];
  } catch (error) {
    return [];
  }
}

function rememberLikes(ids) {
  try {
    localStorage.setItem('likedPosts', JSON.stringify(ids));
  } catch (error) {
    // not remembered, nothing else happens
  }
}

function likeButton(post) {
  var button = el('button');
  button.type = 'button';
  var liked = likedPosts().indexOf(post.id) >= 0;

  function draw(count) {
    button.setAttribute('aria-pressed', String(liked));
    button.replaceChildren(svgIcon(liked ? 'heart-fill' : 'heart'), el('span', '', t('likes') + ' ' + count));
  }
  draw(post.likes);

  button.addEventListener('click', async function () {
    var ids = likedPosts();
    liked = !liked;
    try {
      var result = await apiPost('posts/' + post.id + '/like', { action: liked ? 'like' : 'unlike' });
      if (!result.ok) throw new Error('like failed');
      rememberLikes(liked ? ids.concat(post.id) : ids.filter(function (id) { return id !== post.id; }));
      draw(result.data.likes);
    } catch (error) {
      liked = !liked;
    }
  });
  return button;
}

// ---------- posts ----------

function renderPost(post) {
  var article = el('article', 'post');

  var cover = el('img', 'post__cover');
  cover.src = imageFile(post.image);
  cover.alt = post.title;
  cover.width = 670;
  cover.height = 312;
  cover.loading = 'lazy';

  var cats = el('p', 'post__cats');
  var when = el('time', 'post__date', new Date(post.created_at).toLocaleDateString(locale(), { day: 'numeric', month: 'long', year: 'numeric' }));
  when.dateTime = post.created_at.slice(0, 10);
  cats.append(when, document.createTextNode(' · '));
  post.categories.forEach(function (category, index) {
    if (index > 0) cats.appendChild(document.createTextNode(', '));
    var link = el('a', '', category.name);
    link.href = blogAddress({ category: category.slug });
    cats.appendChild(link);
  });

  var meta = el('div', 'post__meta');
  var comments = el('span');
  comments.append(svgIcon('comment'), el('span', '', t('comments') + ' ' + post.comments));
  meta.append(likeButton(post), comments, socialLinks());

  var title = el('h2');
  var titleLink = el('a', '', post.title);
  titleLink.href = '#article-' + post.id;
  titleLink.dataset.articleId = post.id;
  title.appendChild(titleLink);

  var more = el('button', 'btn btn--light post__more', t('blog.read'));
  more.type = 'button';
  more.dataset.articleId = post.id;

  cover.dataset.articleId = post.id;
  article.append(cover, cats, title, el('p', 'post__text', post.excerpt), more, meta);
  return article;
}

async function loadPosts() {
  await loadInto(postList, async function () {
    var data = await apiGet('posts', {
      q: blogParams.get('q') || '',
      category: blogParams.get('category') || '',
      month: blogParams.get('month') || '',
      page: blogPage,
      limit: 4
    });
    postList.replaceChildren();
    if (data.total === 0) postList.appendChild(emptyState(t('empty.posts')));
    data.items.forEach(function (post) { postList.appendChild(renderPost(post)); });
    renderPagination(document.getElementById('post-pages'), data.page, data.pages, function (page) {
      return blogAddress({ page: page });
    });
  });
}


// ---------- article window ----------

var articleWindow = document.getElementById('article');

// Fills the window with the post (cover, categories, title, text) and shows it.
function openArticle(id) {
  var lang = getLang();
  var post = DATA.posts.filter(function (p) { return p.id === id; })[0];
  if (!post) return;

  var cover = document.getElementById('article-cover');
  cover.src = imageFile(post.image);
  cover.alt = pick(post, 'title', lang);

  var cats = document.getElementById('article-cats');
  cats.replaceChildren(document.createTextNode(post.categories.map(function (slug) {
    var category = DATA.post_categories.filter(function (c) { return c.slug === slug; })[0];
    return category ? pick(category, 'name', lang) : slug;
  }).join(', ')));

  document.getElementById('article-title').textContent = pick(post, 'title', lang);

  // text of the article: the lead from the post, then the paragraphs and subheadings
  var parts = [pick(post, 'excerpt', lang)].concat(ARTICLES[id] ? ARTICLES[id][lang] : []);
  var words = parts.join(' ').split(/\s+/).length;
  var minutes = Math.max(1, Math.round(words / 180));

  // line under the title: date, author, reading time
  var published = new Date(agoToIso(post.age_min));
  var date = el('time', '', published.toLocaleDateString(locale(), { day: 'numeric', month: 'long', year: 'numeric' }));
  date.dateTime = published.toISOString().slice(0, 10);
  var info = document.getElementById('article-info');
  info.replaceChildren(date, el('span', '', t('article.author')), el('span', '', minutes + ' ' + t('article.minutes')));

  var body = document.getElementById('article-body');
  body.replaceChildren();
  parts.forEach(function (text, index) {
    if (text.indexOf('## ') === 0) {
      body.appendChild(el('h3', '', text.slice(3)));
    } else if (/^\*\*.+?\*\*/.test(text)) {
      // "**Word.** text" - the first words are bold
      var match = text.match(/^\*\*(.+?)\*\*\s*(.*)$/);
      var item = el('p');
      item.append(el('strong', '', match[1] + ' '), document.createTextNode(match[2]));
      body.appendChild(item);
    } else {
      body.appendChild(el('p', index === 0 ? 'article__lead' : '', text));
    }
  });
  body.appendChild(el('p', 'article__source', t('article.source')));

  articleWindow.showModal();
  articleWindow.scrollTop = 0;
}

document.querySelector('[data-close-article]').addEventListener('click', function () { articleWindow.close(); });

// a click on the dark background closes the window
articleWindow.addEventListener('click', function (event) {
  if (event.target === articleWindow) articleWindow.close();
});

// any element with data-article-id opens that post
document.addEventListener('click', function (event) {
  var opener = event.target.closest('[data-article-id]');
  if (!opener) return;
  event.preventDefault();
  openArticle(Number(opener.dataset.articleId));
});

// ---------- sidebar ----------

function countItem(href, name, count, active) {
  var item = el('li');
  var link = el('a');
  link.href = href;
  if (active) link.setAttribute('aria-current', 'true');
  link.append(el('span', '', name), el('span', '', String(count)));
  item.appendChild(link);
  return item;
}

async function loadSidebar() {
  var author = document.getElementById('author');
  var data;
  try {
    data = await apiGet('blog/sidebar');
  } catch (error) {
    author.replaceChildren(emptyState(t('error')));
    return;
  }

  var photo = el('img');
  photo.src = imageFile(data.author.photo);
  photo.alt = data.author.name;
  photo.width = 120;
  photo.height = 120;
  author.replaceChildren(photo, el('h2', '', data.author.name), el('p', '', data.author.bio), socialLinks());

  var categories = document.getElementById('cat-list');
  categories.replaceChildren();
  data.categories.forEach(function (category) {
    categories.appendChild(countItem('blog.html?category=' + category.slug,
      category.name, category.count, blogParams.get('category') === category.slug));
  });

  var recent = document.getElementById('recent-list');
  recent.replaceChildren();
  data.recent.forEach(function (post, index) {
    var item = el('li');
    var link = el('a');
    link.href = '#article-' + post.id;
    link.dataset.articleId = post.id;
    var thumb = el('img');
    thumb.src = imageFile('thumb-' + ((index % 4) + 1) + '.webp');
    thumb.alt = '';
    thumb.width = 70;
    thumb.height = 70;
    thumb.loading = 'lazy';
    var text = el('div');
    text.appendChild(el('strong', '', post.title));
    text.appendChild(el('time', '', timeAgo(post.created_at)));
    link.append(thumb, text);
    item.appendChild(link);
    recent.appendChild(item);
  });

  var archive = document.getElementById('archive-list');
  archive.replaceChildren();
  data.archive.forEach(function (row) {
    archive.appendChild(countItem('blog.html?month=' + row.month, monthName(row.month), row.count,
      blogParams.get('month') === row.month));
  });

  var cloud = document.getElementById('tag-cloud');
  cloud.replaceChildren();
  data.categories.forEach(function (category) {
    var tag = el('a', '', category.name);
    tag.href = 'blog.html?category=' + category.slug;
    cloud.appendChild(tag);
  });

  showActiveFilter(data);
}

// "Search: ... / Category: ... / Archive: ..." with a link that clears the filter
function showActiveFilter(sidebar) {
  var box = document.getElementById('active-filter');
  var parts = [];
  if (blogParams.get('q')) parts.push(t('blog.filter.q') + ' ' + blogParams.get('q'));
  if (blogParams.get('category')) {
    var found = sidebar.categories.filter(function (c) { return c.slug === blogParams.get('category'); })[0];
    parts.push(t('blog.filter.cat') + ' ' + (found ? found.name : blogParams.get('category')));
  }
  if (blogParams.get('month')) parts.push(t('blog.filter.month') + ' ' + monthName(blogParams.get('month')));

  box.hidden = parts.length === 0;
  if (parts.length) {
    var reset = el('a', '', t('blog.reset'));
    reset.href = 'blog.html';
    box.replaceChildren(el('span', '', parts.join(' · ')), reset);
  }
}

document.getElementById('blog-q').value = blogParams.get('q') || '';

function loadAll() {
  loadPosts();
  loadSidebar();
}

loadAll();
document.addEventListener('languagechange', loadAll);
