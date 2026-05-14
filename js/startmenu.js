/* ============================================================
   Start Menu & Search - Windows 11 Portfolio
   ============================================================ */

(function () {
  'use strict';

  const startMenu = document.getElementById('startMenu');
  const startBtn = document.getElementById('start-btn');
  const searchOverlay = document.getElementById('searchOverlay');
  const searchPanel = document.getElementById('searchPanel');
  const searchInputLarge = document.getElementById('searchInputLarge');

  let isOpen = false;
  let currentView = 'pinned'; // 'pinned' | 'allapps' | 'search'

  /* ============================================================
     App Data
     ============================================================ */

  const PINNED_APPS = [
    { id: 'file-explorer', name: 'File Explorer', icon: ic('fe'), section: 'File Explorer' },
    { id: 'notepad', name: 'Resume', icon: ic('note'), section: 'Resume' },
    { id: 'edge', name: 'GitHub', icon: ic('edge'), section: 'GitHub' },
    { id: 'settings', name: 'Settings', icon: ic('sett'), section: 'Settings' },
    { id: 'calculator', name: 'Calculator', icon: ic('calc'), section: 'Calculator' },
    { id: 'game', name: 'Snake Game', icon: ic('game'), section: 'Snake Game' },
    { id: 'expertise', name: 'Expertise', icon: ic('exp'), section: 'Expertise' },
    { id: 'services', name: 'Services', icon: ic('srv'), section: 'Services' },
    { id: 'portfolio-viewer', name: 'Portfolio', icon: ic('pv'), section: 'Portfolio' },
    { id: 'contact', name: 'Contact', icon: ic('mail'), section: 'Contact' },
    { id: 'recycle-bin', name: 'Recycle Bin', icon: ic('bin'), section: 'Recycle Bin' },
    { id: 'about', name: 'About', icon: ic('about'), section: 'About Me' },
  ];

  const ALL_APPS = [
    { id: 'file-explorer', name: 'File Explorer', icon: ic('fe') },
    { id: 'notepad', name: 'Resume', icon: ic('note') },
    { id: 'edge', name: 'GitHub', icon: ic('edge') },
    { id: 'settings', name: 'Settings', icon: ic('sett') },
    { id: 'calculator', name: 'Calculator', icon: ic('calc') },
    { id: 'game', name: 'Snake Game', icon: ic('game') },
    { id: 'expertise', name: 'Expertise', icon: ic('exp') },
    { id: 'services', name: 'Services', icon: ic('srv') },
    { id: 'portfolio-viewer', name: 'Portfolio', icon: ic('pv') },
    { id: 'recycle-bin', name: 'Recycle Bin', icon: ic('bin') },
    { id: 'contact', name: 'Contact', icon: ic('mail') },
    { id: 'about', name: 'About', icon: ic('about') },
  ].sort((a, b) => a.name.localeCompare(b.name));

  const RECOMMENDED = [
    { name: 'Resume_Oke_Precious.docx', meta: 'Document · 2 days ago', icon: ic('note') },
    { name: 'My Projects', meta: 'Folder · Today', icon: ic('fe') },
    { name: 'GitHub Profile', meta: 'Link · Yesterday', icon: ic('edge') },
    { name: 'Skills & Stack', meta: 'Settings · 3 days ago', icon: ic('sett') },
    { name: 'Portfolio Window.js', meta: 'Project · 1 day ago', icon: ic('code') },
    { name: 'LinkedIn Profile', meta: 'Link · 4 days ago', icon: ic('li') },
  ];

  const SEARCH_DATASET = [
    { name: 'File Explorer', type: 'App', action: 'file-explorer' },
    { name: 'Resume', type: 'App', action: 'notepad' },
    { name: 'GitHub', type: 'App', action: 'edge' },
    { name: 'Settings', type: 'App', action: 'settings' },
    { name: 'Calculator', type: 'App', action: 'calculator' },
    { name: 'Snake Game', type: 'App', action: 'game' },
    { name: 'Expertise', type: 'App', action: 'expertise' },
    { name: 'Services', type: 'App', action: 'services' },
    { name: 'Portfolio', type: 'App', action: 'portfolio-viewer' },
    { name: 'Contact', type: 'App', action: 'contact' },
    { name: 'About Me', type: 'App', action: 'settings' },
    { name: 'Recycle Bin', type: 'App', action: 'recycle-bin' },
    { name: 'JavaScript', type: 'Skill', badge: 'Projects', action: 'file-explorer' },
    { name: 'React', type: 'Skill', badge: 'Projects', action: 'file-explorer' },
    { name: 'Node.js', type: 'Skill', badge: 'Projects', action: 'file-explorer' },
    { name: 'Python', type: 'Skill', badge: 'Projects', action: 'file-explorer' },
    { name: 'Oke Precious Abioye', type: 'Person', badge: 'About', action: 'settings' },
    { name: 'E-Commerce Platform', type: 'Project', action: 'file-explorer' },
    { name: 'Task Management App', type: 'Project', action: 'file-explorer' },
    { name: 'Weather Dashboard', type: 'Project', action: 'file-explorer' },
  ];

  /* ============================================================
     Icon Helpers
     ============================================================ */

  function ic(type) {
    const icons = {
      fe: `<svg viewBox="0 0 36 36"><defs><linearGradient id="sfe" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" style="stop-color:#FFD54F"/><stop offset="100%" style="stop-color:#F9A825"/></linearGradient></defs><path d="M3 5a2 2 0 012-2h4l2 2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" fill="url(#sfe)"/><path d="M3 7C3 6.45 3.45 6 4 6h28C32.55 6 33 6.45 33 7v10c0 .55-.45 1-1 1H4c-.55 0-1-.45-1-1V7z" fill="#FFCA28"/></svg>`,
      note: `<svg viewBox="0 0 36 36"><defs><linearGradient id="snt" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" style="stop-color:#43A3F5"/><stop offset="100%" style="stop-color:#2B7CD3"/></linearGradient></defs><path d="M4 4a2 2 0 00-2 2v24a2 2 0 002 2h28a2 2 0 002-2V10L24 4H4z" fill="url(#snt)"/><path d="M24 4v6h6" fill="#185ABD"/><path d="M6 12h24M6 18h16" stroke="white" stroke-width="1.5" opacity="0.4"/></svg>`,
      edge: `<svg viewBox="0 0 36 36"><defs><linearGradient id="sed" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" style="stop-color:#42A5F5"/><stop offset="100%" style="stop-color:#1976D2"/></linearGradient></defs><circle cx="18" cy="18" r="16" fill="url(#sed)"/><path d="M18 5C11 5 6 11 6 18c0 4 2 7 4 9l5-4c0-3 3-5 5-5 0-2-1-4-2-4s-3 1-3 3v1l3-1c4-1 7-4 7-9-3-6-10-7-14-7h8z" fill="white"/></svg>`,
      sett: `<svg viewBox="0 0 36 36"><defs><linearGradient id="sst" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" style="stop-color:#90A4AE"/><stop offset="100%" style="stop-color:#546E7A"/></linearGradient></defs><circle cx="18" cy="18" r="5" fill="none" stroke="url(#sst)" stroke-width="2.5"/><path d="M18 2C14 2 11 5 11 9h4c0-2 1.5-3 3-3s3 1 3 3h4c0-4-3-7-7-7zm0 32c4 0 7-3 7-7h-4c0 2-1.5 3-3 3s-3-1-3-3H11c0 4 3 7 7 7zM2 18c0-4 3-7 7-7v4c-2 0-3 1-3 3s1 3 3 3v4c-4 0-7-3-7-7zm32 0c0 4-3 7-7 7v-4c2 0 3-1 3-3s-1-3-3-3v-4c4 0 7 3 7 7z" fill="url(#sst)"/></svg>`,
      code: `<svg viewBox="0 0 36 36"><defs><linearGradient id="scd" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" style="stop-color:#007ACC"/><stop offset="100%" style="stop-color:#005C99"/></linearGradient></defs><rect width="36" height="36" rx="4" fill="url(#scd)"/><path d="M11 14l-5 4 5 4M25 14l5 4-5 4M19 11l-2 14" stroke="#E8E8E8" stroke-width="1.8" fill="none" stroke-linecap="round"/></svg>`,
      react: `<svg viewBox="0 0 36 36"><defs><linearGradient id="srt" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" style="stop-color:#61DAFB"/><stop offset="100%" style="stop-color:#53C1DE"/></linearGradient></defs><circle cx="18" cy="18" r="16" fill="url(#srt)"/><ellipse cx="18" cy="18" rx="6" ry="16" fill="none" stroke="#fff" stroke-width="1.2" opacity="0.5" transform="rotate(60 18 18)"/><ellipse cx="18" cy="18" rx="6" ry="16" fill="none" stroke="#fff" stroke-width="1.2" opacity="0.5" transform="rotate(-60 18 18)"/><ellipse cx="18" cy="18" rx="6" ry="16" fill="none" stroke="#fff" stroke-width="1.2" opacity="0.5"/><circle cx="18" cy="18" r="3" fill="#fff"/></svg>`,
      python: `<svg viewBox="0 0 36 36"><defs><linearGradient id="spy" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" style="stop-color:#3776AB"/><stop offset="100%" style="stop-color:#FFD43B"/></linearGradient></defs><path d="M18 2a7 7 0 010 14v2h5a7 7 0 010 14h-2a7 7 0 010-14h-5a7 7 0 010-14h2a7 7 0 010-14z" fill="url(#spy)" opacity="0.9"/><path d="M8 11a7 7 0 00-7 14h5v-2a7 7 0 012-14z" fill="#5A9FD4"/><text x="18" y="21" text-anchor="middle" font-size="8" fill="#fff" font-weight="bold">Py</text></svg>`,
      figma: `<svg viewBox="0 0 36 36"><rect width="36" height="36" rx="6" fill="#1E1E1E"/><path d="M12 6a6 6 0 00-6 6v6a6 6 0 006 6h6a6 6 0 006-6v-6a6 6 0 00-6-6z" fill="#0ACF83"/><path d="M18 6a6 6 0 000 12v12h6a6 6 0 000-12h-6V18z" fill="#A259FF"/><path d="M12 18a6 6 0 000 12v-6H6a6 6 0 006-6z" fill="#F24E1E"/><path d="M12 18h6v6a6 6 0 01-6 6z" fill="#FF7262"/><path d="M18 24h6a6 6 0 000-12h-6v12z" fill="#1ABCFE"/></svg>`,
      term: `<svg viewBox="0 0 36 36"><rect width="36" height="36" rx="4" fill="#000"/><path d="M8 14l5 4-5 4M15 22h13" stroke="#00FF00" stroke-width="2" fill="none" stroke-linecap="round"/></svg>`,
      mail: `<svg viewBox="0 0 36 36"><defs><linearGradient id="sml" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" style="stop-color:#5C9CE6"/><stop offset="100%" style="stop-color:#4078C0"/></linearGradient></defs><rect x="2" y="8" width="32" height="20" rx="3" fill="url(#sml)"/><path d="M2 11L18 20L34 11" stroke="#2E5C9E" stroke-width="2" fill="none"/><path d="M2 28L18 19L34 28" stroke="rgba(0,0,0,0.1)" stroke-width="1.5" fill="none"/></svg>`,
      bin: `<svg viewBox="0 0 36 36"><defs><linearGradient id="srb" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" style="stop-color:#78909C"/><stop offset="100%" style="stop-color:#546E7A"/></linearGradient></defs><path d="M6 10h24v22H6V10z" fill="url(#srb)" rx="2"/><path d="M10 10V7h16v3" stroke="#546E7A" stroke-width="3" fill="none"/><path d="M8 12h20M8 18h20M8 24h20" stroke="rgba(255,255,255,0.2)" stroke-width="1.5"/></svg>`,
      ts: `<svg viewBox="0 0 36 36"><rect width="36" height="36" rx="4" fill="#3178C6"/><text x="18" y="23" text-anchor="middle" font-size="11" fill="#fff" font-weight="bold">TS</text></svg>`,
      node: `<svg viewBox="0 0 36 36"><rect width="36" height="36" rx="4" fill="#339933"/><text x="18" y="23" text-anchor="middle" font-size="9" fill="#fff" font-weight="bold">Node</text></svg>`,
      docker: `<svg viewBox="0 0 36 36"><rect width="36" height="36" rx="4" fill="#2496ED"/><path d="M10 10h4v4h-4zM16 10h4v4h-4zM22 10h4v4h-4zM10 16h4v4h-4zM16 16h4v4h-4zM22 16h4v4h-4zM10 22h4v4h-4zM16 22h4v4h-4z" fill="rgba(255,255,255,0.6)"/></svg>`,
      li: `<svg viewBox="0 0 36 36"><rect width="36" height="36" rx="4" fill="#0A66C2"/><text x="18" y="23" text-anchor="middle" font-size="11" fill="#fff" font-weight="bold">in</text></svg>`,
      calc: `<svg viewBox="0 0 36 36"><defs><linearGradient id="sclc" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" style="stop-color:#4FC3F7"/><stop offset="100%" style="stop-color:#0288D1"/></linearGradient></defs><rect x="4" y="2" width="28" height="32" rx="3" fill="url(#sclc)"/><rect x="8" y="6" width="20" height="7" rx="1.5" fill="rgba(255,255,255,0.3)"/><circle cx="12" cy="18" r="2" fill="rgba(255,255,255,0.8)"/><circle cx="18" cy="18" r="2" fill="rgba(255,255,255,0.8)"/><circle cx="24" cy="18" r="2" fill="rgba(255,255,255,0.8)"/><circle cx="12" cy="25" r="2" fill="rgba(255,255,255,0.8)"/><circle cx="18" cy="25" r="2" fill="rgba(255,255,255,0.8)"/><circle cx="24" cy="25" r="2" fill="rgba(255,255,255,0.8)"/><circle cx="12" cy="32" r="2" fill="rgba(255,255,255,0.8)"/><circle cx="18" cy="32" r="2" fill="#FFD54F"/><circle cx="24" cy="32" r="2" fill="rgba(255,255,255,0.8)"/></svg>`,
      game: `<svg viewBox="0 0 36 36"><defs><linearGradient id="sgm" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" style="stop-color:#7C4DFF"/><stop offset="100%" style="stop-color:#651FFF"/></linearGradient></defs><path d="M4 10H32C33.1 10 34 10.9 34 12V24C34 25.1 33.1 26 32 26H4C2.9 26 2 25.1 2 24V12C2 10.9 2.9 10 4 10Z" fill="url(#sgm)"/><circle cx="11" cy="18" r="3" fill="white" opacity="0.8"/><rect x="26" y="15" width="5" height="5" rx="1" fill="white" opacity="0.5"/><path d="M6 13h3M9 11v2" stroke="white" stroke-width="1.5" opacity="0.5"/></svg>`,
      exp: `<svg viewBox="0 0 36 36"><defs><linearGradient id="sexp" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" style="stop-color:#26A69A"/><stop offset="100%" style="stop-color:#00897B"/></linearGradient></defs><path d="M18 3L30 12L18 21L6 12L18 3Z" fill="url(#sexp)"/><path d="M6 21L18 30L30 21V24L18 33L6 24V21Z" fill="url(#sexp)" opacity="0.6"/><path d="M6 21V27L18 36V30L6 21Z" fill="url(#sexp)" opacity="0.8"/><path d="M30 21V27L18 36V30L30 21Z" fill="url(#sexp)" opacity="0.8"/></svg>`,
      srv: `<svg viewBox="0 0 36 36"><defs><linearGradient id="ssrv" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" style="stop-color:#FF7043"/><stop offset="100%" style="stop-color:#E64A19"/></linearGradient></defs><path d="M22 4H10C8.9 4 8 4.9 8 6V30C8 31.1 8.9 32 10 32H26C27.1 32 28 31.1 28 30V12L22 4Z" fill="url(#ssrv)"/><path d="M22 4V12H28" fill="#D84315"/><path d="M10 16H26M10 22H20" stroke="rgba(255,255,255,0.6)" stroke-width="1.5"/></svg>`,
      pv: `<svg viewBox="0 0 36 36"><defs><linearGradient id="spv" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" style="stop-color:#EC407A"/><stop offset="100%" style="stop-color:#C2185B"/></linearGradient></defs><rect x="3" y="5" width="30" height="22" rx="3" fill="url(#spv)"/><path d="M12 33H24M18 27V33" stroke="url(#spv)" stroke-width="2.5" stroke-linecap="round"/><rect x="6" y="9" width="8" height="6" rx="1" fill="rgba(255,255,255,0.3)"/><rect x="16" y="9" width="12" height="3" rx="1" fill="rgba(255,255,255,0.3)"/><rect x="16" y="14" width="9" height="3" rx="1" fill="rgba(255,255,255,0.2)"/></svg>`,
      about: `<svg viewBox="0 0 36 36"><defs><linearGradient id="sab" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" style="stop-color:#26A69A"/><stop offset="100%" style="stop-color:#00897B"/></linearGradient></defs><circle cx="18" cy="18" r="16" fill="url(#sab)"/><circle cx="18" cy="12" r="2.5" fill="white"/><rect x="16" y="17" width="4" height="10" rx="2" fill="white"/></svg>`,
    };
    return icons[type] || icons.fe;
  }

  /* ============================================================
     Render Functions
     ============================================================ */

  function renderPinned() {
    const grid = document.getElementById('smPinned');
    if (!grid) return;
    grid.innerHTML = PINNED_APPS.map((app, i) => `
      <div class="sm-app-pin" data-id="${app.id}" data-action="${app.section}" title="${app.name}">
        <div class="pin-icon">${app.icon}</div>
        <div class="pin-label">${app.name}</div>
      </div>
    `).join('');

    grid.querySelectorAll('.sm-app-pin').forEach(el => {
      el.addEventListener('click', () => {
        const id = el.dataset.id;
        closeStartMenu();
        setTimeout(() => launchApp(id), 160);
      });
    });
  }

  function renderAllApps() {
    const list = document.getElementById('smAllAppsList');
    if (!list) return;

    const grouped = {};
    ALL_APPS.forEach(app => {
      const letter = app.name[0].toUpperCase();
      if (!grouped[letter]) grouped[letter] = [];
      grouped[letter].push(app);
    });

    let html = '';
    Object.keys(grouped).sort().forEach(letter => {
      html += `<div class="sm-letter-header">${letter}</div>`;
      grouped[letter].forEach(app => {
        html += `
          <div class="sm-app-row" data-id="${app.id}">
            <div class="row-icon">${app.icon}</div>
            <span class="row-name">${app.name}</span>
          </div>
        `;
      });
    });
    list.innerHTML = html;

    list.querySelectorAll('.sm-app-row').forEach(el => {
      el.addEventListener('click', () => {
        closeStartMenu();
        setTimeout(() => launchApp(el.dataset.id), 200);
      });
    });
  }

  function renderRecommended() {
    const list = document.getElementById('smRecList');
    if (!list) return;
    list.innerHTML = RECOMMENDED.map(item => `
      <div class="sm-rec-item">
        <div class="sm-rec-icon">${item.icon}</div>
        <div class="sm-rec-info">
          <div class="sm-rec-name">${item.name}</div>
          <div class="sm-rec-meta">${item.meta}</div>
        </div>
      </div>
    `).join('');

    list.querySelectorAll('.sm-rec-item').forEach(el => {
      el.addEventListener('click', () => closeStartMenu());
    });
  }

  function performSearch(query) {
    const resultsEl = document.getElementById('smSearchResults');
    const pinnedEl = document.getElementById('smPinned');
    const pinnedHdr = document.querySelector('.sm-pinned-hdr');
    const recEl = document.querySelector('.sm-recommended');

    if (!query.trim()) {
      resultsEl.classList.remove('visible');
      pinnedEl.style.display = 'grid';
      if (pinnedHdr) pinnedHdr.style.display = 'flex';
      if (recEl) recEl.style.display = 'block';
      currentView = 'pinned';
      return;
    }

    pinnedEl.style.display = 'none';
    if (pinnedHdr) pinnedHdr.style.display = 'none';
    if (recEl) recEl.style.display = 'none';
    resultsEl.classList.add('visible');

    const q = query.toLowerCase();
    const results = SEARCH_DATASET.filter(item =>
      item.name.toLowerCase().includes(q) ||
      item.type.toLowerCase().includes(q)
    );

    if (results.length === 0) {
      resultsEl.innerHTML = `
        <div class="sm-no-results">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="rgba(255,255,255,0.2)"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
          <span>No results found for "${query}"</span>
        </div>
      `;
      currentView = 'search';
      return;
    }

    resultsEl.innerHTML = results.map(item => `
      <div class="sm-result-item" data-action="${item.action}" data-type="${item.type}">
        <div class="sm-result-icon">${ic('fe')}</div>
        <div class="sm-result-info">
          <div class="sm-result-name">${item.name}</div>
          <div class="sm-result-type">${item.type}</div>
        </div>
        ${item.badge ? `<span class="sm-result-badge">${item.badge}</span>` : ''}
      </div>
    `).join('');

    resultsEl.querySelectorAll('.sm-result-item').forEach(el => {
      el.addEventListener('click', () => {
        const action = el.dataset.action;
        closeStartMenu();
        setTimeout(() => {
          if (action === 'file-explorer') launchApp('file-explorer');
          else if (action === 'settings') launchApp('settings');
          else if (action === 'edge') launchApp('edge');
          else if (action === 'notepad') launchApp('notepad');
          else launchApp('settings');
        }, 200);
      });
    });

    currentView = 'search';
  }

  /* ============================================================
     Open / Close
     ============================================================ */

  function openStartMenu() {
    if (isOpen) { closeStartMenu(); return; }
    isOpen = true;
    startMenu.classList.remove('closing');
    startMenu.classList.add('visible');
    const search = document.getElementById('smSearch');
    if (search) search.value = '';
    renderPinned();
    renderAllApps();
    renderRecommended();
    if (currentView === 'search') performSearch('');
    if (currentView === 'allapps') showAllApps();
    requestAnimationFrame(() => {
      if (search) search.focus();
    });
    const overlay = document.getElementById('globalOverlay');
    if (overlay) overlay.classList.add('active');
  }

  function closeStartMenu() {
    if (!isOpen) return;
    isOpen = false;
    startMenu.classList.add('closing');
    setTimeout(() => {
      startMenu.classList.remove('visible', 'closing');
      currentView = 'pinned';
    }, 150);
    const overlay = document.getElementById('globalOverlay');
    if (overlay) overlay.classList.remove('active');
  }

  window.toggleStartMenu = openStartMenu;
  window.closeStartMenu = closeStartMenu;

  /* ============================================================
     View Switching
     ============================================================ */

  function showAllApps() {
    currentView = 'allapps';
    const pinnedGrid = document.getElementById('smPinned');
    const pinnedHdr = document.querySelector('.sm-pinned-hdr');
    const recEl = document.querySelector('.sm-recommended');
    const allAppsEl = document.getElementById('smAllApps');
    const resultsEl = document.getElementById('smSearchResults');
    const searchWrap = document.querySelector('.sm-search-wrap');

    if (pinnedGrid) pinnedGrid.style.display = 'none';
    if (pinnedHdr) pinnedHdr.style.display = 'none';
    if (recEl) recEl.style.display = 'none';
    if (searchWrap) searchWrap.style.display = 'none';
    if (resultsEl) resultsEl.classList.remove('visible');
    if (allAppsEl) allAppsEl.classList.add('visible');

    renderAllApps();
  }

  function hideAllApps() {
    currentView = 'pinned';
    const pinnedGrid = document.getElementById('smPinned');
    const pinnedHdr = document.querySelector('.sm-pinned-hdr');
    const recEl = document.querySelector('.sm-recommended');
    const allAppsEl = document.getElementById('smAllApps');
    const searchWrap = document.querySelector('.sm-search-wrap');

    if (pinnedGrid) pinnedGrid.style.display = 'grid';
    if (pinnedHdr) pinnedHdr.style.display = 'flex';
    if (recEl) recEl.style.display = 'block';
    if (allAppsEl) allAppsEl.classList.remove('visible');
    if (searchWrap) searchWrap.style.display = 'block';
  }

  /* ============================================================
     Power Menu
     ============================================================ */

  function togglePowerMenu() {
    const menu = document.getElementById('smPowerMenu');
    menu.classList.toggle('visible');
  }

  function shutdownPC() {
    const screen = document.getElementById('shutdownScreen');
    screen.classList.add('visible');
    setTimeout(() => {
      screen.innerHTML = `
        <div class="sd-logo">${ic('about')}</div>
        <div class="sd-text">Goodbye</div>
        <div class="sd-spinner"></div>
        <div class="sd-safe">It's safe to close this tab</div>
      `;
    }, 500);
    setTimeout(() => {
      screen.style.opacity = '0';
      screen.style.transition = 'opacity 1s ease';
    }, 4000);
  }

  /* ============================================================
     Full Search Overlay
     ============================================================ */

  function openSearchOverlay() {
    searchOverlay.classList.add('visible');
    closeStartMenu();
    requestAnimationFrame(() => {
      if (searchInputLarge) searchInputLarge.focus();
    });
  }

  function closeSearchOverlay() {
    searchOverlay.classList.remove('visible');
    if (searchInputLarge) searchInputLarge.value = '';
    renderSearchResults('');
  }

  function renderSearchResults(query) {
    const container = document.getElementById('searchResultsLarge');
    if (!container) return;

    if (!query.trim()) {
      container.innerHTML = `
        <div class="search-group-label">Top Hits</div>
        ${[
          { name: 'File Explorer', sub: 'App', icon: 'fe', action: 'file-explorer' },
          { name: 'Settings', sub: 'App', icon: 'sett', action: 'settings' },
          { name: 'Resume', sub: 'App', icon: 'note', action: 'notepad' },
          { name: 'GitHub', sub: 'App', icon: 'edge', action: 'edge' },
        ].map(item => `
          <div class="search-result-row" data-action="${item.action}">
            <div class="sri-icon">${ic(item.icon)}</div>
            <div class="sri-info">
              <div class="sri-title">${item.name}</div>
              <div class="sri-sub">${item.sub}</div>
            </div>
          </div>
        `).join('')}
        <div class="search-group-label">Web Searches</div>
        <div class="search-result-row" onclick="window.open('https://www.google.com/search?q=${encodeURIComponent(query || 'JavaScript')}', '_blank')">
          <div class="sri-icon"><svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="14" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1.5"/><path d="M16 10v6l4 2" stroke="rgba(255,255,255,0.4)" stroke-width="1.5" fill="none" stroke-linecap="round"/></svg></div>
          <div class="sri-info">
            <div class="sri-title">Search the web for "${query || 'JavaScript'}"</div>
            <div class="sri-sub">Microsoft Bing</div>
          </div>
        </div>
        <div class="search-group-label">Skills</div>
        ${['JavaScript', 'React', 'Node.js', 'Python', 'TypeScript', 'CSS'].map(s => `
          <div class="search-result-row" data-action="file-explorer">
            <div class="sri-icon">${ic('code')}</div>
            <div class="sri-info">
              <div class="sri-title">${s}</div>
              <div class="sri-sub">Skill — ${Math.floor(Math.random() * 10 + 2)} projects</div>
            </div>
            <span class="sri-badge">Projects</span>
          </div>
        `).join('')}
      `;
      container.querySelectorAll('.search-result-row[data-action]').forEach(el => {
        el.addEventListener('click', () => {
          closeSearchOverlay();
          setTimeout(() => launchApp(el.dataset.action), 200);
        });
      });
      return;
    }

    const q = query.toLowerCase();
    const filtered = SEARCH_DATASET.filter(i => i.name.toLowerCase().includes(q));
    container.innerHTML = filtered.map(item => `
      <div class="search-result-row" data-action="${item.action}">
        <div class="sri-icon">${ic('fe')}</div>
        <div class="sri-info">
          <div class="sri-title">${item.name}</div>
          <div class="sri-sub">${item.type}</div>
        </div>
        ${item.badge ? `<span class="sri-badge">${item.badge}</span>` : ''}
      </div>
    `).join('') || `<div style="padding:24px;text-align:center;color:rgba(255,255,255,0.3);font-size:13px">No results for "${query}"</div>`;

    container.querySelectorAll('.search-result-row[data-action]').forEach(el => {
      el.addEventListener('click', () => {
        closeSearchOverlay();
        setTimeout(() => launchApp(el.dataset.action), 200);
      });
    });
  }

  /* ============================================================
     Event Listeners
     ============================================================ */

  function init() {
    if (!startMenu) return;

    // Start button
    const startBtnEl = document.getElementById('start-btn');
    if (startBtnEl) {
      startBtnEl.addEventListener('click', openStartMenu);
    }

    // Search input in start menu
    const smSearch = document.getElementById('smSearch');
    const smSearchContainer = document.querySelector('.sm-search-container');
    if (smSearch && smSearchContainer) {
      let searchTimer = null;
      smSearch.addEventListener('input', e => {
        const val = e.target.value.trim();
        if (val.length > 0) {
          smSearchContainer.classList.add('searching');
          clearTimeout(searchTimer);
          searchTimer = setTimeout(() => smSearchContainer.classList.remove('searching'), 400);
        } else {
          smSearchContainer.classList.remove('searching');
        }
        performSearch(val);
      });
      smSearch.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeStartMenu();
      });
    }

    // All apps button
    const allAppsBtn = document.getElementById('smAllAppsBtn');
    if (allAppsBtn) {
      allAppsBtn.addEventListener('click', showAllApps);
    }

    // Back button
    const backBtn = document.getElementById('smBackBtn');
    if (backBtn) {
      backBtn.addEventListener('click', hideAllApps);
    }

    // Recommended more toggle
    const moreBtn = document.getElementById('smRecMore');
    const recEl = document.querySelector('.sm-recommended');
    if (moreBtn && recEl) {
      moreBtn.addEventListener('click', () => {
        recEl.classList.toggle('expanded');
        moreBtn.textContent = recEl.classList.contains('expanded') ? 'Less >' : 'More >';
      });
    }

    // Power menu
    const powerBtn = document.getElementById('smPowerBtn');
    const powerMenu = document.getElementById('smPowerMenu');
    if (powerBtn) powerBtn.addEventListener('click', togglePowerMenu);
    if (powerMenu) {
      powerMenu.querySelectorAll('.sm-power-item').forEach(item => {
        item.addEventListener('click', () => {
          if (item.dataset.action === 'shutdown') shutdownPC();
          powerMenu.classList.remove('visible');
        });
      });
    }

    // Click outside to close
    document.addEventListener('mousedown', e => {
      if (isOpen && !startMenu.contains(e.target) && !e.target.closest('#start-btn')) {
        closeStartMenu();
      }
      if (powerMenu && !powerMenu.contains(e.target) && !e.target.closest('#smPowerBtn')) {
        powerMenu.classList.remove('visible');
      }
    });

    // Escape to close
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        if (isOpen) closeStartMenu();
        if (searchOverlay.classList.contains('visible')) closeSearchOverlay();
      }
    });

    // Search overlay
    const trayClock = document.getElementById('tray-clock');
    if (trayClock) {
      trayClock.addEventListener('click', openSearchOverlay);
    }

    if (searchOverlay) {
      searchOverlay.addEventListener('mousedown', e => {
        if (e.target === searchOverlay) closeSearchOverlay();
      });
    }

    if (searchInputLarge) {
      searchInputLarge.addEventListener('input', e => renderSearchResults(e.target.value));
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();