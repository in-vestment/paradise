/* Small, dependency-free enhancements. Content and navigation work without JS. */
(() => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.getElementById('site-navigation');
  if (toggle && nav) {
    document.documentElement.classList.add('js-navigation');
    toggle.hidden = false;
    const close = () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open navigation');
    };
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', close));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && nav.classList.contains('is-open')) {
        close();
        toggle.focus();
      }
    });
    matchMedia('(min-width: 760px)').addEventListener('change', close);
  }
  const banner = document.querySelector('.mobile-banner');
  if (banner) {
    const mobileMotion = matchMedia('(max-width: 759px) and (prefers-reduced-motion: no-preference)');
    let played = false;
    const start = () => {
      if (mobileMotion.matches && !played) {
        played = true;
        banner.classList.add('motion-ready');
      }
    };
    start();
    mobileMotion.addEventListener('change', start);
  }
})();
