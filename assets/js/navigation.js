(() => {
  const links = [...document.querySelectorAll('.sidebar [data-section]')];
  const sections = links.map(link => document.getElementById(link.dataset.section));
  if (sections.some(section => !section)) return;

  function updateCurrentSection() {
    let current = sections[0];
    const marker = Math.min(window.innerHeight * 0.3, 200);
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= marker) current = section;
    }
    for (const link of links) {
      if (current && link.dataset.section === current.id) {
        link.setAttribute('aria-current', 'location');
      } else {
        link.removeAttribute('aria-current');
      }
    }
  }

  let scheduled = false;
  function scheduleUpdate() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      updateCurrentSection();
    });
  }
  window.addEventListener('scroll', scheduleUpdate, { passive: true });
  window.addEventListener('resize', scheduleUpdate);
  window.addEventListener('load', scheduleUpdate);
  document.addEventListener('toggle', scheduleUpdate, true);
  updateCurrentSection();
})();
