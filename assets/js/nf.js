// The 404 page has no header, so the language is applied here.
applyLanguage(getLang());

document.querySelectorAll('.lang-switch button').forEach(function (button) {
  button.addEventListener('click', function () { setLanguage(button.dataset.lang); });
});
