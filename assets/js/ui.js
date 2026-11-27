// Behaviour shared by all pages: language, burger menu, modal window, forms, "back to top".

// ---------- language ----------

applyLanguage(getLang());

document.querySelectorAll('.lang-switch button').forEach(function (button) {
  button.addEventListener('click', function () { setLanguage(button.dataset.lang); });
});

// ---------- burger menu (phones and tablets) ----------

var burger = document.querySelector('.burger');
var mainNav = document.getElementById('main-nav');

function setMenu(open) {
  mainNav.classList.toggle('is-open', open);
  burger.setAttribute('aria-expanded', String(open));
}

burger.addEventListener('click', function () {
  setMenu(burger.getAttribute('aria-expanded') !== 'true');
});

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') setMenu(false);
});

document.addEventListener('click', function (event) {
  if (!event.target.closest('.site-header')) setMenu(false);
});

// ---------- form validation ----------

var EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
var PHONE_PATTERN = /^\+?[0-9\s()-]{7,20}$/;

// Returns an error code or an empty string.
function checkValue(value, rule) {
  value = value.trim();
  if (!value) return rule.required ? 'required' : '';
  if (rule.min && value.length < rule.min) return 'too_short';
  if (rule.max && value.length > rule.max) return 'too_long';
  if (rule.type === 'email' && !EMAIL_PATTERN.test(value)) return 'invalid';
  if (rule.type === 'phone' && !PHONE_PATTERN.test(value)) return 'invalid';
  return '';
}

function showFieldError(form, field, code) {
  var row = form.querySelector('[name="' + field + '"]').closest('.form-row');
  var message = form.querySelector('[data-error-for="' + field + '"]');
  row.classList.toggle('has-error', Boolean(code));
  message.textContent = code ? t('err.' + code) : '';
}

// ---------- modal window ----------

var FORM_FIELDS = ['company', 'name', 'email', 'phone', 'message'];

var modal = document.getElementById('modal');
var modalForm = document.getElementById('modal-form');
var modalNote = document.getElementById('modal-note');

function openModal(kind, job) {
  modalForm.reset();
  modalNote.textContent = '';
  modalNote.className = 'form-note';
  FORM_FIELDS.forEach(function (field) { showFieldError(modalForm, field, ''); });

  modalForm.elements.kind.value = kind;
  modalForm.elements.job_id.value = job ? job.id : '';
  // the company field exists only in the employer form
  modalForm.querySelector('[data-only="employer"]').hidden = kind !== 'employer';
  document.getElementById('modal-title').textContent = t('modal.' + kind + '.title');
  document.getElementById('modal-lead').textContent =
    job ? t('modal.apply.lead') + ' ' + job.title : t('modal.' + kind + '.lead');

  setMenu(false);
  modal.showModal();
}

document.addEventListener('click', function (event) {
  var opener = event.target.closest('[data-open-modal]');
  if (opener) {
    openModal(opener.dataset.openModal);
    return;
  }
  // "Apply" on a vacancy: first the window with the job, then the form
  var apply = event.target.closest('[data-job-id]');
  if (apply) openJobModal(Number(apply.dataset.jobId));
});


// ---------- window with the job details ----------

var jobModal = document.getElementById('job-modal');
var openedJob = null;

function openJobModal(id) {
  var row = DATA.jobs.filter(function (job) { return job.id === id; })[0];
  if (!row) return;
  var job = jobView(row, getLang());
  openedJob = job;

  document.getElementById('job-modal-logo').replaceChildren(companyLogo(job, 'job-card__logo'));
  document.getElementById('job-modal-title').textContent = job.title;
  document.getElementById('job-modal-company').textContent = job.company;
  document.getElementById('job-modal-info').replaceChildren(
    jobMeta('pin', job.address),
    jobMeta('money', formatSalary(job)),
    el('p', 'job-card__type', t('job.type') + ' ' + t('job.' + job.job_type))
  );
  document.getElementById('job-modal-desc').textContent = job.description;
  var tags = document.getElementById('job-modal-tags');
  tags.replaceChildren();
  job.tags.forEach(function (tag) { tags.appendChild(el('span', 'tag', tag)); });

  jobModal.showModal();
  jobModal.scrollTop = 0;
}

// the button under the job: this window closes and the form opens
document.getElementById('job-modal-fill').addEventListener('click', function () {
  jobModal.close();
  openModal('apply', { id: openedJob.id, title: openedJob.title });
});

jobModal.querySelector('[data-close-job]').addEventListener('click', function () { jobModal.close(); });

jobModal.addEventListener('click', function (event) {
  if (event.target === jobModal) jobModal.close();
});

// the close button
modal.querySelector('[data-close-modal]').addEventListener('click', function () { modal.close(); });

// a click outside the window (on the dark background) closes it too
modal.addEventListener('click', function (event) {
  var box = modal.getBoundingClientRect();
  var outside = event.clientX < box.left || event.clientX > box.right ||
                event.clientY < box.top || event.clientY > box.bottom;
  if (outside) modal.close();
});

function modalRules() {
  var isApply = modalForm.elements.kind.value === 'apply';
  var isEmployer = modalForm.elements.kind.value === 'employer';
  return {
    company: { required: isEmployer, min: isEmployer ? 2 : 0, max: 100 },
    name: { required: true, min: 2, max: 80 },
    email: { required: true, type: 'email', max: 120 },
    phone: { type: 'phone' },
    message: { required: !isApply, min: isApply ? 0 : 10, max: 1000 }
  };
}

modalForm.addEventListener('input', function (event) {
  if (FORM_FIELDS.indexOf(event.target.name) >= 0) showFieldError(modalForm, event.target.name, '');
});

modalForm.addEventListener('submit', async function (event) {
  event.preventDefault();

  var rules = modalRules();
  var firstInvalid = null;
  Object.keys(rules).forEach(function (field) {
    var code = checkValue(modalForm.elements[field].value, rules[field]);
    showFieldError(modalForm, field, code);
    if (code && !firstInvalid) firstInvalid = modalForm.elements[field];
  });
  if (firstInvalid) {
    firstInvalid.focus();
    return;
  }

  var body = {
    kind: modalForm.elements.kind.value,
    job_id: modalForm.elements.job_id.value,
    company: modalForm.elements.company.value,
    name: modalForm.elements.name.value,
    email: modalForm.elements.email.value,
    phone: modalForm.elements.phone.value,
    message: modalForm.elements.message.value
  };

  var submit = document.getElementById('modal-submit');
  submit.disabled = true;
  modalNote.className = 'form-note';
  modalNote.textContent = t('form.sending');
  try {
    var result = await apiPost('applications', body);
    if (result.ok) {
      modalForm.reset();
      modalNote.className = 'form-note is-ok';
      modalNote.textContent = t('form.ok');
      setTimeout(function () { if (modal.open) modal.close(); }, 2000);
    } else if (result.data.fields) {
      // the server found an error that the browser did not see
      Object.keys(result.data.fields).forEach(function (field) {
        showFieldError(modalForm, field, result.data.fields[field]);
      });
      modalNote.textContent = '';
    } else {
      throw new Error('send failed');
    }
  } catch (error) {
    modalNote.className = 'form-note is-error';
    modalNote.textContent = t('form.fail');
  } finally {
    submit.disabled = false;
  }
});

// ---------- newsletter form in the footer ----------

var newsletter = document.getElementById('newsletter-form');
var newsletterNote = document.getElementById('newsletter-note');

newsletter.addEventListener('submit', async function (event) {
  event.preventDefault();
  var email = newsletter.elements.email.value;
  var code = checkValue(email, { required: true, type: 'email', max: 120 });
  if (code) {
    newsletterNote.className = 'form-note is-error';
    newsletterNote.textContent = t('err.' + code);
    return;
  }
  try {
    var result = await apiPost('subscribers', { email: email });
    if (!result.ok) throw new Error('send failed');
    newsletterNote.className = 'form-note is-ok';
    newsletterNote.textContent = result.data.already ? t('news.already') : t('news.ok');
    newsletter.reset();
  } catch (error) {
    newsletterNote.className = 'form-note is-error';
    newsletterNote.textContent = t('form.fail');
  }
});

// ---------- "back to top" button ----------

var toTop = document.querySelector('.to-top');

window.addEventListener('scroll', function () {
  toTop.hidden = window.scrollY < 400;
}, { passive: true });

toTop.addEventListener('click', function () {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ---------- blocks appear when scrolled into view ----------

if ('IntersectionObserver' in window) {
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.feature-card, .why-card, .cta, .download').forEach(function (block) {
    block.classList.add('reveal');
    observer.observe(block);
  });

  // "Why choose us": on a wide screen the first three cards rise one after another,
  // and the next three follow them a little later
  if (window.matchMedia('(min-width: 992px)').matches) {
    document.querySelectorAll('.why-card').forEach(function (card, index) {
      var delay = (index % 3) * 150 + Math.floor(index / 3) * 450;
      card.style.transitionDelay = delay + 'ms';
      // the delay is needed only for the first appearance, not for the hover effect
      card.addEventListener('transitionend', function () { card.style.transitionDelay = ''; }, { once: true });
    });
  }
}
