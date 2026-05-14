/* ============================================================
   Taskbar JavaScript - Windows 11 Portfolio
   ============================================================ */

(function () {
  'use strict';

  const taskbar = document.getElementById('taskbar');
  let clockInterval = null;

  const TASKBAR_APPS = [
    {
      id: 'file-explorer',
      label: 'File Explorer',
      svg: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <defs><linearGradient id="tfe-g" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" style="stop-color:#FFD54F"/><stop offset="100%" style="stop-color:#F9A825"/></linearGradient></defs>
        <path d="M3 5a2 2 0 012-2h4l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" fill="url(#tfe-g)"/>
        <path d="M3 7C3 6.45 3.45 6 4 6H20C20.55 6 21 6.45 21 7v8c0 .55-.45 1-1 1H4c-.55 0-1-.45-1-1V7z" fill="#FFCA28"/>
      </svg>`
    },
    {
      id: 'edge',
      label: 'Microsoft Edge',
      svg: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <defs><linearGradient id="tmo-g" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" style="stop-color:#42A5F5"/><stop offset="100%" style="stop-color:#1976D2"/></linearGradient></defs>
        <circle cx="12" cy="12" r="10" fill="url(#tmo-g)"/>
        <path d="M12 5C8.5 5 5 8.5 5 12C5 15 6.5 17 8 18.5L10.5 16C9.5 15.5 9 14 9.5 12.5C10.5 13.5 12 13.5 13 12.5C12 12 10.5 10 10.5 8C11 7 12 6.5 12 6.5V5Z" fill="white"/>
      </svg>`
    }
  ];

  function initTaskbar() {
    if (!taskbar) return;
    taskbar.innerHTML = '';

    taskbar.innerHTML = `
      <div id="taskbar-left">
        <div class="taskbar-btn" id="start-btn" title="Start">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="2" width="9" height="9" rx="1" fill="#F25022"/>
            <rect x="13" y="2" width="9" height="9" rx="1" fill="#7FBA00"/>
            <rect x="2" y="13" width="9" height="9" rx="1" fill="#00A4EF"/>
            <rect x="13" y="13" width="9" height="9" rx="1" fill="#FFB900"/>
          </svg>
        </div>
      </div>
      <div id="taskbar-center"></div>
      <div id="taskbar-right">
        <div id="system-tray">
          <div class="tray-icon" title="Network">
            <svg viewBox="0 0 16 16" fill="currentColor"><path d="M8 2C5.5 2 3.2 2.8 1.3 4.2.7 4.7.3 5.6.3 6.5C.3 7.4.7 8.3 1.3 8.8 3.2 10.2 5.5 11 8 11s4.8-.8 6.7-2.2c.6-.5 1-.4 1.3-.9.3-.5.7-1.4.7-2.3 0-.9-.4-1.8-.7-2.3-.3-.5-.7-.4-1.3-.9C12.8 2.8 10.5 2 8 2zM8 9.5C6.9 9.5 6 8.6 6 7.5v-.5C6 5.6 6.6 4.5 7.5 3.8 7.8 4.5 8 5.4 8 6.3V7.5C8 8.6 7.1 9.5 6 9.5c-.8 0-1.5-.5-1.7-1.2 1.4-.9 3-1.3 4.7-1.3 1.7 0 3.3.4 4.7 1.3-.2.7-.9 1.2-1.7 1.2zM8 7a.75.75 0 0 1 .75.75V7.5H8A.75.75 0 0 1 7.25 7V7A.75.75 0 0 1 8 7z" opacity="0.9"/></svg>
          </div>
          <div class="tray-icon" title="Volume">
            <svg viewBox="0 0 16 16" fill="currentColor"><path d="M3 5v6h3l4 4V1L6 5H3zm8.5 1.5c.9-.9.9-2.4 0-3.3-.9-.9-2.4-.9-3.3 0-.4.4-.6.9-.6 1.4s.2 1 .6 1.4c.9.9 2.4.9 3.3 0zm.5 2c.7-.7.7-1.9 0-2.6-.7-.7-1.9-.7-2.6 0-.3.3-.4.6-.4 1s.1.7.4 1c.7.7 1.9.7 2.6 0z" opacity="0.9"/></svg>
          </div>
          <div class="tray-icon" title="Battery">
            <svg viewBox="0 0 16 16" fill="currentColor"><path d="M4 2h6v10H4V2z" opacity="0.9"/><path d="M11 4h1v8h-1V4z"/><rect x="5" y="4" width="4" height="1" fill="rgba(255,255,255,0.5)"/><rect x="5" y="6" width="4" height="1" fill="rgba(255,255,255,0.5)"/><rect x="5" y="8" width="4" height="1" fill="rgba(255,255,255,0.5)"/></svg>
          </div>
          <div class="tray-div"></div>
          <div id="tray-clock">
            <div id="tray-time"></div>
            <div id="tray-date"></div>
          </div>
        </div>
      </div>
    `;

    TASKBAR_APPS.forEach(app => {
      const btn = document.createElement('div');
      btn.className = 'taskbar-btn';
      btn.dataset.app = app.id;
      btn.title = app.label;
      btn.innerHTML = app.svg;
      btn.addEventListener('click', () => {
        if (typeof window.__win11.openApp === 'function') {
          window.__win11.openApp(app.id);
        }
      });
      btn.addEventListener('mouseenter', e => showTip(e, app.label));
      btn.addEventListener('mouseleave', hideTip);
      document.getElementById('taskbar-center').appendChild(btn);
    });

    const taskViewBtn = document.createElement('div');
    taskViewBtn.className = 'taskbar-btn';
    taskViewBtn.dataset.action = 'taskview';
    taskViewBtn.title = 'Task View';
    taskViewBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 4h6v6H4zm10 0h6v6h-6zM4 14h6v6H4zm10 0h6v6h-6z"/></svg>`;
    taskViewBtn.addEventListener('click', () => {
      if (window.__win11.openTaskView) window.__win11.openTaskView();
    });
    taskViewBtn.addEventListener('mouseenter', e => showTip(e, 'Task View'));
    taskViewBtn.addEventListener('mouseleave', hideTip);
    document.getElementById('taskbar-center').appendChild(taskViewBtn);

    const startBtn = document.getElementById('start-btn');
    if (startBtn) {
      startBtn.addEventListener('click', toggleStartMenu);
      startBtn.addEventListener('mouseenter', e => showTip(e, 'Start'));
      startBtn.addEventListener('mouseleave', hideTip);
    }

    const trayClock = document.getElementById('tray-clock');
    if (trayClock) {
      trayClock.style.cursor = 'pointer';
      trayClock.addEventListener('click', () => {
        if (typeof window.__win11.toggleWidgetPanel === 'function') {
          window.__win11.toggleWidgetPanel();
        } else if (typeof window.__win11.openActionCenter === 'function') {
          window.__win11.openActionCenter();
        }
      });
    }

    updateClock();
    if (clockInterval) clearInterval(clockInterval);
    clockInterval = setInterval(updateClock, 30000);
  }

  function toggleStartMenu() {
    // Delegated to startmenu.js
  }

  window.toggleStartMenu = toggleStartMenu;
  window.closeStartMenu = toggleStartMenu;

  function openActionCenter() {
    if (typeof window.__win11.openActionCenter === 'function') {
      window.__win11.openActionCenter();
    }
  }

  function updateClock() {
    const t = document.getElementById('tray-time');
    const d = document.getElementById('tray-date');
    if (!t || !d) return;
    const now = new Date();
    const h = now.getHours();
    const m = now.getMinutes().toString().padStart(2, '0');
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    t.textContent = h12 + ':' + m + ' ' + ampm;
    d.textContent = (now.getMonth() + 1) + '/' + now.getDate();
  }

  function showTip(e, text) {
    hideTip();
    const tip = document.createElement('div');
    tip.id = 'win11-tb-tip';
    tip.className = 'taskbar-tooltip';
    tip.textContent = text;
    document.body.appendChild(tip);
    const r = e.target.closest('.taskbar-btn').getBoundingClientRect();
    tip.style.left = (r.left + r.width / 2 - tip.offsetWidth / 2) + 'px';
    tip.style.bottom = '54px';
    requestAnimationFrame(() => tip.classList.add('visible'));
  }

  function hideTip() {
    const t = document.getElementById('win11-tb-tip');
    if (t) { t.classList.remove('visible'); setTimeout(() => t.remove(), 80); }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTaskbar);
  } else {
    initTaskbar();
  }

})();