/* ============================================================
   App Definitions and Launch Logic - Windows 11 Portfolio
   ============================================================ */

(function () {
  'use strict';

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
      <defs>
        <linearGradient id="sett-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:#90A4AE"/>
          <stop offset="100%" style="stop-color:#546E7A"/>
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="3" fill="none" stroke="url(#sett-grad)" stroke-width="2"/>
      <path d="M12 2C9.24 2 7 4.24 7 7h2c0-1.66 1.34-3 3-3s3 1.34 3 3h2c0-2.76-2.24-5-5-5zm0 20c2.76 0 5-2.24 5-5h-2c0 1.66-1.34 3-3 3s-3-1.34-3-3H7c0 2.76 2.24 5 5 5zM2 12c0-2.76 2.24-5 5-5V7c-1.66 0-3 1.34-3 3s1.34 3 3 3V9c-2.76 0-5 2.24-5 5zm20 0c0 2.76-2.24 5-5 5v2c1.66 0 3-1.34 3-3s-1.34-3-3-3v2c2.76 0 5-2.24 5-5z" fill="url(#sett-grad)"/>
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
      <path d="M6 10h12M6 14h8" stroke="white" stroke-width="1.5" opacity="0.5"/>
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
     App Configurations
     ============================================================ */

  const APPS = {
    'file-explorer': {
      id: 'file-explorer',
      title: 'File Explorer',
      icon: ICONS.fileExplorer,
      htmlFile: 'apps/file-explorer.html',
      width: 900,
      height: 600,
      x: undefined,
      y: undefined
    },
    'settings': {
      id: 'settings',
      title: 'Settings',
      icon: ICONS.settings,
      htmlFile: 'apps/settings.html',
      width: 900,
      height: 650,
      x: undefined,
      y: undefined
    },
    'notepad': {
      id: 'notepad',
      title: 'Notepad',
      icon: ICONS.notepad,
      htmlFile: 'apps/notepad.html',
      width: 700,
      height: 500,
      x: undefined,
      y: undefined
    },
    'edge': {
      id: 'edge',
      title: 'Microsoft Edge',
      icon: ICONS.edge,
      htmlFile: 'apps/edge-browser.html',
      width: 1000,
      height: 700,
      x: undefined,
      y: undefined
    },
    'about': {
      id: 'about',
      title: 'About this Portfolio',
      icon: ICONS.about,
      width: 480,
      height: 420,
      x: undefined,
      y: undefined,
      onInit: function (contentEl) {
        contentEl.innerHTML = `
          <div style="display:flex;flex-direction:column;align-items:center;text-align:center;height:100%;padding:40px 32px;box-sizing:border-box;justify-content:center;">
            <div style="width:72px;height:72px;margin-bottom:20px;">${ICONS.about}</div>
            <h2 style="font-size:22px;font-weight:600;margin-bottom:8px;">Windows 11 Portfolio</h2>
            <p style="font-size:13px;color:rgba(255,255,255,0.5);margin-bottom:24px;">Interactive Desktop Experience</p>
            <div style="background:rgba(255,255,255,0.04);border-radius:8px;padding:24px;max-width:360px;text-align:left;margin-bottom:16px;">
              <p style="font-size:13px;line-height:1.8;color:rgba(255,255,255,0.75);">
                A fully functional Windows 11 desktop environment built with vanilla JavaScript.
              </p>
              <ul style="font-size:12px;line-height:2;color:rgba(255,255,255,0.6);padding-left:18px;margin-top:8px;">
                <li>Lock screen & login authentication</li>
                <li>Draggable & resizable windows</li>
                <li>Snap layouts & maximize</li>
                <li>Start menu with app grid</li>
                <li>Desktop icons & context menus</li>
                <li>Taskbar with system tray</li>
                <li>File Explorer, Settings, Edge</li>
              </ul>
            </div>
            <p style="font-size:11px;color:rgba(255,255,255,0.35);">Version 2.0 &mdash; Built with vanilla JS</p>
          </div>
        `;
      }
    }
  };

  /* ============================================================
     Launch App
     ============================================================ */

  function launchApp(appId) {
    if (typeof window.__win11.openApp === 'function') {
      const app = APPS[appId];
      const config = app ? { ...app } : { id: appId, title: appId, icon: '' };
      window.__win11.openApp(appId, config);
    }
  }

  window.launchApp = launchApp;

  /* ============================================================
     Desktop Icon Map
     ============================================================ */

  window.__DESKTOP_LAUNCH_MAP = {
    'my-projects': 'file-explorer',
    'resume': 'notepad',
    'github': 'edge',
    'recycle-bin': null,
    'about': 'about',
    'contact': 'settings'
  };

  /* ============================================================
     Start Menu
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
        if (typeof closeStartMenu === 'function') closeStartMenu();
        setTimeout(() => launchApp(app.id), 160);
      });
      grid.appendChild(item);
    });
  }

  document.addEventListener('DOMContentLoaded', initializeStartMenu);

  /* ============================================================
     App Content Loader
     ============================================================ */

  window.__loadAppContent = function (appId, contentEl) {
    const app = APPS[appId];
    if (!app) return;

    if (app.onInit) {
      app.onInit(contentEl);
      return;
    }

    if (app.htmlFile) {
      fetch(app.htmlFile)
        .then(res => res.text())
        .then(html => { contentEl.innerHTML = html; })
        .catch(() => {
          contentEl.innerHTML = `<div style="padding:32px;color:rgba(255,255,255,0.5);">Could not load ${app.title}</div>`;
        });
    }
  };

})();