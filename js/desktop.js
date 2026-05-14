/* ============================================================
   Desktop JavaScript - Windows 11 Portfolio
   ============================================================ */

(function () {
  const desktop = document.getElementById('desktop');
  const iconsGrid = document.querySelector('.desktop-icons-grid');

  let selectedIcon = null;
  let lastClickTime = 0;
  let lastClickIcon = null;

  const desktopIcons = [
    {
      id: 'my-projects',
      label: 'My Projects',
      tooltip: 'My Projects',
      svg: `<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="folderGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:#FFCA28"/>
            <stop offset="100%" style="stop-color:#F9A825"/>
          </linearGradient>
        </defs>
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
        <defs>
          <linearGradient id="wordGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:#41A5EE"/>
            <stop offset="100%" style="stop-color:#2B7CD3"/>
          </linearGradient>
        </defs>
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
        <defs>
          <linearGradient id="edgeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:#42A5F5"/>
            <stop offset="100%" style="stop-color:#1976D2"/>
          </linearGradient>
        </defs>
        <circle cx="24" cy="24" r="20" fill="url(#edgeGrad)"/>
        <path d="M24 10C15.16 10 8 17.16 8 26C8 32.49 12.06 38.07 17.57 40.23C18.29 40.38 18.56 39.87 18.56 39.43C18.56 39.03 18.55 37.98 18.53 36.62C14.14 37.8 12.92 34.27 12.92 34.27C12.01 31.86 10.66 31.28 10.66 31.28C8.7 30.04 10.76 30.07 10.76 30.07C12.88 30.24 13.9 31.99 13.9 31.99C15.46 34.69 18.03 33.77 18.77 33.29C18.93 32.22 19.34 31.49 19.78 31.08C15.73 30.67 11.42 28.94 11.42 21.86C11.42 19.9 12.24 18.28 13.45 17.03C13.23 16.54 12.52 14.54 13.76 11.67C13.76 11.67 15.31 11.1 18.52 13.27C20.06 12.84 21.71 12.62 23.37 12.62C25.03 12.62 26.68 12.84 28.22 13.27C31.43 11.1 32.98 11.67 32.98 11.67C34.22 14.54 33.51 16.54 33.29 17.03C34.51 18.28 35.32 19.9 35.32 21.86C35.32 28.97 31 30.67 26.93 31.07C27.47 31.58 28 32.57 28 34.05C28 36.21 28 37.87 28 39.43C28 39.87 28.25 40.4 28.99 40.22C34.48 38.07 38.53 32.49 38.53 26C38.53 17.16 31.37 10 22.53 10H24Z" fill="white"/>
      </svg>`
    },
    {
      id: 'recycle-bin',
      label: 'Recycle Bin',
      tooltip: 'Projects I Abandoned',
      svg: `<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="binGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:#78909C"/>
            <stop offset="100%" style="stop-color:#546E7A"/>
          </linearGradient>
        </defs>
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
        <defs>
          <linearGradient id="gearGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:#78909C"/>
            <stop offset="100%" style="stop-color:#455A64"/>
          </linearGradient>
        </defs>
        <path d="M24 4C22.9 4 22 4.9 22 6V7.6C21.08 7.79 20.2 8.13 19.38 8.58L18.12 7.32C17.43 6.63 16.3 6.63 15.61 7.32L11.97 10.97C11.28 11.66 11.28 12.79 11.97 13.48L13.23 14.74C12.78 15.56 12.44 16.44 12.25 17.36H10C8.9 17.36 8 18.26 8 19.36V22H12.25C12.44 22.92 12.78 23.8 13.23 24.62L11.97 25.88C11.28 26.57 11.28 27.7 11.97 28.39L15.62 32.04C15.77 32.19 15.95 32.32 16.14 32.39L15.47 33.84C15.32 34.23 15.38 34.68 15.63 35.01C15.88 35.34 16.28 35.5 16.68 35.43L19.75 35.03C20.15 35.28 20.61 35.39 21.06 35.31C21.51 35.23 21.91 34.95 22.16 34.55L22.83 33.1C23.02 33.17 23.2 33.3 23.35 33.45L27 37.1C27.15 37.25 27.32 37.38 27.5 37.46L26.83 38.91C26.68 39.3 26.74 39.75 26.99 40.08C27.24 40.41 27.64 40.57 28.04 40.5L31.11 40.1C31.51 40.35 31.97 40.46 32.42 40.38C32.87 40.3 33.27 40.02 33.52 39.62L34.19 38.17C34.38 38.24 34.56 38.37 34.71 38.52L38.36 34.87C38.51 34.72 38.64 34.55 38.72 34.37L40.17 35.04C40.56 35.19 41.01 35.13 41.34 34.88C41.67 34.63 41.83 34.23 41.76 33.83L41.36 30.76C41.61 30.36 41.72 29.9 41.64 29.45C41.56 29 41.28 28.6 40.88 28.35L39.43 27.68C39.5 27.49 39.63 27.31 39.78 27.16L43.43 23.51C43.58 23.36 43.71 23.19 43.79 23.01L45.24 23.68C45.63 23.83 46.08 23.77 46.41 23.52C46.74 23.27 46.9 22.87 46.83 22.47L46.43 19.4C46.68 19 46.79 18.54 46.71 18.09C46.63 17.64 46.35 17.24 45.95 16.99L44.5 16.32C44.57 16.13 44.7 15.95 44.85 15.8L48.5 12.15C48.65 12 48.78 11.83 48.86 11.65L50.31 12.32C50.7 12.47 51.15 12.41 51.48 12.16C51.81 11.91 51.97 11.51 51.9 11.11L51.5 8.04C51.75 7.64 51.86 7.18 51.78 6.73C51.7 6.28 51.42 5.88 51.02 5.63L49.57 4.96C49.64 4.77 49.77 4.59 49.92 4.44L45.07 4.04C44.92 3.89 44.75 3.76 44.57 3.68L45.24 2.23C45.39 1.84 45.33 1.39 45.08 1.06C44.83 0.73 44.43 0.57 44.03 0.64L41.01 1.04C40.61 0.79 40.15 0.68 39.7 0.76C39.25 0.84 38.85 1.12 38.6 1.52L37.93 2.97C37.74 2.9 37.56 2.77 37.41 2.62L33.76 6.27C33.61 6.42 33.48 6.59 33.4 6.77L31.95 6.1C31.56 5.95 31.11 6.01 30.78 6.26C30.45 6.51 30.29 6.91 30.36 7.31L30.76 10.38C30.51 10.78 30.4 11.24 30.48 11.69C30.56 12.14 30.84 12.54 31.24 12.79L32.69 13.46C32.62 13.65 32.49 13.83 32.34 13.98L28.69 17.63C28.54 17.78 28.41 17.95 28.33 18.13L26.88 17.46C26.49 17.31 26.04 17.37 25.71 17.62C25.38 17.87 25.22 18.27 25.29 18.67L25.69 21.74C25.44 22.14 25.33 22.6 25.41 23.05C25.49 23.5 25.77 23.9 26.17 24.15L27.62 24.82C27.55 25.01 27.42 25.19 27.27 25.34L22.43 25.74C22.28 25.89 22.11 26.02 21.93 26.1L22.6 27.55C22.75 27.94 22.69 28.39 22.44 28.72C22.19 29.05 21.79 29.21 21.39 29.14L18.37 28.74C17.97 28.99 17.51 29.1 17.06 29.02C16.61 28.94 16.21 28.66 15.96 28.26L15.29 26.81C15.1 26.88 14.92 27.01 14.77 27.16L11.12 30.81C10.97 30.96 10.84 31.13 10.76 31.31L9.31 30.64C8.92 30.49 8.47 30.55 8.14 30.8C7.81 31.05 7.65 31.45 7.72 31.85L8.12 34.92C7.87 35.32 7.76 35.78 7.84 36.23C7.92 36.68 8.2 37.08 8.6 37.33L10.05 38C9.98 38.19 9.85 38.37 9.7 38.52L6.05 42.17C5.9 42.32 5.77 42.49 5.69 42.67L4.24 42C3.85 41.85 3.4 41.91 3.07 42.16C2.74 42.41 2.58 42.81 2.65 43.21L3.05 46.28C2.8 46.68 2.69 47.14 2.77 47.59C2.85 48.04 3.13 48.44 3.53 48.69L5 49.4C4.93 49.59 4.8 49.77 4.65 49.92L8.3 53.57C8.45 53.72 8.58 53.89 8.66 54.07L7.21 54.74C6.82 54.89 6.37 54.83 6.04 54.58C5.71 54.33 5.55 53.93 5.62 53.53L6.02 50.46C5.77 50.06 5.66 49.6 5.74 49.15C5.82 48.7 6.1 48.3 6.5 48.05L7.95 47.38C7.88 47.19 7.75 47.01 7.6 46.86L3.95 43.21C3.8 43.06 3.67 42.89 3.59 42.71L2.14 43.38C1.75 43.53 1.3 43.47 0.97 43.22C0.64 42.97 0.48 42.57 0.55 42.17L0.95 39.1C0.7 38.7 0.59 38.24 0.67 37.79C0.75 37.34 1.03 36.94 1.43 36.69L2.88 36.02C2.81 35.83 2.68 35.65 2.53 35.5L1.18 33.38C0.89 32.92 0.78 32.36 0.88 31.82C0.98 31.28 1.28 30.79 1.73 30.46L3.66 29.13C3.81 29.28 3.98 29.41 4.16 29.49L3.49 30.94C3.1 31.09 2.65 31.03 2.32 30.78C1.99 30.53 1.83 30.13 1.9 29.73L2.3 26.66C2.05 26.26 1.94 25.8 2.02 25.35C2.1 24.9 2.38 24.5 2.78 24.25L4.23 23.58C4.16 23.39 4.03 23.21 3.88 23.06L3.21 21.61C2.82 21.46 2.37 21.52 2.04 21.77C1.71 22.02 1.55 22.42 1.62 22.82L2.02 25.89C2.19 26.65 2.69 27.29 3.41 27.57C4.13 27.85 4.93 27.62 5.44 27.01C6.01 26.33 6.29 25.44 6.21 24.53C6.13 23.62 5.69 22.77 4.98 22.23L4.31 20.78C4.48 20.6 4.61 20.43 4.76 20.28L5.43 21.73C5.82 21.88 6.27 21.82 6.6 21.57C6.93 21.32 7.09 20.92 7.02 20.52L6.62 17.45C6.87 17.05 6.98 16.59 6.9 16.14C6.82 15.69 6.54 15.29 6.14 15.04L4.69 14.37C4.76 14.18 4.89 14 5.04 13.85L5.71 15.3C6.1 15.45 6.55 15.39 6.88 15.14C7.21 14.89 7.37 14.49 7.3 14.09L6.9 11.02C7.15 10.62 7.26 10.16 7.18 9.71C7.1 9.26 6.82 8.86 6.42 8.61L4.97 7.94C5.04 7.75 5.17 7.57 5.32 7.42L9 3.74V6H24V4C24 4 24 4 24 4Z" fill="none"/>
        <path d="M24 12C18.48 12 14 16.48 14 22C14 27.52 18.48 32 24 32C29.52 32 34 27.52 34 22C34 16.48 29.52 12 24 12ZM24 14C28.42 14 32 17.58 32 22C32 26.42 28.42 30 24 30C19.58 30 16 26.42 16 22C16 17.58 19.58 14 24 14ZM24 16C22.9 16 22 16.9 22 18C22 19.1 22.9 20 24 20C25.1 20 26 19.1 26 18C26 16.9 25.1 16 24 16ZM24 28C21.79 28 20 26.21 20 24C20 22.93 20.53 22.01 21.34 21.42C21.72 22.35 22.5 23.09 23.5 23.43V24H24.5V23.43C25.5 23.09 26.28 22.35 26.66 21.42C27.47 22.01 28 22.93 28 24C28 26.21 26.21 28 24 28Z" fill="url(#gearGrad)"/>
      </svg>`
    },
    {
      id: 'contact',
      label: 'Contact',
      tooltip: 'Contact',
      svg: `<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="mailGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:#5C9CE6"/>
            <stop offset="100%" style="stop-color:#4078C0"/>
          </linearGradient>
        </defs>
        <rect x="4" y="10" width="40" height="28" rx="3" fill="url(#mailGrad)"/>
        <path d="M4 14L24 26L44 14" stroke="#2E5C9E" stroke-width="2" fill="none"/>
        <path d="M4 14L24 26L44 14" stroke="rgba(255,255,255,0.3)" stroke-width="1" fill="none"/>
        <path d="M6 36L24 24L42 36" stroke="#2E5C9E" stroke-width="2" fill="rgba(0,0,0,0.1)"/>
        <path d="M6 36L24 24L42 36" stroke="rgba(255,255,255,0.15)" stroke-width="1" fill="none"/>
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

    el.addEventListener('click', (e) => {
      e.stopPropagation();
      selectIcon(el);
    });

    el.addEventListener('dblclick', (e) => {
      e.stopPropagation();
      openDesktopItem(data.id);
    });

    el.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      e.stopPropagation();
      selectIcon(el);
    });

    return el;
  }

  function selectIcon(iconEl) {
    if (selectedIcon) {
      selectedIcon.classList.remove('selected');
    }
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
    if (typeof window.__win11 !== 'undefined' && window.__win11.openApp) {
      window.__win11.openApp(id);
    }
  }

  desktop.addEventListener('click', (e) => {
    if (e.target === desktop || e.target === iconsGrid) {
      clearSelection();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      clearSelection();
      closeDesktopContextMenu();
    }
  });

  function renderDesktopIcons() {
    if (!iconsGrid) return;
    iconsGrid.innerHTML = '';
    desktopIcons.forEach(data => {
      iconsGrid.appendChild(createIcon(data));
    });
  }

  window.__win11 = window.__win11 || {};
  window.__win11.openDesktopItem = openDesktopItem;
  window.__win11.refreshDesktop = renderDesktopIcons;

  function showDesktopContextMenu(x, y) {
    closeDesktopContextMenu();

    const menu = document.createElement('div');
    menu.className = 'context-menu';
    menu.id = 'desktop-context-menu';
    menu.style.left = x + 'px';
    menu.style.top = y + 'px';

    const menuItems = [
      { label: 'View', icon: 'grid', hasArrow: true, submenu: ['Large icons', 'Medium icons', 'Small icons'] },
      { label: 'Sort by', icon: 'sort', hasArrow: true, submenu: ['Name', 'Size', 'Date modified'] },
      { label: 'Refresh', icon: 'refresh', action: 'refresh' },
      { divider: true },
      { label: 'New', icon: 'plus', hasArrow: true, submenu: ['Folder', 'Document', 'Shortcut'] },
      { divider: true },
      { label: 'Personalize', icon: 'palette', action: 'personalize' },
      { divider: true },
      { label: 'About this Portfolio', icon: 'info', action: 'about' }
    ];

    menuItems.forEach(item => {
      if (item.divider) {
        const div = document.createElement('div');
        div.className = 'context-menu-divider';
        menu.appendChild(div);
      } else {
        const el = document.createElement('div');
        el.className = 'context-menu-item';

        let iconSvg = '';
        if (item.icon === 'grid') {
          iconSvg = '<svg viewBox="0 0 16 16"><rect x="1" y="1" width="6" height="6" rx="1" fill="currentColor"/><rect x="9" y="1" width="6" height="6" rx="1" fill="currentColor"/><rect x="1" y="9" width="6" height="6" rx="1" fill="currentColor"/><rect x="9" y="9" width="6" height="6" rx="1" fill="currentColor"/></svg>';
        } else if (item.icon === 'sort') {
          iconSvg = '<svg viewBox="0 0 16 16"><path d="M2 4h12v1.5H2V4zm0 3.25h8v1.5h-8V7.25zm0 3.25h5v1.5h-5V10.5z" fill="currentColor"/></svg>';
        } else if (item.icon === 'refresh') {
          iconSvg = '<svg viewBox="0 0 16 16"><path d="M13.65 2.35A8 8 0 1 0 16 8h-2a6 6 0 1 1-1.76-4.24L10 6h6V0l-2.35 2.35z" fill="currentColor"/></svg>';
        } else if (item.icon === 'plus') {
          iconSvg = '<svg viewBox="0 0 16 16"><path d="M8 2v12M2 8h12" stroke="currentColor" stroke-width="2" fill="none"/></svg>';
        } else if (item.icon === 'palette') {
          iconSvg = '<svg viewBox="0 0 16 16"><path d="M8 1C4.13 1 1 4.13 1 8c0 2.7 1.54 5.06 3.82 6.23.26.08.44.31.44.59v1.18c0 .33.27.6.6.6.2 0 .39-.1.5-.27A8 8 0 0 0 15 8c0-3.87-3.13-7-7-7zm-2.5 5.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm3 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm2 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm-4.5 2.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" fill="currentColor"/></svg>';
        } else if (item.icon === 'info') {
          iconSvg = '<svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 5v5M8 12v.5" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>';
        }

        el.innerHTML = `<span class="ctx-icon">${iconSvg}</span><span>${item.label}</span>${item.hasArrow ? '<span class="ctx-arrow">\u203A</span>' : ''}`;

        el.addEventListener('click', () => {
          if (item.action === 'refresh') {
            window.location.reload();
          } else if (item.action === 'personalize') {
            if (window.__win11.openApp) window.__win11.openApp('settings');
          } else if (item.action === 'about') {
            showAboutDialog();
          } else if (item.hasArrow && item.submenu) {
            showSubmenu(el, item.submenu, x + 220, y);
          }
        });

        menu.appendChild(el);
      }
    });

    document.body.appendChild(menu);
    menu.classList.add('visible');

    requestAnimationFrame(() => {
      const rect = menu.getBoundingClientRect();
      if (rect.right > window.innerWidth) {
        menu.style.left = (x - rect.width) + 'px';
      }
      if (rect.bottom > window.innerHeight - 48) {
        menu.style.top = (y - rect.height) + 'px';
      }
      if (rect.left < 0) {
        menu.style.left = '0px';
      }
    });

    window.__win11._desktopContextMenu = menu;
  }

  function showSubmenu(parentEl, items, x, y) {
    closeSubmenu();

    const sub = document.createElement('div');
    sub.className = 'context-menu context-submenu';
    sub.id = 'desktop-submenu';

    items.forEach(item => {
      const el = document.createElement('div');
      el.className = 'context-menu-item';
      el.innerHTML = `<span>${item}</span>`;
      el.addEventListener('click', () => {
        closeDesktopContextMenu();
      });
      sub.appendChild(el);
    });

    document.body.appendChild(sub);
    sub.classList.add('visible');

    const subRect = sub.getBoundingClientRect();
    if (subRect.right > window.innerWidth) {
      sub.style.left = (x - subRect.width) + 'px';
    }
    if (subRect.bottom > window.innerHeight - 48) {
      sub.style.top = (y - subRect.height) + 'px';
    }

    window.__win11._desktopSubmenu = sub;
  }

  function closeSubmenu() {
    if (window.__win11._desktopSubmenu) {
      window.__win11._desktopSubmenu.remove();
      window.__win11._desktopSubmenu = null;
    }
  }

  function closeDesktopContextMenu() {
    closeSubmenu();
    if (window.__win11._desktopContextMenu) {
      window.__win11._desktopContextMenu.remove();
      window.__win11._desktopContextMenu = null;
    }
  }

  function showAboutDialog() {
    if (window.__win11.openApp) {
      window.__win11.openApp('about');
    }
  }

  desktop.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    if (e.target.closest('.context-menu')) return;
    showDesktopContextMenu(e.clientX, e.clientY);
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.context-menu')) {
      closeDesktopContextMenu();
    }
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderDesktopIcons);
  } else {
    renderDesktopIcons();
  }
})();