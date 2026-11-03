const nav = document.querySelector('.site-nav');

nav?.addEventListener('click', (event) => {
  if (event.target instanceof Element && event.target.closest('a') && nav.matches(':popover-open')) nav.hidePopover();
});

const motionGroups = document.querySelectorAll('.team-grid, .workflow-grid');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if ('IntersectionObserver' in window && !reducedMotion.matches && motionGroups.length) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-in-view');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.18 });

  motionGroups.forEach((group) => revealObserver.observe(group));
}

document.querySelector('#year').textContent = String(new Date().getFullYear());
