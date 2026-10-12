document.documentElement.classList.add('js');
const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
const motionButton = document.querySelector('.motion-toggle');
const revealTargets = document.querySelectorAll('.story-copy,.impact,.pictures-intro,.message-intro,.message-column,.photo-page-empty');
let motionPaused = motionPreference.matches;
let scrollFrame = 0;
const renderScroll = () => {
  scrollFrame = 0;
  const max = document.documentElement.scrollHeight - innerHeight;
  document.documentElement.style.setProperty('--progress', String(max > 0 ? scrollY / max : 0));
  document.documentElement.style.setProperty('--mew-y', motionPaused ? '0px' : `${Math.min(scrollY * .08, 200)}px`);
  const art = document.querySelector('.card-art');
  if (art) {
    const position = art.getBoundingClientRect().top;
    art.style.setProperty('--card-turn', motionPaused ? '0deg' : `${Math.max(-5, Math.min(7, (innerHeight / 2 - position) / 55))}deg`);
  }
};
const updateMotion = () => {
  document.documentElement.classList.toggle('motion-enabled', !motionPaused);
  document.documentElement.classList.toggle('motion-off', motionPaused);
  if (motionButton) {
    motionButton.hidden = false;
    motionButton.textContent = motionPaused ? 'Enable motion' : 'Pause motion';
    motionButton.setAttribute('aria-pressed', String(motionPaused));
  }
  renderScroll();
};
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if(entry.isIntersecting) { entry.target.classList.add('is-visible'); revealObserver.unobserve(entry.target); }
  }), {threshold: .12});
  revealTargets.forEach(target => { target.classList.add('reveal'); revealObserver.observe(target); });
}
motionButton?.addEventListener('click', () => { motionPaused = !motionPaused; updateMotion(); });
motionPreference.addEventListener('change', event => { motionPaused = event.matches; updateMotion(); });
addEventListener('scroll', () => { if (!scrollFrame) scrollFrame = requestAnimationFrame(renderScroll); }, {passive:true});
addEventListener('resize', renderScroll);
updateMotion();
const countElement = document.querySelector('[data-count]');
if (countElement && !motionPaused) {
  const total = Number(countElement.dataset.count);
  let started;
  const countFrame = time => {
    started ??= time;
    const progress = motionPaused ? 1 : Math.min((time - started) / 1500, 1);
    countElement.textContent = Math.round(total * (1 - Math.pow(1 - progress, 3))).toLocaleString('en-US');
    if (progress < 1) requestAnimationFrame(countFrame);
  };
  requestAnimationFrame(countFrame);
}
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
const messageForm = document.querySelector('#contact-form');
if (messageForm) {
  const status = document.querySelector('#form-status');
  const submit = messageForm.querySelector('button[type="submit"]');
  const submitLabel = submit.querySelector('.submit-label');
  let sending = false;
  const showStatus = (kind) => {
    status.hidden = false;
    status.textContent = messageForm.dataset[kind];
    status.dataset.state = kind;
    status.focus({preventScroll:true});
  };
  messageForm.addEventListener('submit', async event => {
    event.preventDefault();
    if (sending) return;
    const fields = ['name','email','message'].map(name => messageForm.elements.namedItem(name));
    fields.forEach(field => { field.value = field.value.trim(); });
    if (!messageForm.reportValidity()) { showStatus('invalid'); return; }
    if (messageForm.elements.namedItem('_honey').value) { showStatus('error'); return; }
    sending = true;
    fields.forEach(field => { field.readOnly = true; });
    submit.disabled = true;
    messageForm.setAttribute('aria-busy','true');
    submitLabel.textContent = messageForm.dataset.sending;
    status.hidden = true;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch(messageForm.dataset.endpoint, {
        method:'POST', headers:{'Content-Type':'application/json','Accept':'application/json'},
        body:JSON.stringify(Object.fromEntries(new FormData(messageForm))), signal:controller.signal
      });
      const payload = await response.json();
      const kind = classifyFormResponse(response.ok, payload);
      if (kind === 'success') messageForm.reset();
      showStatus(kind);
    } catch { showStatus('error'); }
    finally {
      clearTimeout(timeout);
      sending = false;
      fields.forEach(field => { field.readOnly = false; });
      submit.disabled = false;
      messageForm.removeAttribute('aria-busy');
      submitLabel.textContent = messageForm.dataset.submit;
    }
  });
}

// Accept a genuine provider acknowledgement, never a successful HTTP status alone.
function classifyFormResponse(ok, payload) {
  if (/activat|confirm.*email|verify.*email/i.test(String(payload?.message ?? ''))) return 'inactive';
  return ok && (payload?.success === true || payload?.success === 'true') ? 'success' : 'error';
}
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
