(function () {
  // Mobile nav
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open);
    });
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        links.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Hero slider
  var slides = document.querySelectorAll('.hero-slide');
  var cur = document.querySelector('.hero-counter .cur');
  if (slides.length) {
    var i = 0;
    var show = function (n) {
      slides[i].classList.remove('is-active');
      i = (n + slides.length) % slides.length;
      slides[i].classList.add('is-active');
      if (cur) cur.textContent = String(i + 1).padStart(2, '0');
    };
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduce && slides.length > 1) setInterval(function () { show(i + 1); }, 7000);
    var counter = document.querySelector('.hero-counter');
    if (counter) {
      counter.style.cursor = 'pointer';
      counter.addEventListener('click', function () { show(i + 1); });
    }
  }

  // Testimonials slider
  var track = document.querySelector('.quotes');
  document.querySelectorAll('[data-dir]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var step = track.firstElementChild.getBoundingClientRect().width + 2;
      track.scrollBy({ left: Number(btn.dataset.dir) * step, behavior: 'smooth' });
    });
  });

  // Forms (no backend yet: confirm locally)
  document.querySelectorAll('form[data-msg]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var out = form.querySelector('.form-msg') || form.parentElement.querySelector('.form-msg');
      if (out) out.textContent = form.dataset.msg;
      form.reset();
    });
  });
})();
