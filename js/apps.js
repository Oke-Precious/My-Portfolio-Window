/* ============================================================
   App Definitions and Launch Logic - Windows 11 Portfolio
   ============================================================ */

(function () {
  'use strict';

  /* ============================================================
     SVG Icons (16px for taskbar)
     ============================================================ */

  const ICONS = {
    fileExplorer: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <defs><linearGradient id="fe-g" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#FFD54F"/><stop offset="100%" style="stop-color:#F9A825"/>
      </linearGradient></defs>
      <path d="M3 5a2 2 0 012-2h4l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" fill="url(#fe-g)"/>
      <path d="M3 7C3 6.45 3.45 6 4 6H20C20.55 6 21 6.45 21 7v8c0 .55-.45 1-1 1H4c-.55 0-1-.45-1-1V7z" fill="#FFCA28"/>
    </svg>`,

    settings: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <defs><linearGradient id="st-g" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#90A4AE"/><stop offset="100%" style="stop-color:#546E7A"/>
      </linearGradient></defs>
      <circle cx="12" cy="12" r="3" fill="none" stroke="url(#st-g)" stroke-width="2"/>
      <path d="M12 2C9.24 2 7 4.24 7 7h2c0-1.66 1.34-3 3-3s3 1.34 3 3h2c0-2.76-2.24-5-5-5zm0 20c2.76 0 5-2.24 5-5h-2c0 1.66-1.34 3-3 3s-3-1.34-3-3H7c0 2.76 2.24 5 5 5zM2 12c0-2.76 2.24-5 5-5V7c-1.66 0-3 1.34-3 3s1.34 3 3 3V9c-2.76 0-5 2.24-5 5zm20 0c0 2.76-2.24 5-5 5v2c1.66 0 3-1.34 3-3s-1.34-3-3-3v2c2.76 0 5-2.24 5-5z" fill="url(#st-g)"/>
    </svg>`,

    notepad: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <defs><linearGradient id="np-g" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#43A3F5"/><stop offset="100%" style="stop-color:#2B7CD3"/>
      </linearGradient></defs>
      <path d="M4 4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6l-6-4H4z" fill="url(#np-g)"/>
      <path d="M14 4v6h6" fill="#185ABD"/>
      <path d="M6 10h12M6 14h8" stroke="white" stroke-width="1.5" opacity="0.5"/>
    </svg>`,

    edge: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <defs><linearGradient id="ed-g" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#42A5F5"/><stop offset="100%" style="stop-color:#1976D2"/>
      </linearGradient></defs>
      <circle cx="12" cy="12" r="10" fill="url(#ed-g)"/>
      <path d="M12 5C8.5 5 5 8.5 5 12C5 15 6.5 17 8 18.5L10.5 16C9.5 15.5 9 14 9.5 12.5C10.5 13.5 12 13.5 13 12.5C12 12 10.5 10 10.5 8C11 7 12 6.5 12 6.5V5Z" fill="white"/>
    </svg>`,

    recycleBin: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <defs><linearGradient id="rb-g" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#78909C"/><stop offset="100%" style="stop-color:#546E7A"/>
      </linearGradient></defs>
      <path d="M5 6h14v14H5V6z" fill="url(#rb-g)"/>
      <path d="M7 6V4h10v2" stroke="#546E7A" stroke-width="2" fill="none"/>
      <path d="M8 8h8M8 12h8" stroke="rgba(255,255,255,0.2)" stroke-width="1.5"/>
    </svg>`,

    about: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <defs><linearGradient id="ab-g" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#26A69A"/><stop offset="100%" style="stop-color:#00897B"/>
      </linearGradient></defs>
      <circle cx="12" cy="12" r="10" fill="url(#ab-g)"/>
      <circle cx="12" cy="7" r="1.5" fill="white"/>
      <rect x="11" y="10" width="2" height="8" rx="1" fill="white"/>
    </svg>`
  };

  /* ============================================================
     App Configurations
     ============================================================ */

  const APPS = {
    'file-explorer': {
      id: 'file-explorer',
      title: 'My Projects',
      icon: ICONS.fileExplorer,
      htmlFile: 'apps/file-explorer.html',
      width: 960,
      height: 620
    },
    'settings': {
      id: 'settings',
      title: 'Settings',
      icon: ICONS.settings,
      htmlFile: 'apps/settings.html',
      width: 900,
      height: 650
    },
    'notepad': {
      id: 'notepad',
      title: 'Resume',
      icon: ICONS.notepad,
      htmlFile: 'apps/notepad.html',
      width: 720,
      height: 580
    },
    'edge': {
      id: 'edge',
      title: 'GitHub',
      icon: ICONS.edge,
      htmlFile: 'apps/edge-browser.html',
      width: 1000,
      height: 700
    },
    'recycle-bin': {
      id: 'recycle-bin',
      title: 'Recycle Bin',
      icon: ICONS.recycleBin,
      htmlFile: 'apps/recycle-bin.html',
      width: 780,
      height: 560
    },
    'about': {
      id: 'about',
      title: 'About this Portfolio',
      icon: ICONS.about,
      width: 480,
      height: 420,
      content: `
        <div style="display:flex;flex-direction:column;align-items:center;text-align:center;height:100%;padding:40px 32px;box-sizing:border-box;justify-content:center;background:rgba(0,0,0,0.3)">
          <div style="width:72px;height:72px;margin-bottom:20px;">${ICONS.about}</div>
          <h2 style="font-size:22px;font-weight:600;margin-bottom:8px;">Oke Precious Portfolio</h2>
          <p style="font-size:13px;color:rgba(255,255,255,0.5);margin-bottom:24px;">Interactive Desktop Experience</p>
          <div style="background:rgba(255,255,255,0.04);border-radius:8px;padding:24px;max-width:360px;text-align:left;margin-bottom:16px;">
            <p style="font-size:13px;line-height:1.8;color:rgba(255,255,255,0.75);">
              A fully functional desktop environment built with vanilla JavaScript by Oke Precious.
            </p>
            <ul style="font-size:12px;line-height:2;color:rgba(255,255,255,0.6);padding-left:18px;margin-top:8px;">
              <li>Lock screen & login</li>
              <li>Draggable & resizable windows</li>
              <li>Snap layouts & maximize</li>
              <li>Start menu with app grid</li>
              <li>Desktop icons & context menus</li>
              <li>Taskbar with system tray</li>
              <li>5 fully functional apps</li>
            </ul>
          </div>
          <p style="font-size:11px;color:rgba(255,255,255,0.35);">Version 2.0 &mdash; Built with vanilla JS</p>
        </div>
      `
    }
  };

  /* ============================================================
     Launch App
     ============================================================ */

  function launchApp(appId, extraConfig) {
    if (typeof window.__win11.openApp !== 'function') return;
    const app = APPS[appId];
    const config = app ? Object.assign({}, app) : { id: appId, title: appId, icon: '', width: 600, height: 400 };
    if (extraConfig) Object.assign(config, extraConfig);
    window.__win11.openApp(appId, config);
  }

  window.launchApp = launchApp;

  /* ============================================================
     Desktop Icon Launch Map
     ============================================================ */

  window.__DESKTOP_LAUNCH_MAP = {
    'my-projects': 'file-explorer',
    'resume': 'notepad',
    'github': 'edge',
    'recycle-bin': 'recycle-bin',
    'about': 'settings',
    'contact': 'settings'
  };

  /* ============================================================
     Start Menu Apps
     ============================================================ */

  const START_MENU_APPS = [
    { id: 'file-explorer', name: 'File Explorer', icon: ICONS.fileExplorer },
    { id: 'edge', name: 'Edge', icon: ICONS.edge },
    { id: 'notepad', name: 'Notepad', icon: ICONS.notepad },
    { id: 'settings', name: 'Settings', icon: ICONS.settings },
    { id: 'recycle-bin', name: 'Recycle Bin', icon: ICONS.recycleBin },
    { id: 'about', name: 'About', icon: ICONS.about }
  ];

  /* ============================================================
     Start Menu Init
     ============================================================ */

  function initializeStartMenu() {
    const grid = document.getElementById('start-apps-grid');
    if (!grid) return;
    grid.innerHTML = '';
    START_MENU_APPS.forEach(app => {
      const item = document.createElement('div');
      item.className = 'start-app-item';
      item.innerHTML = `<span class="icon-graphic">${app.icon}</span><span>${app.name}</span>`;
      item.addEventListener('click', () => {
        if (typeof toggleStartMenu === 'function') toggleStartMenu();
        setTimeout(() => launchApp(app.id), 160);
      });
      grid.appendChild(item);
    });
  }

  /* ============================================================
     App Content Loader
     ============================================================ */

  window.__loadAppContent = function (appId, contentEl) {
    const app = APPS[appId];
    if (!app) return;

    if (app.content) {
      contentEl.innerHTML = app.content;
      return;
    }

    if (app.htmlFile) {
      fetch(app.htmlFile)
        .then(res => {
          if (!res.ok) throw new Error('Failed to load');
          return res.text();
        })
        .then(html => { contentEl.innerHTML = html; })
        .catch(() => {
          contentEl.innerHTML = `<div style="padding:32px;color:rgba(255,255,255,0.4);font-size:13px;">
            Could not load ${app.title || appId}<br><br>
            <span style="font-size:12px;opacity:0.5">Make sure all app HTML files exist in the apps/ folder.</span>
          </div>`;
        });
    }
  };

  /* ============================================================
     Init
     ============================================================ */

  document.addEventListener('DOMContentLoaded', initializeStartMenu);

})();