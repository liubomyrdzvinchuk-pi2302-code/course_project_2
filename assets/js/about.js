// About page: team and testimonials come from the API.

async function loadTeam() {
  var grid = document.getElementById('team-grid');
  await loadInto(grid, async function () {
    var team = await apiGet('team');
    grid.replaceChildren();
    team.forEach(function (member) {
      var card = el('article', 'team-card');
      var photo = el('img');
      photo.src = imageFile(member.photo);
      photo.alt = member.name;
      photo.width = 255;
      photo.height = 290;
      photo.loading = 'lazy';
      card.append(photo, el('h3', '', member.name), el('p', '', member.role));
      grid.appendChild(card);
    });
  });
}

function stars(rating) {
  var box = el('span', 'stars');
  box.setAttribute('role', 'img');
  box.setAttribute('aria-label', rating + ' / 5');
  for (var i = 1; i <= 5; i++) {
    box.appendChild(el('span', i <= rating ? '' : 'off', '★'));
  }
  return box;
}

async function loadTestimonials() {
  var track = document.getElementById('reviews-track');
  await loadInto(track, async function () {
    var reviews = await apiGet('testimonials');
    track.replaceChildren();
    reviews.forEach(function (review) {
      var card = el('article', 'testimonial');
      if (review.logo) {
        var logo = el('img', 'testimonial__logo');
        logo.src = imageFile(review.logo);
        logo.alt = review.author;
        logo.width = 64;
        logo.height = 38;
        logo.loading = 'lazy';
        card.appendChild(logo);
      } else {
        // an empty block keeps all cards of the same height
        card.appendChild(el('div', 'testimonial__logo'));
      }
      var title = el('h3', '', review.author + ' ');
      title.appendChild(stars(review.rating));
      card.append(title, el('p', '', review.text));
      track.appendChild(card);
    });
    setupSlider(track, document.getElementById('reviews-dots'));
  });
}

function loadAll() {
  loadTeam();
  loadTestimonials();
}

loadAll();
document.addEventListener('languagechange', loadAll);
