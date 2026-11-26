// Vacancies page: filters, sorting and page numbers. The state is stored in the address
// (vacancies.html?q=...&category=...&page=2), so every result can be shared as a link.

var params = new URLSearchParams(location.search);
var form = document.getElementById('filter-form');
var sortSelect = document.getElementById('sort-select');
var list = document.getElementById('job-list');
var countBox = document.getElementById('results-count');

var SORTS = ['date', 'salary', 'rating', 'title'];
var currentSort = SORTS.indexOf(params.get('sort')) >= 0 ? params.get('sort') : 'date';
var currentPage = Math.max(1, parseInt(params.get('page'), 10) || 1);

form.elements.q.value = params.get('q') || '';
form.elements.type.value = params.get('type') || '';
form.elements.sort.value = currentSort;
sortSelect.value = currentSort;

// changing the sorting opens the first page with the same filters
sortSelect.addEventListener('change', function () {
  params.set('sort', sortSelect.value);
  params.delete('page');
  location.search = params.toString();
});

function pageAddress(page) {
  var next = new URLSearchParams(location.search);
  next.set('page', page);
  return 'vacancies.html?' + next.toString();
}

async function loadFilters() {
  try {
    fillSelect(form.elements.category, await apiGet('categories'));
    fillSelect(form.elements.location, await apiGet('locations'));
    form.elements.category.value = params.get('category') || '';
    form.elements.location.value = params.get('location') || '';
  } catch (error) {
    // the list of vacancies below shows its own error message
  }
}

async function loadJobs() {
  await loadInto(list, async function () {
    var data = await apiGet('jobs', {
      q: params.get('q') || '',
      category: params.get('category') || '',
      location: params.get('location') || '',
      type: params.get('type') || '',
      sort: currentSort,
      page: currentPage,
      limit: 6
    });

    countBox.textContent = t('results.count') + ' ' + data.total;
    list.replaceChildren();
    if (data.total === 0) list.appendChild(emptyState(t('empty.jobs')));
    data.items.forEach(function (job) { list.appendChild(renderJobCard(job)); });
    renderPagination(document.getElementById('job-pages'), data.page, data.pages, pageAddress);
  });
}

function loadAll() {
  loadFilters();
  loadJobs();
}

loadAll();
document.addEventListener('languagechange', loadAll);
