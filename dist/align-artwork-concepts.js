(() => {
  const gallery = document.getElementById('gallery');
  let pending = false;
  const top = node => node.getBoundingClientRect().top;
  function matchTops(nodes) {
    if (nodes.some(node => !node)) return;
    const tops = nodes.map(top), target = Math.max(...tops);
    if (target - Math.min(...tops) > 160) return;
    nodes.forEach((node, i) => {
      node.style.marginTop = (parseFloat(getComputedStyle(node).marginTop) + target - tops[i]) + 'px';
    });
  }
  function align() {
    pending = false;
    const cards = [...gallery.querySelectorAll('.graphic-work, :scope[data-category="painting"] > figure, .sketch-series')];
    for (const card of cards) {
      card.style.removeProperty('padding-bottom');
      for (const node of card.querySelectorAll(':scope > figcaption, :scope > .artwork-concept, .project-caption, :scope > .graphic-details')) node.style.removeProperty('margin-top');
    }
    if (innerWidth <= 650) return;
    for (let i = 0; i + 1 < cards.length; i += 2) {
      const pair = cards.slice(i, i + 2);
      if (Math.abs(top(pair[0]) - top(pair[1])) > 2) continue;
      if (pair[0].classList.contains('sketch-series')) {
        matchTops(pair.map(card => card.querySelector('.project-caption')));
        matchTops(pair.map(card => card.querySelector(':scope > .graphic-details')));
        const bottoms = pair.map(card => card.getBoundingClientRect().bottom);
        if (Math.abs(bottoms[0] - bottoms[1]) <= 160) pair.forEach((card, j) => {
          card.style.paddingBottom = (parseFloat(getComputedStyle(card).paddingBottom) + Math.max(...bottoms) - bottoms[j]) + 'px';
        });
      } else {
        matchTops(pair.map(card => card.querySelector(':scope > figcaption')));
        matchTops(pair.map(card => card.querySelector(':scope > .artwork-concept')));
      }
    }
  }
  function schedule() { if (!pending) { pending = true; requestAnimationFrame(align); } }
  new MutationObserver(schedule).observe(gallery, {childList: true, subtree: true});
  gallery.addEventListener('load', schedule, true);
  gallery.addEventListener('toggle', schedule, true);
  gallery.addEventListener('click', schedule);
  window.addEventListener('resize', schedule);
  document.fonts?.ready.then(schedule);
  schedule();
})();
