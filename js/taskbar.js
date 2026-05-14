/* ============================================================
   Taskbar JavaScript - Windows 11 Portfolio
   ============================================================ */

(function () {
  const taskbar = document.getElementById('taskbar');
  let clockInterval = null;
  let tooltipTimeout = null;

  const taskbarApps = [
    {
      id: 'file-explorer',
      label: 'File Explorer',
      svg: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="tb-folder-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:#FFD54F"/>
            <stop offset="100%" style="stop-color:#F9A825"/>
          </linearGradient>
        </defs>
        <path d="M2 6C2 4.9 2.9 4 4 4H9L11 6H20C21.1 6 22 6.9 22 8V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6Z" fill="url(#tb-folder-grad)"/>
        <path d="M2 8C2 7.45 2.45 7 3 7H21C21.55 7 22 7.45 22 8V18C22 18.55 21.55 19 21 19H3C2.45 19 2 18.55 2 18V8Z" fill="#FFCA28"/>
      </svg>`
    },
    {
      id: 'edge',
      label: 'Microsoft Edge',
      svg: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="tb-edge-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:#42A5F5"/>
            <stop offset="100%" style="stop-color:#1976D2"/>
          </linearGradient>
        </defs>
        <circle cx="12" cy="12" r="10" fill="url(#tb-edge-grad)"/>
        <path d="M12 5C8.5 5 5 8.5 5 12C5 14.5 6.5 16.5 8 18L10 16C9 15.5 8.5 14.5 8.5 13.5C9.5 14 10.5 14.5 11.5 14.5C10.5 13.5 9.5 11.5 9.5 10C10 9.5 11 9 12 9C12.5 9 13 9.1 13.5 9.2C12.5 8 12 6.5 12 5Z" fill="white"/>
        <path d="M12 5C14.5 5 16.5 6 18 7.5C17 7.5 14 6 14 6C13.5 6 11.5 6.5 10.5 7C11 6.5 11.5 5.5 12 5Z" fill="white" opacity="0.7"/>
        <path d="M14.5 8C15 8.5 16.5 11 16 12.5C14.5 12 13.5 11 12.5 10.5C13.5 10 15.5 9 16 8C15.5 8 15 8 14.5 8Z" fill="white" opacity="0.6"/>
      </svg>`
    }
  ];

  function initTaskbar() {
    if (!taskbar) return;

    const existingCenter = document.getElementById('taskbar-center');
    const existingLeft = document.getElementById('taskbar-left');
    const existingRight = document.getElementById('taskbar-right');

    if (existingLeft) existingLeft.remove();
    if (existingCenter) existingCenter.remove();
    if (existingRight) existingRight.remove();

    taskbar.innerHTML = '';

    const leftZone = document.createElement('div');
    leftZone.id = 'taskbar-left';

    const centerZone = document.createElement('div');
    centerZone.id = 'taskbar-center';

    const rightZone = document.createElement('div');
    rightZone.id = 'taskbar-right';

    const startBtn = createStartButton();
    leftZone.appendChild(startBtn);

    taskbarApps.forEach(app => {
      const btn = createAppButton(app);
      centerZone.appendChild(btn);
    });

    rightZone.innerHTML = `
      <div id="system-tray">
        <div class="tray-icon" id="tray-network" title="Network">
          <svg viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 2C5.5 2 3.2 2.8 1.3 4.2.7 4.7.3 5.6.3 6.5C.3 7.4.7 8.3 1.3 8.8 3.2 10.2 5.5 11 8 11s4.8-.8 6.7-2.2c.6-.5 1-.4 1.3-.9.3-.5.7-1.4.7-2.3 0-.9-.4-1.8-.7-2.3-.3-.5-.7-.4-1.3-.9C12.8 2.8 10.5 2 8 2zM8 9.5C6.9 9.5 6 8.6 6 7.5v-.5C6 5.6 6.6 4.5 7.5 3.8 7.8 4.5 8 5.4 8 6.3V7.5C8 8.6 7.1 9.5 6 9.5c-.8 0-1.5-.5-1.7-1.2 1.4-.9 3-1.3 4.7-1.3 1.7 0 3.3.4 4.7 1.3-.2.7-.9 1.2-1.7 1.2zM8 7a.75.75 0 0 1 .75.75V7.5H8A.75.75 0 0 1 7.25 7V7A.75.75 0 0 1 8 7z"/>
            <path d="M8 12c-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3-1.3-3-3-3zm0 5c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
          </svg>
        </div>
        <div class="tray-icon" id="tray-volume" title="Volume">
          <svg viewBox="0 0 16 16" fill="currentColor">
            <path d="M3 5v6h3l4 4V1L6 5H3zm8.5 1.5c.9-.9.9-2.4 0-3.3-.9-.9-2.4-.9-3.3 0-.4.4-.6.9-.6 1.4s.2 1 .6 1.4c.9.9 2.4.9 3.3 0zm.5 2c.7-.7.7-1.9 0-2.6-.7-.7-1.9-.7-2.6 0-.3.3-.4.6-.4 1s.1.7.4 1c.7.7 1.9.7 2.6 0z"/>
          </svg>
        </div>
        <div class="tray-icon" id="tray-battery" title="Battery">
          <svg viewBox="0 0 16 16" fill="currentColor">
            <path d="M4 2h6v10H4V2z"/>
            <path d="M11 4h1v8h-1V4z"/>
            <rect x="5" y="4" width="4" height="1" fill="rgba(255,255,255,0.5)"/>
            <rect x="5" y="6" width="4" height="1" fill="rgba(255,255,255,0.5)"/>
            <rect x="5" y="8" width="4" height="1" fill="rgba(255,255,255,0.5)"/>
          </svg>
        </div>
        <div class="tray-divider" style="width:1px;height:20px;background:rgba(255,255,255,0.1);margin:0 2px;"></div>
        <div id="tray-clock">
          <div id="tray-time"></div>
          <div id="tray-date"></div>
        </div>
      </div>
    `;

    taskbar.appendChild(leftZone);
    taskbar.appendChild(centerZone);
    taskbar.appendChild(rightZone);

    setupTaskbarEvents();
    startClock();
  }

  function createStartButton() {
    const btn = document.createElement('div');
    btn.className = 'taskbar-btn';
    btn.id = 'start-btn';
    btn.title = 'Start';
    btn.innerHTML = `
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="9" height="9" rx="1" fill="#F25022"/>
        <rect x="13" y="2" width="9" height="9" rx="1" fill="#7FBA00"/>
        <rect x="2" y="13" width="9" height="9" rx="1" fill="#00A4EF"/>
        <rect x="13" y="13" width="9" height="9" rx="1" fill="#FFB900"/>
      </svg>
    `;
    return btn;
  }

  function createAppButton(app) {
    const btn = document.createElement('div');
    btn.className = 'taskbar-btn';
    btn.dataset.app = app.id;
    btn.title = app.label;
    btn.innerHTML = app.svg;
    return btn;
  }

  function setupTaskbarEvents() {
    const startBtn = document.getElementById('start-btn');
    if (startBtn) {
      startBtn.addEventListener('click', toggleStartMenu);
    }

    const trayClock = document.getElementById('tray-clock');
    if (trayClock) {
      trayClock.addEventListener('click', openActionCenter);
    }

    const appBtns = document.querySelectorAll('.taskbar-btn[data-app]');
    appBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const appId = btn.dataset.app;
        if (window.__win11 && window.__win11.openApp) {
          window.__win11.openApp(appId);
        }
      });

      btn.addEventListener('mouseenter', (e) => {
        showTaskbarTooltip(e.target, btn.title);
      });

      btn.addEventListener('mouseleave', hideTaskbarTooltip);
    });

    if (startBtn) {
      startBtn.addEventListener('mouseenter', (e) => {
        showTaskbarTooltip(e.target, 'Start');
      });
      startBtn.addEventListener('mouseleave', hideTaskbarTooltip);
    }
  }

  function toggleStartMenu() {
    if (window.__win11) {
      if (window.__win11.startMenuOpen) {
        closeStartMenu();
      } else {
        openStartMenu();
      }
    }
  }

  function openStartMenu() {
    const startMenu = document.getElementById('start-menu');
    if (startMenu) {
      startMenu.classList.add('visible');
      startMenu.classList.remove('closing');
      if (window.__win11) window.__win11.startMenuOpen = true;
    }
  }

  function closeStartMenu() {
    const startMenu = document.getElementById('start-menu');
    if (startMenu) {
      startMenu.classList.add('closing');
      setTimeout(() => {
        startMenu.classList.remove('visible', 'closing');
      }, 150);
      if (window.__win11) window.__win11.startMenuOpen = false;
    }
  }

  function openActionCenter() {
    if (window.__win11 && window.__win11.openApp) {
      window.__win11.openApp('action-center');
    }
  }

  function startClock() {
    updateClock();

    if (clockInterval) clearInterval(clockInterval);
    clockInterval = setInterval(updateClock, 30000);
  }

  function updateClock() {
    const timeEl = document.getElementById('tray-time');
    const dateEl = document.getElementById('tray-date');

    if (!timeEl || !dateEl) return;

    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    timeEl.textContent = displayHours + ':' + minutes + ' ' + ampm;

    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    dateEl.textContent = month + '/' + day;
  }

  function showTaskbarTooltip(target, text) {
    hideTaskbarTooltip();

    const tooltip = document.createElement('div');
    tooltip.className = 'taskbar-tooltip';
    tooltip.id = 'taskbar-tooltip';
    tooltip.textContent = text;
    document.body.appendChild(tooltip);

    const rect = target.getBoundingClientRect();
    const tRect = tooltip.getBoundingClientRect();

    tooltip.style.left = (rect.left + (rect.width / 2) - (tRect.width / 2)) + 'px';
    tooltip.style.bottom = '56px';

    requestAnimationFrame(() => {
      tooltip.classList.add('visible');
    });
  }

  function hideTaskbarTooltip() {
    const tooltip = document.getElementById('taskbar-tooltip');
    if (tooltip) {
      tooltip.classList.remove('visible');
      setTimeout(() => tooltip.remove(), 100);
    }
  }

  window.__win11 = window.__win11 || {};
  window.__win11.initTaskbar = initTaskbar;
  window.__win11.openStartMenu = openStartMenu;
  window.__win11.closeStartMenu = closeStartMenu;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTaskbar);
  } else {
    initTaskbar();
  }
})();