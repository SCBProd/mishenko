(() => {
  const gallery = document.getElementById('gallery');
  let pending = false;
  function align() {
    pending = false;
    const cards = [...gallery.querySelectorAll('.graphic-work, :scope[data-category="painting"] > figure')];
    for (const card of cards) card.querySelector(':scope > .artwork-concept')?.style.removeProperty('margin-top');
    if (innerWidth <= 650) return;
    for (let i = 0; i + 1 < cards.length; i += 2) {
      const pair = cards.slice(i, i + 2);
      if (Math.abs(pair[0].getBoundingClientRect().top - pair[1].getBoundingClientRect().top) > 2) continue;
      const concepts = pair.map(card => card.querySelector(':scope > .artwork-concept'));
      if (concepts.some(node => !node)) continue;
      const tops = concepts.map(node => node.getBoundingClientRect().top);
      // Avoid introducing a large empty area for artworks of very different proportions.
      if (Math.abs(tops[0] - tops[1]) > 160) continue;
      concepts.forEach((node, index) => {
        const margin = parseFloat(getComputedStyle(node).marginTop);
        node.style.marginTop = `${margin + Math.max(...tops) - tops[index]}px`;
      });
    }
  }
  function schedule() { if (!pending) { pending = true; requestAnimationFrame(align); } }
  new MutationObserver(schedule).observe(gallery, {childList: true, subtree: true});
  gallery.addEventListener('load', schedule, true);
  gallery.addEventListener('toggle', schedule, true);
  window.addEventListener('resize', schedule);
  document.fonts?.ready.then(schedule);
  schedule();
})();
