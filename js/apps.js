/* ============================================================
   App Definitions and Launch Logic
   ============================================================ */

/* ============================================================
   SVG Icons
   ============================================================ */

const ICONS = {
  fileExplorer: `<svg viewBox="0 0 24 24" fill="#FFB900"><path d="M3 5a2 2 0 012-2h4l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"/></svg>`,
  settings: `<svg viewBox="0 0 24 24" fill="#4A4A4A"><path d="M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58a.49.49 0 00.12-.61l-1.92-3.32a.49.49 0 00-.59-.22l-2.39.96a7.03 7.03 0 00-1.62-.94l-.36-2.54A.484.484 0 0014.76 4l-2.66-1.69a.485.485 0 00-.59 0L9.24 4l-.3 2.54a.49.49 0 00-.13.51l1.92 3.32c-.6.34-1.16.73-1.62.94l-2.39-.96a.485.485 0 00-.59.22L2.92 9.01a.49.49 0 00.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58a.49.49 0 00-.12.61l1.92 3.32a.49.49 0 00.59.22l2.39-.96c.46.21.91.52 1.62.94l.36 2.54c.07.04.15.06.24.06.09 0 .17-.02.24-.06l2.66-1.69a.485.485 0 00.59 0l2.66 1.69c.07.04.15.06.24.06.09 0 .17-.02.24-.06l.36-2.54c.46-.21.91-.52 1.62-.94l2.39.96a.485.485 0 00.59-.22l1.92-3.32a.49.49 0 00-.12-.61l-2.03-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>`,
  notepad: `<svg viewBox="0 0 24 24" fill="#43A3F5"><path d="M5 3a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2H5zM7 7h10v2H7V7zm0 4h7v2H7v-2zm0 4h10v2H7v-2z"/></svg>`,
  edge: `<svg viewBox="0 0 24 24" fill="#0078D4"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.38 0 2.5 1.12 2.5 2.5 0 1.08-.69 2-1.64 2.34l-.01.01C12.34 10.5 12 11.22 12 12s.34 1.5.85 2.15l.01.01C13.31 14.5 14 15.42 14 16.5 14 17.88 12.88 19 12 19c-.88 0-2-1.12-2-2.5 0-.76.41-1.44 1.01-1.92l.02-.01C10.52 13.22 10 12.72 10 12c0-1.22.52-2.22 1.03-2.85l.01-.01C10.59 8.44 10 7.78 10 7c0-1.38 1.12-2 2-2h0z"/></svg>`,
  folder: `<svg viewBox="0 0 24 24" fill="#FFB900"><path d="M3 5a2 2 0 012-2h4l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"/></svg>`,
  image: `<svg viewBox="0 0 24 24" fill="#1DB954"><path d="M5 3a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h14v14H5V5zm4 3a2 2 0 110 4 2 2 0 010-4zm0 6a2 2 0 110 4 2 2 0 010-4zm-4-6a2 2 0 110 4 2 2 0 010-4zm8 8.5V16h-1.5l-2-2H9l2 2H8.5v-1.5L11.5 14l-1.5-1.5-1.5 1.5-1-1 2-2V8h1.5l2 2L16 7l1.5 1.5 1.5-1.5 1 1-2 2v1.5h-1.5l-2-2 3 3 1.5 1.5 1.5-1.5 1 1-2 2H20v1.5l-2 2-1.5-1.5z"/></svg>`,
  document: `<svg viewBox="0 0 24 24" fill="#43A3F5"><path d="M7 3a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V7l-4-4H7zm0 2h6v4l4-4 6 6v10a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2z"/><path d="M9 7h6v2H9V7z"/></svg>`,
  video: `<svg viewBox="0 0 24 24" fill="#E53935"><path d="M5 3a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2H5zm4 7l5 3-5 3V10z"/></svg>`,
  music: `<svg viewBox="0 0 24 24" fill="#AB47BC"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>`,
  code: `<svg viewBox="0 0 24 24" fill="#00B0FF"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>`,
  terminal: `<svg viewBox="0 0 24 24" fill="#00C853"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8h16v10zm-8-2h4v-2h-4v2zm-5.5-4L7 12l3 3 3-3-1.5-1.5L12 14l-1.5-1.5z"/></svg>`,
  user: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>`,
  search: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>`,
  power: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42A6.92 6.92 0 0119 12c0-3.87-3.13-7-7-7a6.98 6.98 0 00-5.58 2.47l-1.42-1.42A8.96 8.96 0 0112 4c4.97 0 9 4.03 9 9s-4.03 9-9 9a8.96 8.96 0 01-6.83-3.33z"/></svg>`,
  star: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`,
  wifi: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3a4.24 4.24 0 00-6-6l3 3 3-3a4.24 4.24 0 00-6-6l3 3 3-3z"/></svg>`,
  battery: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z"/></svg>`,
  clock: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>`,
  home: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>`,
  desktop: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21 2H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7v2H8v2h8v-2h-2v-2h7c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H3V4h18v12z"/></svg>`,
  download: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>`,
  personalization: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>`,
  display: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21 2H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7v2H8v2h8v-2h-2v-2h7c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H3V4h18v12z"/></svg>`,
  apps: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z"/></svg>`,
  info: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>`,
  heart: `<svg viewBox="0 0 24 24" fill="#E91E63"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`,
};

/* ============================================================
   App Definitions
   ============================================================ */

const APPS = {
  fileExplorer: {
    id: 'fileExplorer',
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
};

/* ============================================================
   Desktop App Definitions
   ============================================================ */

const DESKTOP_APPS = [
  { id: 'fileExplorer', name: 'File Explorer', icon: ICONS.fileExplorer },
  { id: 'notepad', name: 'Notepad', icon: ICONS.notepad },
  { id: 'edge', name: 'Microsoft Edge', icon: ICONS.edge },
  { id: 'settings', name: 'Settings', icon: ICONS.settings },
];

/* ============================================================
   Start Menu Apps Grid
   ============================================================ */

const START_MENU_APPS = [
  { id: 'fileExplorer', name: 'File Explorer', icon: ICONS.fileExplorer },
  { id: 'edge', name: 'Edge', icon: ICONS.edge },
  { id: 'notepad', name: 'Notepad', icon: ICONS.notepad },
  { id: 'settings', name: 'Settings', icon: ICONS.settings },
  { id: 'terminal', name: 'Terminal', icon: ICONS.terminal },
  { id: 'code', name: 'VS Code', icon: ICONS.code },
  { id: 'music', name: 'Music', icon: ICONS.music },
  { id: 'video', name: 'Videos', icon: ICONS.video },
  { id: 'image', name: 'Photos', icon: ICONS.image },
  { id: 'download', name: 'Downloads', icon: ICONS.download },
  { id: 'user', name: 'Profile', icon: ICONS.user },
  { id: 'star', name: 'Favorites', icon: ICONS.star },
];

/* ============================================================
   Launch App Function
   ============================================================ */

function launchApp(appId) {
  const app = APPS[appId];
  if (!app) {
    console.warn('App not found:', appId);
    return;
  }
  createWindow(app);
}

/* ============================================================
   Initialize Desktop and Taskbar
   ============================================================ */

function initializeDesktop() {
  const iconContainer = document.getElementById('desktop-icons');
  if (!iconContainer) return;

  DESKTOP_APPS.forEach(app => {
    const icon = document.createElement('div');
    icon.className = 'desktop-icon';
    icon.dataset.app = app.id;
    icon.innerHTML = `
      <span class="icon-graphic">${app.icon}</span>
      <span class="icon-label">${app.name}</span>
    `;
    icon.addEventListener('dblclick', () => launchApp(app.id));
    icon.addEventListener('contextmenu', e => {
      e.preventDefault();
      showDesktopIconContextMenu(e.clientX, e.clientY, app.id);
    });
    iconContainer.appendChild(icon);
  });
}

function initializeTaskbar() {
  const taskbarInner = document.getElementById('taskbar-inner');
  if (!taskbarInner) return;

  DESKTOP_APPS.forEach(app => {
    const btn = document.createElement('button');
    btn.className = 'taskbar-app';
    btn.dataset.app = app.id;
    btn.title = app.name;
    btn.innerHTML = app.icon;
    btn.addEventListener('click', () => launchApp(app.id));
    taskbarInner.appendChild(btn);
  });
}

function initializeStartMenu() {
  const grid = document.getElementById('start-apps-grid');
  if (!grid) return;

  START_MENU_APPS.forEach(app => {
    const item = document.createElement('div');
    item.className = 'start-app-item';
    item.innerHTML = `
      <span class="icon-graphic">${app.icon}</span>
      <span>${app.name}</span>
    `;
    item.addEventListener('click', () => {
      closeStartMenu();
      launchApp(app.id);
    });
    grid.appendChild(item);
  });
}

/* ============================================================
   Start Menu Toggle
   ============================================================ */

function toggleStartMenu() {
  const menu = document.getElementById('start-menu');
  if (!menu) return;

  if (window.__win11.startMenuOpen) {
    closeStartMenu();
  } else {
    menu.classList.add('visible');
    menu.classList.remove('closing');
    window.__win11.startMenuOpen = true;
  }
}

function closeStartMenu() {
  const menu = document.getElementById('start-menu');
  if (!menu) return;

  menu.classList.add('closing');
  setTimeout(() => {
    menu.classList.remove('visible');
    menu.classList.remove('closing');
    window.__win11.startMenuOpen = false;
  }, 150);
}

/* ============================================================
   Context Menus
   ============================================================ */

function showDesktopIconContextMenu(x, y, appId) {
  const items = [
    { label: 'Open', click: () => launchApp(appId) },
    { divider: true },
    { label: 'Pin to taskbar', click: () => {} },
    { label: 'Copy', click: () => {} },
    { label: 'Paste', click: () => {} },
    { divider: true },
    { label: 'Delete', click: () => {} },
    { label: 'Rename', click: () => {} },
    { label: 'Properties', click: () => {} },
  ];
  showContextMenu(x, y, items);
}

function showDesktopContextMenu(x, y) {
  const items = [
    { label: 'View', click: () => {} },
    { label: 'Sort by', click: () => {} },
    { label: 'Refresh', click: () => {} },
    { divider: true },
    { label: 'Display settings', click: () => launchApp('settings') },
    { label: 'Personalize', click: () => launchApp('settings') },
    { divider: true },
    { label: 'Open in Terminal', click: () => {} },
    { label: 'Open in File Explorer', click: () => launchApp('fileExplorer') },
  ];
  showContextMenu(x, y, items);
}

/* ============================================================
   Clock Widget
   ============================================================ */

function updateTaskbarClock() {
  const timeEl = document.getElementById('taskbar-time');
  const dayEl = document.getElementById('taskbar-date-day');
  if (!timeEl || !dayEl) return;

  const now = new Date();
  timeEl.textContent = now.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
  dayEl.textContent = now.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });
}

/* ============================================================
   Init
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initializeDesktop();
  initializeTaskbar();
  initializeStartMenu();
  updateTaskbarClock();
  setInterval(updateTaskbarClock, 1000);

  document.getElementById('start-button').addEventListener('click', toggleStartMenu);

  document.getElementById('desktop').addEventListener('contextmenu', e => {
    e.preventDefault();
    showDesktopContextMenu(e.clientX, e.clientY);
  });
});