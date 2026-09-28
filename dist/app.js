document.documentElement.classList.add('js');
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#main-nav');
toggle.hidden = false;
const setMenu = (open, restore = false) => {
  toggle.setAttribute('aria-expanded', String(open));
  toggle.innerHTML = `${open ? toggle.dataset.close : toggle.dataset.open} <span aria-hidden="true">${open ? '−' : '+'}</span>`;
  nav.classList.toggle('is-open', open);
  if (restore) toggle.focus();
};
toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
document.addEventListener('keydown', e => { if(e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') setMenu(false, true); });
document.addEventListener('click', e => { if(!e.target.closest('.site-header')) setMenu(false); });
nav.addEventListener('click', e => { if(e.target.closest('a')) setMenu(false); });
matchMedia('(min-width: 701px)').addEventListener('change', () => setMenu(false));
document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', () => {
  const target = document.querySelector(a.getAttribute('href'));
  if(target && target.id !== 'top') { target.setAttribute('tabindex','-1'); target.focus({preventScroll:true}); }
}));
const dialog = document.querySelector('.lightbox');
if (dialog) {
  const photos = JSON.parse(document.querySelector('#gallery-data').textContent);
  const photo = dialog.querySelector('.lightbox-image');
  let current = 0;
  let opener;
  const show = index => {
    current = (index + photos.length) % photos.length;
    const item = photos[current];
    photo.src = item.src; photo.alt = item.alt; photo.width = item.width; photo.height = item.height;
    dialog.querySelector('.lightbox-caption').textContent = item.caption;
    dialog.querySelector('.photo-count').textContent = `${current + 1} / ${photos.length}`;
  };
  document.querySelectorAll('.photo-trigger').forEach(button => button.addEventListener('click', () => { opener=button; show(Number(button.dataset.photo)); dialog.showModal(); dialog.querySelector('.close-photo').focus(); }));
  dialog.querySelector('.close-photo').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => opener?.focus());
  dialog.addEventListener('click', e => { if(e.target===dialog) { const r=dialog.getBoundingClientRect(); if(e.clientX<r.left || e.clientX>r.right || e.clientY<r.top || e.clientY>r.bottom) dialog.close(); } });
  dialog.querySelector('.previous-photo').addEventListener('click', () => show(current-1));
  dialog.querySelector('.next-photo').addEventListener('click', () => show(current+1));
  if(photos.length===1) dialog.querySelector('.lightbox-controls').hidden=true;
  dialog.addEventListener('keydown', e => {
    if(e.key==='ArrowLeft') { e.preventDefault(); show(current-1); }
    if(e.key==='ArrowRight') { e.preventDefault(); show(current+1); }
    if(e.key==='Tab') {
      const controls=[...dialog.querySelectorAll('button')].filter(b => b.offsetParent!==null);
      const first=controls[0],last=controls.at(-1);
      if(e.shiftKey && document.activeElement===first) {e.preventDefault();last.focus();}
      else if(!e.shiftKey && document.activeElement===last) {e.preventDefault();first.focus();}
    }
  });
}
