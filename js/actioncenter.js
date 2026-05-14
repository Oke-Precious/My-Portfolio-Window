/* ============================================================
   Action Center & Notifications - Windows 11 Portfolio
   ============================================================ */

(function () {
  'use strict';

  const actionCenter = document.getElementById('actionCenter');
  const trayClock = document.getElementById('tray-clock');

  let isOpen = false;
  let toastQueue = [];

  /* ============================================================
     Notifications Data
     ============================================================ */

  const notifications = [
    {
      id: 'n1',
      icon: '📬',
      bg: 'rgba(0,120,212,0.15)',
      title: 'New message from recruiter',
      sub: 'TechCorp Inc. is interested in your profile',
      time: '5 min ago',
      action: 'contact'
    },
    {
      id: 'n2',
      icon: '⭐',
      bg: 'rgba(255,202,40,0.15)',
      title: 'GitHub: Portfolio Window got starred',
      sub: 'Someone found your project interesting!',
      time: '1 hour ago',
      action: 'edge'
    },
    {
      id: 'n3',
      icon: '🎉',
      bg: 'rgba(156,39,176,0.15)',
      title: 'Welcome!',
      sub: 'You\'re viewing Oke Precious\'s Portfolio',
      time: 'Just now',
      action: null
    },
    {
      id: 'n4',
      icon: '💡',
      bg: 'rgba(0,150,136,0.15)',
      title: 'Pro tip',
      sub: 'Double-click any desktop icon to open an app',
      time: 'Always',
      action: null
    }
  ];

  let activeNotifs = [...notifications];

  /* ============================================================
     Open / Close
     ============================================================ */

  function openActionCenter() {
    if (isOpen) { closeActionCenter(); return; }
    isOpen = true;
    actionCenter.classList.remove('closing');
    actionCenter.classList.add('visible');
    renderNotificationTab();
    renderCalendarTab();
    const overlay = document.getElementById('globalOverlay');
    if (overlay) overlay.classList.add('active');
  }

  function closeActionCenter() {
    if (!isOpen) return;
    isOpen = false;
    actionCenter.classList.add('closing');
    setTimeout(() => {
      actionCenter.classList.remove('visible', 'closing');
    }, 150);
    const overlay = document.getElementById('globalOverlay');
    if (overlay) overlay.classList.remove('active');
  }

  window.openActionCenter = openActionCenter;
  window.closeActionCenter = closeActionCenter;

  window.__win11 = window.__win11 || {};
  window.__win11.openActionCenter = function () { if (!isOpen) openActionCenter(); };
  window.__win11.closeActionCenter = closeActionCenter;

  document.addEventListener('mousedown', e => {
    if (isOpen && !e.target.closest('#actionCenter') && !e.target.closest('#tray-clock')) {
      closeActionCenter();
    }
  });

  /* ============================================================
     Tab Navigation
     ============================================================ */

  function switchTab(tabName) {
    document.querySelectorAll('.ac-tab').forEach(t => {
      t.classList.toggle('active', t.dataset.tab === tabName);
    });
    document.querySelectorAll('.ac-content > div').forEach(c => {
      c.classList.toggle('active', c.id === 'ac-' + tabName);
    });

    if (tabName === 'calendar') renderCalendarMonth();
  }

  /* ============================================================
     Notification Tab
     ============================================================ */

  function renderNotificationTab() {
    const list = document.getElementById('acNotifList');
    if (!list) return;

    if (activeNotifs.length === 0) {
      list.innerHTML = '<div class="ac-no-notifs">No new notifications</div>';
      return;
    }

    list.innerHTML = activeNotifs.map(n => `
      <div class="ac-notif-card" data-id="${n.id}" data-action="${n.action || ''}">
        <div class="ac-notif-icon" style="background:${n.bg}">${n.icon}</div>
        <div class="ac-notif-body">
          <div class="ac-notif-title">${n.title}</div>
          <div class="ac-notif-sub">${n.sub}</div>
        </div>
        <div class="ac-notif-time">${n.time}</div>
        <div class="ac-notif-close" data-dismiss="${n.id}">\\d7</div>
      </div>
    `).join('');

    list.querySelectorAll('.ac-notif-card').forEach(card => {
      card.addEventListener('click', e => {
        if (e.target.closest('.ac-notif-close')) return;
        const action = card.dataset.action;
        closeActionCenter();
        setTimeout(() => {
          if (action === 'contact') openContactWindow();
          else if (action === 'edge') launchApp('edge');
        }, 200);
      });
    });

    list.querySelectorAll('.ac-notif-close').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        dismissNotif(btn.dataset.dismiss);
      });
    });
  }

  function dismissNotif(id) {
    const card = document.querySelector(`.ac-notif-card[data-id="${id}"]`);
    if (!card) return;
    card.classList.add('dismissing');
    setTimeout(() => {
      activeNotifs = activeNotifs.filter(n => n.id !== id);
      renderNotificationTab();
    }, 300);
  }

  function clearAllNotifs() {
    const cards = document.querySelectorAll('.ac-notif-card');
    cards.forEach((card, i) => {
      setTimeout(() => {
        card.classList.add('dismissing');
      }, i * 80);
    });
    setTimeout(() => {
      activeNotifs = [];
      renderNotificationTab();
    }, cards.length * 80 + 300);
  }

  /* ============================================================
     Calendar Tab
     ============================================================ */

  let currentCalMonth = new Date();

  function renderCalendarTab() {
    renderCalendarMonth();
  }

  function renderCalendarMonth() {
    const monthEl = document.getElementById('acCalMonth');
    const gridEl = document.getElementById('acCalGrid');

    if (!monthEl || !gridEl) return;

    const year = currentCalMonth.getFullYear();
    const month = currentCalMonth.getMonth();
    const today = new Date();

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                        'July', 'August', 'September', 'October', 'November', 'December'];
    monthEl.textContent = `${monthNames[month]} ${year}`;

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDow = firstDay.getDay();

    const cells = [];

    // Blank cells before first day
    for (let i = 0; i < startDow; i++) {
      const prevDate = new Date(year, month, -startDow + i + 1);
      cells.push({ day: prevDate.getDate(), other: true, date: prevDate });
    }

    // Days of month
    for (let d = 1; d <= lastDay.getDate(); d++) {
      const date = new Date(year, month, d);
      const isToday = date.toDateString() === today.toDateString();
      cells.push({ day: d, today: isToday, date: date });
    }

    // Fill remaining cells to complete grid
    const remaining = 7 - (cells.length % 7);
    if (remaining < 7) {
      for (let i = 1; i <= remaining; i++) {
        const nextDate = new Date(year, month + 1, i);
        cells.push({ day: i, other: true, date: nextDate });
      }
    }

    const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let html = dayHeaders.map(d => `<div class="ac-day-header">${d}</div>`).join('');

    cells.forEach(c => {
      let cls = 'ac-day-cell';
      if (c.today) cls += ' today';
      if (c.other) cls += ' other-month';
      const dateStr = c.date.toISOString().split('T')[0];
      html += `<div class="${cls}" data-date="${dateStr}">${c.day}</div>`;
    });

    gridEl.innerHTML = html;

    // Update events
    const eventsEl = document.getElementById('acCalEvents');
    if (eventsEl) {
      const events = [
        { name: 'Available for projects', time: 'Now', color: '#4CAF50' },
        { name: 'Last portfolio update', time: 'Today', color: '#42A5F5' },
        { name: 'Coffee break', time: 'Anytime', color: '#FF9800' },
      ];

      eventsEl.innerHTML = events.map(e => `
        <div class="ac-event-item" style="border-left-color:${e.color}">
          <div class="ac-event-dot" style="background:${e.color}"></div>
          <div class="ac-event-name">${e.name}</div>
          <div class="ac-event-time">${e.time}</div>
        </div>
      `).join('');
    }
  }

  function calPrev() {
    currentCalMonth.setMonth(currentCalMonth.getMonth() - 1);
    renderCalendarMonth();
  }

  function calNext() {
    currentCalMonth.setMonth(currentCalMonth.getMonth() + 1);
    renderCalendarMonth();
  }

  /* ============================================================
     Focus Mode
   ============================================================ */

  let focusOn = false;

  function toggleFocus() {
    focusOn = !focusOn;
    const btn = document.getElementById('acFocusToggle');
    if (btn) btn.classList.toggle('active', focusOn);
    const status = document.getElementById('acFocusStatus');
    if (status) status.textContent = focusOn ? 'Focus mode on' : 'Focus mode off';
    if (focusOn) {
      showToast('Focus mode activated', 'info', '🎯');
    }
  }

  /* ============================================================
     Quick Settings
   ============================================================ */

  const quickTiles = {
    wifi: { active: true, label: 'Wi-Fi', sub: 'Connected' },
    bluetooth: { active: false, label: 'Bluetooth', sub: 'Off' },
    airplane: { active: false, label: 'Airplane', sub: 'Off' },
    nightlight: { active: false, label: 'Night light', sub: 'Off' },
    accessibility: { active: false, label: 'Ease of access', sub: '' },
    battery: { active: false, label: 'Battery', sub: '87%' },
    cast: { active: false, label: 'Cast', sub: '' },
    connect: { active: false, label: 'Connect', sub: '' }
  };

  function toggleTile(key) {
    if (key === 'connect') {
      closeActionCenter();
      setTimeout(() => openContactWindow(), 200);
      return;
    }
    quickTiles[key].active = !quickTiles[key].active;
    renderQuickTiles();
  }

  function renderQuickTiles() {
    const grid = document.getElementById('acQuickTiles');
    if (!grid) return;

    const tileIcons = {
      wifi: `<svg viewBox="0 0 20 20" fill="currentColor"><path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3a4.24 4.24 0 00-6-6l3 3 3-3a4.24 4.24 0 00-6-6l3 3 3-3z"/></svg>`,
      bluetooth: `<svg viewBox="0 0 20 20" fill="currentColor"><path d="M6.5 3.5l8 6.5-3 3.5 2 2 5-8.5 2.5 2.5-8 12.5-2-2-3 3.5-2-2 3-3.5z"/></svg>`,
      airplane: `<svg viewBox="0 0 20 20" fill="currentColor"><path d="M17.8 9.5L11 4v4.5L4 5v3l7 4.5V17l7-5V9.5z"/></svg>`,
      nightlight: `<svg viewBox="0 0 20 20" fill="currentColor"><path d="M10 2a8 8 0 0 0 0 16 8 8 0 0 0 0-16zm0 14a6 6 0 0 1 0-12 6 6 0 0 1 0 12z"/></svg>`,
      accessibility: `<svg viewBox="0 0 20 20" fill="currentColor"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 13a5 5 0 110-10 5 5 0 010 10zm0-8a3 3 0 100 6 3 3 0 000-6zm-4 3h8v2H6v-2z"/></svg>`,
      battery: `<svg viewBox="0 0 20 20" fill="currentColor"><path d="M3 4h11v10H3V4zm13 2h1v6h-1V6z"/><rect x="4" y="6" width="8" height="1" fill="rgba(255,255,255,0.4)"/><rect x="4" y="8" width="8" height="1" fill="rgba(255,255,255,0.4)"/></svg>`,
      cast: `<svg viewBox="0 0 20 20" fill="currentColor"><path d="M17 3H3c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 10H4v-3H3v3H2v3h1v3h3v-3h1v-3h2v3h3v-3h-3v-3z"/></svg>`,
      connect: `<svg viewBox="0 0 20 20" fill="currentColor"><path d="M10 2C6.48 2 3.5 5.48 3.5 9c0 1.88.82 3.57 2.12 4.79L5 14.5 8.2 14.2c.4.28.85.47 1.33.54L10 18l.47-3.26c.48-.07.93-.26 1.33-.54L15 14.5l-.62-.71A7.47 7.47 0 0016.5 9c0-3.52-2.98-7-7-7zm0 12c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/></svg>`
    };

    const subLabels = {
      wifi: t => t.active ? 'Connected' : 'Off',
      bluetooth: t => t.active ? 'On' : 'Off',
      airplane: t => t.active ? 'On' : 'Off',
      nightlight: t => t.active ? 'On' : 'Off',
      accessibility: t => '',
      battery: t => t.active ? 'Saver On' : '87%',
      cast: t => '',
      connect: t => ''
    };

    grid.innerHTML = Object.entries(quickTiles).map(([key, tile]) => `
      <div class="ac-quick-tile ${key} ${tile.active ? 'active' : ''}" data-tile="${key}">
        ${tileIcons[key]}
        <div class="tile-label">${tile.label}</div>
      </div>
    `).join('');

    grid.querySelectorAll('.ac-quick-tile').forEach(el => {
      el.addEventListener('click', () => toggleTile(el.dataset.tile));
    });
  }

  /* ============================================================
     Toast Notifications
   ============================================================ */

  function showToast(message, type, icon) {
    type = type || 'info';
    icon = icon || (type === 'success' ? '✅' : type === 'warning' ? '⚠️' : type === 'error' ? '❌' : 'ℹ️');

    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `ac-toast ${type}`;
    toast.innerHTML = `
      <div class="ac-toast-icon">${icon}</div>
      <div class="ac-toast-body">
        <div class="ac-toast-title">${message}</div>
      </div>
      <div class="ac-toast-close" onclick="this.closest('.ac-toast').classList.add('dismissing'); setTimeout(() => this.closest('.ac-toast').remove(), 200)">\\d7</div>
      <div class="ac-toast-progress"></div>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      if (toast.parentNode) {
        toast.classList.add('dismissing');
        setTimeout(() => toast.remove(), 200);
      }
    }, 4000);
  }

window.showToast = showToast;

  window.__win11 = window.__win11 || {};
  window.__win11.showToast = showToast;
  window.__win11.openActionCenter = function () { if (!isOpen) openActionCenter(); };

})();