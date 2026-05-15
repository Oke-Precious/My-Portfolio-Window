/* ============================================================
   Desktop JavaScript - Windows 11 Portfolio
   ============================================================ */

(function () {
  'use strict';

  const desktop = document.getElementById('desktop');
  const iconsGrid = document.querySelector('.desktop-icons-grid');

  let selectedIcon = null;

  const desktopIcons = [
    {
      id: 'my-projects',
      label: 'My Projects',
      tooltip: 'My Projects',
      svg: `<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
        <defs><linearGradient id="folderGrad" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" style="stop-color:#FFCA28"/><stop offset="100%" style="stop-color:#F9A825"/></linearGradient></defs>
        <path d="M6 12C6 9.79 7.79 8 10 8H18L22 12H38C40.21 12 42 13.79 42 16V36C42 38.21 40.21 40 38 40H10C7.79 40 6 38.21 6 36V12Z" fill="url(#folderGrad)"/>
        <path d="M6 16C6 14.9 6.9 14 8 14H40C41.1 14 42 14.9 42 16V36C42 37.1 41.1 38 40 38H8C6.9 38 6 37.1 6 36V16Z" fill="#FFD54F"/>
        <rect x="10" y="22" width="20" height="3" rx="1.5" fill="rgba(0,0,0,0.15)"/>
        <rect x="10" y="28" width="14" height="3" rx="1.5" fill="rgba(0,0,0,0.1)"/>
      </svg>`
    },
    {
      id: 'resume',
      label: 'Resume.docx',
      tooltip: 'Resume.docx',
      svg: `<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
        <defs><linearGradient id="wordGrad" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" style="stop-color:#41A5EE"/><stop offset="100%" style="stop-color:#2B7CD3"/></linearGradient></defs>
        <path d="M12 6C9.79 6 8 7.79 8 10V38C8 40.21 9.79 42 12 42H36C38.21 42 40 40.21 40 38V14L32 6H12Z" fill="url(#wordGrad)"/>
        <path d="M28 6V14H40L32 6H28Z" fill="#185ABD"/>
        <text x="24" y="32" font-family="Segoe UI, sans-serif" font-size="16" font-weight="700" fill="white" text-anchor="middle">W</text>
      </svg>`
    },
    {
      id: 'github',
      label: 'GitHub',
      tooltip: 'GitHub',
      svg: `<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
        <defs><linearGradient id="edgeGrad" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" style="stop-color:#42A5F5"/><stop offset="100%" style="stop-color:#1976D2"/></linearGradient></defs>
        <circle cx="24" cy="24" r="20" fill="url(#edgeGrad)"/>
        <path d="M24 10C15.16 10 8 17.16 8 26C8 32.49 12.06 38.07 17.57 40.23C18.29 40.38 18.56 39.87 18.56 39.43C18.56 39.03 18.55 37.98 18.53 36.62C14.14 37.8 12.92 34.27 12.92 34.27C12.01 31.86 10.66 31.28 10.66 31.28C8.7 30.04 10.76 30.07 10.76 30.07C12.88 30.24 13.9 31.99 13.9 31.99C15.46 34.69 18.03 33.77 18.77 33.29C18.93 32.22 19.34 31.49 19.78 31.08C15.73 30.67 11.42 28.94 11.42 21.86C11.42 19.9 12.24 18.28 13.45 17.03C13.23 16.54 12.52 14.54 13.76 11.67C13.76 11.67 15.31 11.1 18.52 13.27C20.06 12.84 21.71 12.62 23.37 12.62C25.03 12.62 26.68 12.84 28.22 13.27C31.43 11.1 32.98 11.67 32.98 11.67C34.22 14.54 33.51 16.54 33.29 17.03C34.51 18.28 35.32 19.9 35.32 21.86C35.32 28.97 31 30.67 26.93 31.07C27.47 31.58 28 32.57 28 34.05C28 36.21 28 37.87 28 39.43C28 39.87 28.25 40.4 28.99 40.22C34.48 38.07 38.53 32.49 38.53 26C38.53 17.16 31.37 10 22.53 10H24Z" fill="white"/>
      </svg>`
    },
    {
      id: 'recycle-bin',
      label: 'Recycle Bin',
      tooltip: 'Projects I Abandoned',
      svg: `<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
        <defs><linearGradient id="binGrad" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" style="stop-color:#78909C"/><stop offset="100%" style="stop-color:#546E7A"/></linearGradient></defs>
        <path d="M10 16H38V42H10V16Z" fill="url(#binGrad)" rx="2"/>
        <path d="M14 16V10H34V16" stroke="#546E7A" stroke-width="3" fill="none"/>
        <rect x="20" y="10" width="8" height="4" fill="#607D8B"/>
        <path d="M17 20H31" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>
        <path d="M17 26H31" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>
        <path d="M17 32H31" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>
        <path d="M22 20V38M26 20V38" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
      </svg>`
    },
    {
      id: 'about',
      label: 'About Me',
      tooltip: 'About Me',
      svg: `<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
        <defs><linearGradient id="infoGrad" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" style="stop-color:#26A69A"/><stop offset="100%" style="stop-color:#00897B"/></linearGradient></defs>
        <circle cx="24" cy="24" r="20" fill="url(#infoGrad)"/>
        <circle cx="24" cy="14" r="3" fill="white"/>
        <rect x="22" y="20" width="4" height="16" rx="2" fill="white"/>
      </svg>`
    },
    {
      id: 'contact',
      label: 'Contact',
      tooltip: 'Contact',
      svg: `<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
        <defs><linearGradient id="mailGrad" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" style="stop-color:#5C9CE6"/><stop offset="100%" style="stop-color:#4078C0"/></linearGradient></defs>
        <rect x="4" y="10" width="40" height="28" rx="3" fill="url(#mailGrad)"/>
        <path d="M4 14L24 26L44 14" stroke="#2E5C9E" stroke-width="2" fill="none"/>
        <path d="M6 36L24 24L42 36" stroke="rgba(0,0,0,0.15)" stroke-width="2" fill="none"/>
      </svg>`
    },
    {
      id: 'expertise',
      label: 'Expertise',
      tooltip: 'Expertise',
      svg: `<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
        <defs><linearGradient id="expGrad" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" style="stop-color:#26A69A"/><stop offset="100%" style="stop-color:#00897B"/></linearGradient></defs>
        <circle cx="24" cy="24" r="20" fill="url(#expGrad)"/>
        <path d="M24 8l5.5 11.2L41 20.4l-8.5 8.3 2 12L24 35.5 13.5 40.7l2-12-8.5-8.3 11.5-1.2L24 8z" fill="white" opacity="0.9"/>
      </svg>`
    },
    {
      id: 'portfolio-viewer',
      label: 'Portfolio',
      tooltip: 'Portfolio',
      svg: `<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
        <defs><linearGradient id="portfolioGrad" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" style="stop-color:#EC407A"/><stop offset="100%" style="stop-color:#C2185B"/></linearGradient></defs>
        <rect x="4" y="6" width="40" height="28" rx="4" fill="url(#portfolioGrad)"/>
        <path d="M16 42h16M24 34v8" stroke="url(#portfolioGrad)" stroke-width="3" stroke-linecap="round"/>
        <rect x="8" y="12" width="12" height="8" rx="2" fill="rgba(255,255,255,0.3)"/>
        <rect x="24" y="12" width="16" height="4" rx="2" fill="rgba(255,255,255,0.3)"/>
        <rect x="24" y="20" width="12" height="4" rx="2" fill="rgba(255,255,255,0.2)"/>
      </svg>`
    }
  ];

  function createIcon(data) {
    const el = document.createElement('div');
    el.className = 'desktop-icon';
    el.dataset.id = data.id;
    el.innerHTML = `
      <div class="icon-img">${data.svg}</div>
      <div class="icon-label">${data.label}</div>
    `;
    if (data.tooltip) el.title = data.tooltip;

    el.addEventListener('click', e => {
      e.stopPropagation();
      selectIcon(el);
    });

    el.addEventListener('dblclick', e => {
      e.stopPropagation();
      openDesktopItem(data.id);
    });

    el.addEventListener('contextmenu', e => {
      e.preventDefault();
      e.stopPropagation();
      selectIcon(el);
      showDesktopContextMenu(e.clientX, e.clientY);
    });

    return el;
  }

  function selectIcon(iconEl) {
    if (selectedIcon) selectedIcon.classList.remove('selected');
    selectedIcon = iconEl;
    selectedIcon.classList.add('selected');
  }

  function clearSelection() {
    if (selectedIcon) {
      selectedIcon.classList.remove('selected');
      selectedIcon = null;
    }
  }

  function openDesktopItem(id) {
    const appId = (window.__DESKTOP_LAUNCH_MAP && window.__DESKTOP_LAUNCH_MAP[id]) || id;
    if (typeof launchApp === 'function') {
      launchApp(appId);
    }
  }

  /* ============================================================
     Wallpaper Personalization
     ============================================================ */

  const WALLPAPERS = [
    {
      id: 'bloom',
      name: 'Bloom',
      css: `radial-gradient(ellipse at 20% 30%, #c471ed 0%, #f64f59 30%, #12c2e9 60%, #0f0c29 100%)`
    },
    {
      id: 'sunrise',
      name: 'Sunrise',
      css: `linear-gradient(135deg, #f093fb 0%, #f5576c 25%, #fda085 50%, #ffd89b 75%, #f6d365 100%)`
    },
    {
      id: 'ocean',
      name: 'Ocean',
      css: `linear-gradient(135deg, #667eea 0%, #764ba2 30%, #1a1a4e 60%, #0a1628 100%)`
    },
    {
      id: 'forest',
      name: 'Forest',
      css: `linear-gradient(135deg, #134e5e 0%, #2d6a4f 30%, #1b4332 60%, #081c15 100%)`
    },
    {
      id: 'minimal',
      name: 'Minimal Dark',
      css: `linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #16162a 100%)`
    },
    {
      id: 'synthwave',
      name: 'Synthwave',
      css: `linear-gradient(180deg, #0f0c29 0%, #302b63 25%, #24243e 50%, #e94560 75%, #ff6f91 100%)`
    }
  ];

  function getSavedWallpaper() {
    return localStorage.getItem('win11-wallpaper') || 'bloom';
  }

  function applyWallpaper(id) {
    const wp = WALLPAPERS.find(w => w.id === id) || WALLPAPERS[0];
    const desktop = document.getElementById('desktop');
    if (desktop) {
      desktop.style.background = wp.css;
      desktop.style.transition = 'background 400ms ease';
    }
    localStorage.setItem('win11-wallpaper', wp.id);
    document.querySelectorAll('.wp-swatch').forEach(s => {
      s.classList.toggle('active', s.dataset.id === id);
    });
  }

  function openWallpaperWindow() {
    closeContextMenu();
    if (window.__win11 && window.__win11.openApp) {
      window.__win11.createWindow({
        id: 'wallpaper-picker',
        title: 'Personalization',
        icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>`,
        width: 420,
        height: 440
      });

      const win = document.querySelector('[data-app="wallpaper-picker"]');
      if (win) {
        const content = win.querySelector('.win-content');
        if (content) {
          content.innerHTML = `
            <div class="wallpaper-window">
              <div class="wp-title">Choose your background</div>
              <div class="wp-subtitle">Select a wallpaper to set the desktop theme</div>
              <div class="wp-grid">
                ${WALLPAPERS.map(wp => `
                  <div class="wp-swatch ${wp.id === getSavedWallpaper() ? 'active' : ''}"
                       data-id="${wp.id}" data-name="${wp.name}"
                       style="background: ${wp.css}"></div>
                `).join('')}
              </div>
              <div class="wp-custom">
                <input type="color" id="wpCustomColor" value="#c471ed" />
                <span class="wp-custom-label">Custom color</span>
              </div>
            </div>
          `;
          content.querySelectorAll('.wp-swatch').forEach(s => {
            s.addEventListener('click', () => applyWallpaper(s.dataset.id));
          });
          const customInput = document.getElementById('wpCustomColor');
          if (customInput) {
            customInput.addEventListener('input', (e) => {
              const desktop = document.getElementById('desktop');
              if (desktop) {
                desktop.style.background = e.target.value;
                desktop.style.transition = 'background 400ms ease';
              }
              document.querySelectorAll('.wp-swatch').forEach(s => s.classList.remove('active'));
            });
            customInput.addEventListener('change', () => {
              localStorage.setItem('win11-wallpaper', 'custom');
            });
          }
        }
      }
    }
  }

  function initWallpaper() {
    const saved = getSavedWallpaper();
    if (saved && saved !== 'custom') {
      const wp = WALLPAPERS.find(w => w.id === saved);
      const desktop = document.getElementById('desktop');
      if (desktop && wp) {
        desktop.style.background = wp.css;
      }
    }
  }

  /* ============================================================
     Konami Code Easter Egg
     ============================================================ */

  const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  let konamiIndex = 0;

  function handleKonamiKey(e) {
    if (e.key !== KONAMI[konamiIndex]) {
      konamiIndex = 0;
      return;
    }
    konamiIndex++;
    if (konamiIndex === KONAMI.length) {
      konamiIndex = 0;
      triggerKonami();
    }
  }

  function triggerKonami() {
    if (typeof playKonamiSound !== 'undefined') {
      // We need to call the one from windowManager. Since it's in the same file, it's accessible.
      // Actually, this is desktop.js - let's just do it inline via the global.
    }

    const flash = document.getElementById('konamiFlash');
    if (flash) {
      flash.classList.add('visible');
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const notes = [262, 330, 392, 523, 659, 784, 1047];
        notes.forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.type = 'square';
          const start = ctx.currentTime + i * 0.08;
          osc.frequency.value = freq;
          gain.gain.setValueAtTime(0.04, start);
          gain.gain.exponentialRampToValueAtTime(0.001, start + 0.15);
          osc.start(start);
          osc.stop(start + 0.15);
        });
      } catch (e) { /* no audio */ }
      setTimeout(() => flash.classList.remove('visible'), 2500);
    }
  }

  function renderDesktopIcons() {
    if (!iconsGrid) return;
    iconsGrid.innerHTML = '';
    desktopIcons.forEach(data => iconsGrid.appendChild(createIcon(data)));
  }

  /* ============================================================
     Context Menu
     ============================================================ */

  function showDesktopContextMenu(x, y) {
    closeContextMenu();

    const menu = document.createElement('div');
    menu.className = 'context-menu visible';
    menu.id = 'desktop-ctx';
    menu.style.cssText = `left:${x}px;top:${y}px`;

    const items = [
      { label: 'View', icon: 'grid', hasSub: true },
      { label: 'Sort by', icon: 'sort', hasSub: true },
      { label: 'Refresh', icon: 'refresh', action: 'refresh' },
      { divider: true },
      { label: 'New', icon: 'plus', hasSub: true },
      { divider: true },
      { label: 'Personalize', icon: 'palette', action: 'personalize' },
      { divider: true },
      { label: 'About this Portfolio', icon: 'info', action: 'about' }
    ];

    items.forEach(item => {
      if (item.divider) {
        menu.appendChild(Object.assign(document.createElement('div'), { className: 'context-menu-divider' }));
      } else {
        const el = document.createElement('div');
        el.className = 'context-menu-item';
        el.innerHTML = `
          <span class="ctx-icon">${_getCtxIcon(item.icon)}</span>
          <span>${item.label}</span>
          ${item.hasSub ? '<span class="ctx-arrow">\u203a</span>' : ''}
        `;
        if (item.action === 'refresh') {
          el.addEventListener('click', () => { location.reload(); });
} else if (item.action === 'personalize') {
          openWallpaperWindow();
        } else if (item.action === 'about') {
          el.addEventListener('click', () => { launchApp('about'); });
        } else if (item.hasSub) {
          el.addEventListener('mouseenter', () => showCtxSubmenu(item, el, x, y));
          el.addEventListener('mouseleave', () => delayHideSubmenu());
        }
        menu.appendChild(el);
      }
    });

    document.body.appendChild(menu);
    _adjustMenuPos(menu, x, y);
    window.__win11._dctx = menu;
  }

  function _getCtxIcon(type) {
    const icons = {
      grid: '<svg viewBox="0 0 16 16"><rect x="1" y="1" width="6" height="6" rx="1" fill="currentColor"/><rect x="9" y="1" width="6" height="6" rx="1" fill="currentColor"/><rect x="1" y="9" width="6" height="6" rx="1" fill="currentColor"/><rect x="9" y="9" width="6" height="6" rx="1" fill="currentColor"/></svg>',
      sort: '<svg viewBox="0 0 16 16"><path d="M2 4h12v1.5H2V4zm0 3.25h8v1.5h-8V7.25zm0 3.25h5v1.5h-5V10.5z" fill="currentColor"/></svg>',
      refresh: '<svg viewBox="0 0 16 16"><path d="M13.65 2.35A8 8 0 1 0 16 8h-2a6 6 0 1 1-1.76-4.24L10 6h6V0l-2.35 2.35z" fill="currentColor"/></svg>',
      plus: '<svg viewBox="0 0 16 16"><path d="M8 2v12M2 8h12" stroke="currentColor" stroke-width="2" fill="none"/></svg>',
      palette: '<svg viewBox="0 0 16 16"><path d="M8 1C4.13 1 1 4.13 1 8c0 2.7 1.54 5.06 3.82 6.23.26.08.44.31.44.59v1.18c0 .33.27.6.6.6.2 0 .39-.1.5-.27A8 8 0 0 0 15 8c0-3.87-3.13-7-7-7zm-2.5 5.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm3 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm2 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm-4.5 2.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" fill="currentColor"/></svg>',
      info: '<svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 5v5M8 12v.5" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>'
    };
    return `<span class="ctx-icon">${icons[type] || ''}</span>`;
  }

  function showCtxSubmenu(item, parentEl, baseX, baseY) {
    closeSubmenu();
    const sub = document.createElement('div');
    sub.className = 'context-menu visible';
    sub.id = 'ctx-sub';

    const subItems = {
      View: ['Large icons', 'Medium icons', 'Small icons'],
      'Sort by': ['Name', 'Size', 'Date modified', 'Item type'],
      New: ['Folder', 'Document', 'Shortcut']
    };

    (subItems[item.label] || []).forEach(label => {
      const el = document.createElement('div');
      el.className = 'context-menu-item';
      el.innerHTML = `<span>${label}</span>`;
      el.addEventListener('click', () => closeContextMenu());
      sub.appendChild(el);
    });

    document.body.appendChild(sub);
    const pRect = parentEl.getBoundingClientRect();
    sub.style.left = (pRect.right + 2) + 'px';
    sub.style.top = pRect.top + 'px';
    _adjustMenuPos(sub, pRect.right + 2, pRect.top);
    window.__win11._ctxsub = sub;
  }

  let _subTimer = null;
  function delayHideSubmenu() {
    _subTimer = setTimeout(closeSubmenu, 300);
  }

  function closeSubmenu() {
    if (_subTimer) { clearTimeout(_subTimer); _subTimer = null; }
    const s = document.getElementById('ctx-sub');
    if (s) s.remove();
    window.__win11._ctxsub = null;
  }

  function closeContextMenu() {
    closeSubmenu();
    const m = document.getElementById('desktop-ctx');
    if (m) { m.classList.remove('visible'); setTimeout(() => m.remove(), 80); }
    window.__win11._dctx = null;
  }

  function _adjustMenuPos(menu, x, y) {
    requestAnimationFrame(() => {
      const r = menu.getBoundingClientRect();
      if (r.right > window.innerWidth) menu.style.left = Math.max(0, x - r.width) + 'px';
      if (r.bottom > window.innerHeight - 48) menu.style.top = Math.max(0, y - r.height) + 'px';
    });
  }

  /* ============================================================
     Desktop click / key handlers
     ============================================================ */

  desktop.addEventListener('click', e => {
    if (e.target === desktop || e.target === iconsGrid || e.target.closest('.desktop-icons-grid')) {
      if (!e.target.closest('.desktop-icon')) clearSelection();
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') clearSelection();
    handleKonamiKey(e);
  });

  /* ============================================================
     Init
     ============================================================ */

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => { renderDesktopIcons(); initWallpaper(); });
  } else {
    renderDesktopIcons();
    initWallpaper();
  }

})();