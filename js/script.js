(function(){
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* horizontal morning in the oven room */
  const forno = document.getElementById('forno'), track = forno.querySelector('.track');
  const wide = matchMedia('(min-width: 821px)');
  let dist = 0, hz = false;
  function layoutForno(){
    hz = wide.matches && !reduce;
    if (hz){ dist = Math.max(0, track.scrollWidth - innerWidth); forno.style.height = (innerHeight + dist) + 'px'; }
    else { forno.style.height = ''; track.style.transform = ''; }
    scrollForno();
  }
  function scrollForno(){
    if (!hz) return;
    const r = forno.getBoundingClientRect(), span = forno.offsetHeight - innerHeight;
    const p = span > 0 ? Math.min(1, Math.max(0, -r.top / span)) : 0;
    track.style.transform = `translate3d(${-p * dist}px,0,0)`;
  }
  if (reduce){ forno.querySelector('.stick').style.cssText = 'position:static;height:auto;overflow-x:auto'; track.style.height = '78svh'; }
  addEventListener('scroll', scrollForno, { passive: true });
  let rt; addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(layoutForno, 150); });
  layoutForno();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(layoutForno);

  /* reveal: text is visible at rest and only settles into place */
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('[data-rv]').forEach(el => io.observe(el));
})();
