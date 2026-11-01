const nav = document.querySelector('.site-nav');

nav?.addEventListener('click', (event) => {
  if (event.target instanceof Element && event.target.closest('a') && nav.matches(':popover-open')) nav.hidePopover();
});

const motionTargets = document.querySelectorAll('.team-card, .workflow-grid > li');
if ('IntersectionObserver' in window && motionTargets.length) {
  const motionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-in-view');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.2, rootMargin: '0px 0px -8% 0px' });

  motionTargets.forEach((target) => motionObserver.observe(target));
}

document.querySelector('#year').textContent = String(new Date().getFullYear());
