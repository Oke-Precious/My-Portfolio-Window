/* ============================================================
   App Definitions and Launch Logic - Windows 11 Portfolio
   ============================================================ */

/* ============================================================
   SVG Icons
   ============================================================ */

const ICONS = {
  fileExplorer: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="fe-grad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#FFD54F"/>
        <stop offset="100%" style="stop-color:#F9A825"/>
      </linearGradient>
    </defs>
    <path d="M3 5a2 2 0 012-2h4l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" fill="url(#fe-grad)"/>
    <path d="M3 7C3 6.45 3.45 6 4 6H20C20.55 6 21 6.45 21 7v8c0 .55-.45 1-1 1H4c-.55 0-1-.45-1-1V7z" fill="#FFCA28"/>
  </svg>`,
  settings: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="3" fill="none" stroke="#78909C" stroke-width="2"/>
    <path d="M12 2C9.24 2 7 4.24 7 7v.5l-1.5 1.5-2.12-2.12-1.06 1.06L4.5 9.02l-2.12 2.12L3.56 12.3l1.5 1.5H7c0-3.31 2.69-6 5-6s5 2.69 5 5h2.5l1.5-1.5 1.06 1.06-2.12 2.12L22 15.5l-1.5 1.5 1.18 1.18 2.12 2.12-1.06 1.06L21.5 19.3l-1.5 1.5V22c2.76 0 5-2.24 5-5s-2.24-5-5-5c-.27 0-.53.02-.78.06l-.65-.65 1.5-1.5-1.06-1.06L17.7 8.18l-1.5-1.5V8c0-2.76-2.24-5-5-5z" fill="#78909C"/>
  </svg>`,
  notepad: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="note-grad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#43A3F5"/>
        <stop offset="100%" style="stop-color:#2B7CD3"/>
      </linearGradient>
    </defs>
    <path d="M4 4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6l-6-4H4z" fill="url(#note-grad)"/>
    <path d="M14 4v6h6" fill="#185ABD"/>
    <path d="M6 10h12M6 14h8" stroke="white" stroke-width="1.5" opacity="0.6"/>
  </svg>`,
  edge: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="edge-grad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#42A5F5"/>
        <stop offset="100%" style="stop-color:#1976D2"/>
      </linearGradient>
    </defs>
    <circle cx="12" cy="12" r="10" fill="url(#edge-grad)"/>
    <path d="M12 5C8.5 5 5 8.5 5 12C5 15 6.5 17 8 18.5L10.5 16C9.5 15.5 9 14 9.5 12.5C10.5 13.5 12 13.5 13 12.5C12 12 10.5 10 10.5 8C11 7 12 6.5 12 6.5V5Z" fill="white"/>
  </svg>`,
  about: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="info-grad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#26A69A"/>
        <stop offset="100%" style="stop-color:#00897B"/>
      </linearGradient>
    </defs>
    <circle cx="12" cy="12" r="10" fill="url(#info-grad)"/>
    <circle cx="12" cy="7" r="1.5" fill="white"/>
    <rect x="11" y="10" width="2" height="8" rx="1" fill="white"/>
  </svg>`
};

/* ============================================================
   App Definitions
   ============================================================ */

const APPS = {
  'file-explorer': {
    id: 'file-explorer',
    name: 'File Explorer',
    icon: ICONS.fileExplorer,
    htmlFile: 'apps/file-explorer.html',
    defaultWidth: 900,
    defaultHeight: 600,
    defaultX: 150,
    defaultY: 60,
  },
  settings: {
    id: 'settings',
    name: 'Settings',
    icon: ICONS.settings,
    htmlFile: 'apps/settings.html',
    defaultWidth: 900,
    defaultHeight: 650,
    defaultX: 200,
    defaultY: 50,
  },
  notepad: {
    id: 'notepad',
    name: 'Notepad',
    icon: ICONS.notepad,
    htmlFile: 'apps/notepad.html',
    defaultWidth: 700,
    defaultHeight: 500,
    defaultX: 250,
    defaultY: 100,
  },
  edge: {
    id: 'edge',
    name: 'Microsoft Edge',
    icon: ICONS.edge,
    htmlFile: 'apps/edge-browser.html',
    defaultWidth: 1000,
    defaultHeight: 700,
    defaultX: 100,
    defaultY: 40,
  },
  about: {
    id: 'about',
    name: 'About this Portfolio',
    icon: ICONS.about,
    defaultWidth: 500,
    defaultHeight: 400,
    defaultX: 300,
    defaultY: 150,
    onLoad: function(windowId) {
      const content = document.querySelector(`#${windowId} .window-content`);
      if (content) {
        content.innerHTML = `
          <div style="padding: 32px; display: flex; flex-direction: column; align-items: center; text-align: center; height: 100%; justify-content: center;">
            <div style="width: 80px; height: 80px; margin-bottom: 20px;">
              ${ICONS.about}
            </div>
            <h2 style="font-size: 24px; font-weight: 600; margin-bottom: 8px;">Windows 11 Portfolio</h2>
            <p style="color: rgba(255,255,255,0.6); margin-bottom: 16px;">Built with vanilla JavaScript</p>
            <div style="background: rgba(255,255,255,0.05); border-radius: 8px; padding: 20px; max-width: 350px; text-align: left;">
              <p style="font-size: 13px; line-height: 1.6; color: rgba(255,255,255,0.8); margin-bottom: 12px;">
                A fully functional Windows 11 desktop environment featuring:
              </p>
              <ul style="font-size: 13px; line-height: 1.8; color: rgba(255,255,255,0.7); padding-left: 20px;">
                <li>Lock screen and login authentication</li>
                <li>Draggable and resizable windows</li>
                <li>Start menu with app grid</li>
                <li>Desktop icons with context menus</li>
                <li>Working taskbar with system tray</li>
                <li>File Explorer and Settings apps</li>
              </ul>
            </div>
            <p style="font-size: 12px; color: rgba(255,255,255,0.4); margin-top: 24px;">
              Version 2.0 - Interactive Portfolio Project
            </p>
          </div>
        `;
      }
    }
  }
};

/* ============================================================
   Open App Function (global)
   ============================================================ */

function launchApp(appId) {
  const app = APPS[appId];
  if (!app) {
    console.warn('App not found:', appId);
    return;
  }
  createWindow(app);
}

if (typeof window.__win11 !== 'undefined') {
  window.__win11.openApp = launchApp;
}

/* ============================================================
   Desktop Icon Config (for desktop.js to use)
   ============================================================ */

const DESKTOP_LAUNCH_MAP = {
  'my-projects': 'file-explorer',
  'resume': 'notepad',
  'github': 'edge',
  'recycle-bin': null,
  'about': 'about',
  'contact': 'settings'
};

/* ============================================================
   Start Menu Apps Grid (updated)
   ============================================================ */

const START_MENU_APPS = [
  { id: 'file-explorer', name: 'File Explorer', icon: ICONS.fileExplorer },
  { id: 'edge', name: 'Edge', icon: ICONS.edge },
  { id: 'notepad', name: 'Notepad', icon: ICONS.notepad },
  { id: 'settings', name: 'Settings', icon: ICONS.settings },
  { id: 'about', name: 'About', icon: ICONS.about }
];

function initializeStartMenu() {
  const grid = document.getElementById('start-apps-grid');
  if (!grid) return;

  grid.innerHTML = '';
  START_MENU_APPS.forEach(app => {
    const item = document.createElement('div');
    item.className = 'start-app-item';
    item.innerHTML = `<span class="icon-graphic">${app.icon}</span><span>${app.name}</span>`;
    item.addEventListener('click', () => {
      closeStartMenu();
      setTimeout(() => launchApp(app.id), 160);
    });
    grid.appendChild(item);
  });
}

/* ============================================================
   Init
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initializeStartMenu();
});