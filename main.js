/* =========================================================
   Marlowe & Muse - main.js (Part 3)
   Features: nav state, scroll animations, modal, accordion,
   tabs + search + sort (dynamic services), gallery lightbox,
   Leaflet map, enquiry quote + validation + AJAX, contact email.
   ========================================================= */
(function () {
  'use strict';
  document.documentElement.classList.add('js');

  /* ---------- Helpers ---------- */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  // Builds an element safely (text is set with textContent, never innerHTML)
  function el(tag, props = {}, ...kids) {
    const n = document.createElement(tag);
    Object.entries(props).forEach(([k, v]) => {
      if (k === 'class') n.className = v;
      else if (k === 'text') n.textContent = v;
      else n.setAttribute(k, v);
    });
    kids.forEach(k => n.append(k));
    return n;
  }
  const money = n => 'R' + Number(n).toLocaleString('en-US');
  const page = document.body.dataset.page;

  /* ---------- Current page in nav ---------- */
  $$('.site-header nav a').forEach(a => {
    if (a.getAttribute('href') === page + '.html') a.setAttribute('aria-current', 'page');
  });

  /* ---------- Scroll-reveal animation (IntersectionObserver) ---------- */
  const io = 'IntersectionObserver' in window
    ? new IntersectionObserver(entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
      }), { threshold: 0.1 })
    : null;
  function reveal(nodes) {
    nodes.forEach(n => { n.classList.add('reveal'); io ? io.observe(n) : n.classList.add('visible'); });
  }
  reveal($$('.section, .column, .gallery-item'));

  /* ---------- Back-to-top button (created with the DOM) ---------- */
  const topBtn = el('button', { id: 'back-to-top', type: 'button', 'aria-label': 'Back to top', text: '\u2191' });
  document.body.append(topBtn);
  topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  window.addEventListener('scroll', () => topBtn.classList.toggle('show', window.scrollY > 400), { passive: true });

  /* ---------- Reusable modal dialog ---------- */
  function openModal(title, content) {
    const opener = document.activeElement;
    const closeBtn = el('button', { class: 'modal-close', type: 'button', 'aria-label': 'Close dialog', text: '\u00d7' });
    const box = el('div', { class: 'modal', role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': 'modal-title', tabindex: '-1' },
      closeBtn, el('h2', { id: 'modal-title', text: title }), content);
    const overlay = el('div', { class: 'modal-overlay' }, box);
    const onKey = e => { if (e.key === 'Escape') close(); };
    function close() {
      document.removeEventListener('keydown', onKey);
      overlay.classList.remove('open');
      setTimeout(() => overlay.remove(), 200);
      if (opener && opener.focus) opener.focus();
    }
    closeBtn.addEventListener('click', close);
    overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
    document.addEventListener('keydown', onKey);
    document.body.append(overlay);
    requestAnimationFrame(() => overlay.classList.add('open'));
    box.focus();
  }

  /* ---------- Accordion (FAQ) ---------- */
  $$('.accordion-btn').forEach(btn => btn.addEventListener('click', () => {
    const open = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!open));
    document.getElementById(btn.getAttribute('aria-controls')).hidden = open;
  }));

  /* ---------- Services: dynamic load, tabs, search, sort ---------- */
  async function initServices() {
    const list = $('#services-list');
    if (!list) return;
    const status = $('#service-status');
    const state = { cat: 'all', q: '', sort: 'default' };
    let data;
    try {
      const res = await fetch('data/services.json');
      if (!res.ok) throw new Error(res.status);
      data = await res.json();
    } catch (err) {
      list.textContent = 'Services could not be loaded. If you are viewing the files locally, open the site with a local server (e.g. VS Code Live Server).';
      return;
    }

    function showDetails(s) {
      const body = el('div', {},
        el('p', { text: s.details }),
        el('p', {}, el('strong', { text: 'Duration: ' }), s.duration),
        el('p', {}, el('strong', { text: 'Price: ' }), 'From ' + money(s.price)),
        el('a', { class: 'btn btn-primary', href: 'enquiry.html?service=' + encodeURIComponent(s.category), text: 'Enquire about this' }));
      openModal(s.name, body);
    }
    function card(s) {
      const more = el('button', { class: 'btn-link', type: 'button', text: 'View details' });
      more.addEventListener('click', () => showDetails(s));
      return el('div', { class: 'service' },
        el('h3', {}, s.name + ' - ', el('span', { class: 'price', text: 'From ' + money(s.price) })),
        el('p', { text: s.description }), more);
    }
    function render() {
      const items = data.filter(s => (state.cat === 'all' || s.category === state.cat) &&
        (s.name + ' ' + s.description).toLowerCase().includes(state.q));
      if (state.sort === 'low') items.sort((a, b) => a.price - b.price);
      if (state.sort === 'high') items.sort((a, b) => b.price - a.price);
      if (state.sort === 'name') items.sort((a, b) => a.name.localeCompare(b.name));
      list.replaceChildren(...items.map(card));
      status.textContent = items.length ? `Showing ${items.length} of ${data.length} services.` : 'No services match your search. Try a different word or choose All.';
      reveal($$('.service', list));
    }

    const tabs = $$('#service-tabs [role="tab"]');
    tabs.forEach((t, i) => {
      t.addEventListener('click', () => {
        tabs.forEach(x => x.setAttribute('aria-selected', String(x === t)));
        state.cat = t.dataset.cat; render();
      });
      t.addEventListener('keydown', e => {  // arrow-key navigation between tabs
        const d = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
        if (d) { const n = tabs[(i + d + tabs.length) % tabs.length]; n.focus(); n.click(); }
      });
    });
    $('#service-search').addEventListener('input', e => { state.q = e.target.value.trim().toLowerCase(); render(); });
    $('#service-sort').addEventListener('change', e => { state.sort = e.target.value; render(); });
    render();
  }

  /* ---------- Gallery lightbox ---------- */
  function initGallery() {
    const links = $$('.gallery-item a');
    if (!links.length) return;
    let i = 0;
    const img = el('img', { alt: '' });
    const cap = el('figcaption', {});
    const closeBtn = el('button', { class: 'lb-close', type: 'button', 'aria-label': 'Close image viewer', text: '\u00d7' });
    const prev = el('button', { class: 'lb-nav lb-prev', type: 'button', 'aria-label': 'Previous image', text: '\u2039' });
    const next = el('button', { class: 'lb-nav lb-next', type: 'button', 'aria-label': 'Next image', text: '\u203a' });
    const lb = el('div', { class: 'lightbox', role: 'dialog', 'aria-modal': 'true', 'aria-label': 'Image viewer' },
      closeBtn, prev, el('figure', {}, img, cap), next);
    document.body.append(lb);
    let opener;
    function show(n) {
      i = (n + links.length) % links.length;
      img.src = links[i].href;
      img.alt = links[i].querySelector('img').alt;
      cap.textContent = links[i].dataset.caption + ' (' + (i + 1) + ' of ' + links.length + ')';
    }
    function open(n) { opener = document.activeElement; show(n); lb.classList.add('open'); closeBtn.focus(); }
    function close() { lb.classList.remove('open'); if (opener) opener.focus(); }
    links.forEach((a, n) => a.addEventListener('click', e => { e.preventDefault(); open(n); }));
    closeBtn.addEventListener('click', close);
    prev.addEventListener('click', () => show(i - 1));
    next.addEventListener('click', () => show(i + 1));
    lb.addEventListener('click', e => { if (e.target === lb) close(); });
    document.addEventListener('keydown', e => {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(i - 1);
      if (e.key === 'ArrowRight') show(i + 1);
    });
  }

  /* ---------- Leaflet map (contact page) ---------- */
  function initMap() {
    const box = $('#map');
    if (!box) return;
    if (!window.L) { box.textContent = 'The map could not be loaded. Our Melville studio is at 7th Street, Melville.'; return; }
    const studios = [
      { name: 'Melville Studio', lat: -26.1766, lng: 28.0100, info: '7th Street, Melville, Johannesburg' },
      { name: 'Pretoria Partner Studio', lat: -25.7490, lng: 28.2380, info: 'Hatfield, Pretoria' }
    ];
    box.replaceChildren();
    const map = L.map(box, { scrollWheelZoom: false });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19, attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
    const markers = studios.map(s => L.marker([s.lat, s.lng]).addTo(map)
      .bindPopup(el('div', {}, el('strong', { text: s.name }), el('br'), s.info)));
    map.fitBounds(L.featureGroup(markers).getBounds().pad(0.3));
    $$('[data-studio]').forEach(b => b.addEventListener('click', () => {
      const s = studios[b.dataset.studio];
      map.flyTo([s.lat, s.lng], 14);
      markers[b.dataset.studio].openPopup();
      box.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }));
  }

  /* ---------- Form validation helpers ---------- */
  function setError(input, msg) {
    let err = document.getElementById(input.id + '-error');
    if (!err) {
      err = el('span', { class: 'error', id: input.id + '-error', role: 'alert' });
      input.insertAdjacentElement('afterend', err);
      input.setAttribute('aria-describedby', err.id);
    }
    err.textContent = msg;
    if (msg) input.setAttribute('aria-invalid', 'true'); else input.removeAttribute('aria-invalid');
  }
  // rules: { fieldId: value => errorMessage ('' = valid) }
  function attachValidation(form, rules, onValid) {
    const check = input => { const m = rules[input.id](input.value.trim(), input); setError(input, m); return !m; };
    const inputs = Object.keys(rules).map(id => document.getElementById(id));
    inputs.forEach(inp => {
      inp.addEventListener('blur', () => check(inp));
      inp.addEventListener('input', () => { if (inp.hasAttribute('aria-invalid')) check(inp); });
    });
    form.addEventListener('submit', e => {
      e.preventDefault();
      const bad = inputs.filter(inp => !check(inp));
      if (bad.length) { bad[0].focus(); return; }
      onValid();
    });
  }
  function counter(textarea, out) {
    const max = textarea.maxLength;
    const upd = () => { out.textContent = textarea.value.length + ' / ' + max; };
    textarea.addEventListener('input', upd); upd();
  }
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const nameRe = /^[A-Za-z\u00C0-\u024F'\u2019 -]{2,60}$/;
  const phoneOk = v => /^(\+27|0)[1-8]\d{8}$/.test(v.replace(/[\s-]/g, ''));

  /* ---------- Enquiry form: validation, quote, AJAX ---------- */
  function initEnquiry() {
    const form = $('#enquiry-form');
    if (!form) return;
    const pre = new URLSearchParams(location.search).get('service');
    const radio = pre && $(`input[name="service-type"][value="${CSS.escape(pre)}"]`);
    if (radio) radio.checked = true;
    const dateInput = $('#event-date');
    dateInput.min = new Date().toISOString().split('T')[0];
    counter($('#details'), $('#details-count'));

    const rules = {
      'full-name': v => !v ? 'Enter your full name.' : !nameRe.test(v) ? 'Use letters only, 2 to 60 characters.' : '',
      'email': v => !v ? 'Enter your email address.' : !emailRe.test(v) ? 'Enter a valid email, like name@example.com.' : '',
      'phone': v => v && !phoneOk(v) ? 'Enter a valid South African number, like 082 000 0000.' : '',
      'event-date': v => {
        if (!v) return 'Choose your event date.';
        const d = new Date(v + 'T00:00:00'), t = new Date(); t.setHours(0, 0, 0, 0);
        if (isNaN(d)) return 'Enter a valid date.';
        if (d < t) return 'The event date cannot be in the past.';
        if (d > new Date(t.getFullYear() + 2, t.getMonth(), t.getDate())) return 'Please choose a date within the next two years.';
        return '';
      },
      'headcount': v => !/^\d+$/.test(v) || +v < 1 || +v > 20 ? 'Enter a whole number from 1 to 20.' : '',
      'venue': v => v && v.length < 3 ? 'Enter at least 3 characters, e.g. Sandton.' : '',
      'details': v => v.length > 500 ? 'Please keep this under 500 characters.' : ''
    };

    function buildQuote() {
      const fd = new FormData(form);
      const type = fd.get('service-type'), n = +fd.get('headcount'), add = fd.getAll('addons');
      const lines = [];
      if (type === 'bridal') { lines.push(['Wedding-day makeup (bride)', 3500]); if (n > 1) lines.push([`Bridal party x ${n - 1}`, (n - 1) * 950]); }
      else if (type === 'editorial') lines.push([`Half-day shoot x ${n}`, n * 1800]);
      else if (type === 'occasion') lines.push([`Special occasion makeup x ${n}`, n * 650]);
      if (add.includes('lashes')) lines.push([`Individual lashes x ${n}`, n * 180]);
      if (add.includes('airbrush')) lines.push(['Airbrush foundation upgrade', 350]);
      if (add.includes('early-start')) lines.push(['Early start fee', 400]);
      return { type, lines, total: lines.reduce((s, l) => s + l[1], 0), venue: (fd.get('venue') || '').trim() };
    }
    function availability(value) {
      const d = new Date(value + 'T00:00:00'), t = new Date(); t.setHours(0, 0, 0, 0);
      const days = Math.round((d - t) / 864e5);
      if (days < 14) return 'Short notice: this date is within two weeks, so availability is limited. We will check the diary and reply first.';
      if (d.getDay() === 6) return 'Saturdays book out early. Your date is in high demand, so we recommend confirming soon.';
      return 'Good news: this date looks open. We will confirm it within two business days.';
    }
    function showResult() {
      const q = buildQuote();
      const body = el('div', {});
      if (q.lines.length) {
        const tbody = el('tbody', {});
        q.lines.forEach(l => tbody.append(el('tr', {}, el('td', { text: l[0] }), el('td', { text: money(l[1]) }))));
        tbody.append(el('tr', { class: 'quote-total' }, el('td', { text: 'Estimated total (from)' }), el('td', { text: money(q.total) })));
        body.append(el('table', { class: 'quote-table' }, tbody));
      } else {
        body.append(el('p', { text: 'Your request needs a custom quote. We will price it once we know more about your event.' }));
      }
      body.append(el('p', { text: availability($('#event-date').value) }));
      const far = q.venue && !/melville|johannesburg|joburg|sandton|randburg|rosebank|soweto|roodepoort|fourways|midrand|parktown|northcliff|linden|braamfontein/i.test(q.venue);
      if (far) body.append(el('p', { text: 'A travel fee from R250 may apply for ' + q.venue + '.' }));
      body.append(el('p', {}, el('small', { text: 'This is an estimate. We will send a final quote by email.' })));
      openModal('Thank you, ' + $('#full-name').value.trim().split(' ')[0], body);
    }

    attachValidation(form, rules, async () => {
      const btn = $('button[type="submit"]', form), status = $('#form-status');
      btn.disabled = true; btn.textContent = 'Sending...'; status.hidden = true;
      try {
        // AJAX submit. While the action still contains the placeholder id, the send is simulated.
        if (/your-form-id/.test(form.action)) await new Promise(r => setTimeout(r, 800));
        else {
          const res = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
          if (!res.ok) throw new Error(res.status);
        }
        showResult();
        form.reset(); counter($('#details'), $('#details-count'));
      } catch (err) {
        status.textContent = 'Your enquiry could not be sent. Check your connection and try again, or email hello@marloweandmuse.co.za.';
        status.hidden = false;
      } finally {
        btn.disabled = false; btn.textContent = 'Send enquiry';
      }
    });
  }

  /* ---------- Contact form: validate, compile email ---------- */
  function initContact() {
    const form = $('#contact-form');
    if (!form) return;
    const RECIPIENT = 'hello@marloweandmuse.co.za';
    counter($('#c-message'), $('#c-count'));
    const rules = {
      'c-name': v => !v ? 'Enter your name.' : !nameRe.test(v) ? 'Use letters only, 2 to 60 characters.' : '',
      'c-email': v => !v ? 'Enter your email address.' : !emailRe.test(v) ? 'Enter a valid email, like name@example.com.' : '',
      'c-phone': v => v && !phoneOk(v) ? 'Enter a valid South African number, like 082 000 0000.' : '',
      'c-type': v => !v ? 'Choose a type of message.' : '',
      'c-message': v => v.length < 10 ? 'Write at least 10 characters.' : v.length > 1000 ? 'Keep your message under 1000 characters.' : ''
    };
    attachValidation(form, rules, () => {
      const v = id => $('#' + id).value.trim();
      const subject = `[${v('c-type')}] Message from ${v('c-name')}`;
      const body = `${v('c-message')}\n\n--\nName: ${v('c-name')}\nEmail: ${v('c-email')}` + (v('c-phone') ? `\nPhone: ${v('c-phone')}` : '');
      const href = `mailto:${RECIPIENT}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      const box = $('#email-preview');
      const edit = el('button', { type: 'button', class: 'btn-small', text: 'Edit message' });
      edit.addEventListener('click', () => { box.hidden = true; $('#c-message').focus(); });
      box.replaceChildren(
        el('h3', { text: 'Your email is ready' }),
        el('p', {}, el('strong', { text: 'To: ' }), RECIPIENT),
        el('p', {}, el('strong', { text: 'Subject: ' }), subject),
        el('pre', { text: body }),
        el('a', { class: 'btn btn-primary', href, text: 'Open in my email app' }), edit);
      box.hidden = false;
      box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }

  initServices(); initGallery(); initMap(); initEnquiry(); initContact();
})();
