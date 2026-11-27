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
    reviews.forEach(function (review, index) {
      var card = el('article', 'testimonial');

      // round avatar with the first letter of the company; the colour changes from card to card
      var letter = review.author.replace(/[^\p{L}\p{N}]/gu, '').charAt(0).toUpperCase();
      var avatar = el('div', 'testimonial__avatar avatar-' + (index % 4), letter);
      avatar.setAttribute('aria-hidden', 'true');

      var title = el('h3', '', review.author);
      var who = el('div');
      who.append(title, stars(review.rating));

      var top = el('div', 'testimonial__top');
      top.append(avatar, who);

      var mark = el('span', 'testimonial__mark', '“');
      mark.setAttribute('aria-hidden', 'true');

      card.append(mark, top, el('p', '', review.text));
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
