// Small progressive enhancements. The site works fully without this file.
(function () {
  var root = document.documentElement;
  root.classList.add('js');

  // Footer year
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Border under the sticky bar once the page scrolls
  var bar = document.querySelector('.topbar');
  function onScroll() {
    if (bar) bar.classList.toggle('scrolled', window.scrollY > 8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
    return;
  }

  // Reveal blocks as they enter the viewport
  var revealer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        revealer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(function (el) { revealer.observe(el); });

  // Highlight the nav link for the section in view
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav-links a'));
  var map = {};
  links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
  var spy = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting && map[entry.target.id]) {
        links.forEach(function (a) { a.removeAttribute('aria-current'); });
        map[entry.target.id].setAttribute('aria-current', 'true');
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  Object.keys(map).forEach(function (id) {
    var section = document.getElementById(id);
    if (section) spy.observe(section);
  });
})();
