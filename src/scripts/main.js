const nav = document.querySelector('.site-nav');

nav?.addEventListener('click', (event) => {
  if (event.target instanceof Element && event.target.closest('a') && nav.matches(':popover-open')) nav.hidePopover();
});

document.querySelector('#year').textContent = String(new Date().getFullYear());
