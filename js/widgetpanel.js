/* ============================================================
   Widget Panel (Pomodoro + Calendar) - Windows 11 Portfolio
   ============================================================ */

(function () {
  'use strict';

  let widgetPanel = null;
  let pomodoroInterval = null;
  let pomodoroState = {
    mode: 'work',
    timeLeft: 25 * 60,
    isRunning: false,
    sessions: 0,
    durations: { work: 25 * 60, short: 5 * 60, long: 15 * 60 }
  };
  let selectedDate = null;

  function createWidgetPanel() {
    if (widgetPanel) return widgetPanel;

    widgetPanel = document.createElement('div');
    widgetPanel.id = 'widgetPanel';
    widgetPanel.innerHTML = `
      <div class="wp-section" id="pomodoroWidget">
        <div class="wp-section-title">
          <svg viewBox="0 0 24 24" fill="currentColor" style="width:16px;height:16px"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
          Pomodoro Timer
        </div>
        <div class="pomo-modes">
          <button class="pomo-mode-btn active" data-mode="work">Work</button>
          <button class="pomo-mode-btn" data-mode="short">Short Break</button>
          <button class="pomo-mode-btn" data-mode="long">Long Break</button>
        </div>
        <div class="pomo-ring-wrap">
          <svg class="pomo-ring" viewBox="0 0 140 140">
            <circle cx="70" cy="70" r="65" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="8"/>
            <circle class="pomo-ring-progress" cx="70" cy="70" r="65" fill="none" stroke="var(--win11-accent)" stroke-width="8" stroke-linecap="round" stroke-dasharray="408" stroke-dashoffset="0" transform="rotate(-90 70 70)"/>
          </svg>
          <div class="pomo-time-display">
            <span id="pomo-min">25</span>:<span id="pomo-sec">00</span>
          </div>
        </div>
        <div class="pomo-controls">
          <button class="pomo-ctrl-btn" id="pomo-play">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
          </button>
          <button class="pomo-ctrl-btn" id="pomo-reset">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.65 6.35A7.96 7.96 0 0012 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0112 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>
          </button>
        </div>
        <div class="pomo-sessions">
          Sessions completed: <strong id="pomo-sessions-count">0</strong>
        </div>
      </div>

      <div class="wp-section" id="calendarWidget">
        <div class="wp-section-title">
          <svg viewBox="0 0 24 24" fill="currentColor" style="width:16px;height:16px"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm-8 4H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z"/></svg>
          Calendar
        </div>
        <div class="cal-header">
          <button class="cal-nav-btn" id="cal-prev">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
          </button>
          <span class="cal-month-label" id="cal-month-label">May 2026</span>
          <button class="cal-nav-btn" id="cal-next">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
          </button>
        </div>
        <div class="cal-grid" id="cal-grid">
          <div class="cal-day-label">Su</div><div class="cal-day-label">Mo</div><div class="cal-day-label">Tu</div>
          <div class="cal-day-label">We</div><div class="cal-day-label">Th</div><div class="cal-day-label">Fr</div>
          <div class="cal-day-label">Sa</div>
        </div>
      </div>
    `;

    document.body.appendChild(widgetPanel);

    widgetPanel.addEventListener('click', (e) => {
      if (e.target === widgetPanel || e.target.closest('.wp-close')) {
        closeWidgetPanel();
      }
    });

    initPomodoro();
    initCalendar();

    return widgetPanel;
  }

  /* ---- Pomodoro ---- */

  function initPomodoro() {
    document.querySelectorAll('.pomo-mode-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.pomo-mode-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        pomodoroState.mode = btn.dataset.mode;
        pomodoroState.timeLeft = pomodoroState.durations[pomodoroState.mode];
        pomodoroState.isRunning = false;
        clearInterval(pomodoroInterval);
        updatePomodoroDisplay();
        updatePlayBtn();
      });
    });

    document.getElementById('pomo-play').addEventListener('click', () => {
      if (pomodoroState.isRunning) {
        pomodoroState.isRunning = false;
        clearInterval(pomodoroInterval);
      } else {
        pomodoroState.isRunning = true;
        pomodoroInterval = setInterval(() => {
          pomodoroState.timeLeft--;
          if (pomodoroState.timeLeft <= 0) {
            pomodoroState.timeLeft = 0;
            pomodoroState.isRunning = false;
            clearInterval(pomodoroInterval);
            if (pomodoroState.mode === 'work') {
              pomodoroState.sessions++;
              document.getElementById('pomo-sessions-count').textContent = pomodoroState.sessions;
              if (typeof showToast === 'function') {
                showToast('Pomodoro session complete! Take a break.', 'success', '&#9200;');
              }
            }
            pomodoroState.mode = pomodoroState.mode === 'work' ? 'short' : 'work';
            pomodoroState.timeLeft = pomodoroState.durations[pomodoroState.mode];
            document.querySelectorAll('.pomo-mode-btn').forEach(b => b.classList.toggle('active', b.dataset.mode === pomodoroState.mode));
          }
          updatePomodoroDisplay();
        }, 1000);
      }
      updatePlayBtn();
    });

    document.getElementById('pomo-reset').addEventListener('click', () => {
      pomodoroState.isRunning = false;
      clearInterval(pomodoroInterval);
      pomodoroState.timeLeft = pomodoroState.durations[pomodoroState.mode];
      updatePomodoroDisplay();
      updatePlayBtn();
    });

    updatePomodoroDisplay();
  }

  function updatePomodoroDisplay() {
    const min = Math.floor(pomodoroState.timeLeft / 60);
    const sec = pomodoroState.timeLeft % 60;
    const minEl = document.getElementById('pomo-min');
    const secEl = document.getElementById('pomo-sec');
    if (minEl) minEl.textContent = min.toString().padStart(2, '0');
    if (secEl) secEl.textContent = sec.toString().padStart(2, '0');

    const progress = document.querySelector('.pomo-ring-progress');
    if (progress) {
      const total = pomodoroState.durations[pomodoroState.mode];
      const offset = (1 - pomodoroState.timeLeft / total) * 408;
      progress.style.strokeDashoffset = offset;
      progress.style.transition = 'stroke-dashoffset 1s linear';
    }
  }

  function updatePlayBtn() {
    const btn = document.getElementById('pomo-play');
    if (!btn) return;
    btn.innerHTML = pomodoroState.isRunning
      ? `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`
      : `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`;
  }

  /* ---- Calendar ---- */

  let calDate = new Date();

  function initCalendar() {
    document.getElementById('cal-prev').addEventListener('click', (e) => { e.stopPropagation(); calDate.setMonth(calDate.getMonth() - 1); renderCalendar(); });
    document.getElementById('cal-next').addEventListener('click', (e) => { e.stopPropagation(); calDate.setMonth(calDate.getMonth() + 1); renderCalendar(); });
    renderCalendar();
  }

  function renderCalendar() {
    const grid = document.getElementById('cal-grid');
    const label = document.getElementById('cal-month-label');
    if (!grid || !label) return;

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    label.textContent = months[calDate.getMonth()] + ' ' + calDate.getFullYear();

    grid.innerHTML = `
      <div class="cal-day-label">Su</div><div class="cal-day-label">Mo</div><div class="cal-day-label">Tu</div>
      <div class="cal-day-label">We</div><div class="cal-day-label">Th</div><div class="cal-day-label">Fr</div>
      <div class="cal-day-label">Sa</div>
    `;

    const tempDate = new Date(calDate.getFullYear(), calDate.getMonth(), 1);
    const startDay = tempDate.getDay();
    const daysInMonth = new Date(calDate.getFullYear(), calDate.getMonth() + 1, 0).getDate();
    const today = new Date();
    const isCurrentMonth = today.getMonth() === calDate.getMonth() && today.getFullYear() === calDate.getFullYear();
    const todayDate = today.getDate();

    for (let i = 0; i < startDay; i++) {
      const empty = document.createElement('div');
      empty.className = 'cal-day empty';
      grid.appendChild(empty);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const dayEl = document.createElement('div');
      dayEl.className = 'cal-day';
      dayEl.textContent = d;
      if (isCurrentMonth && d === todayDate) dayEl.classList.add('today');
      dayEl.addEventListener('click', (e) => {
        e.stopPropagation();
        document.querySelectorAll('.cal-day.selected').forEach(el => el.classList.remove('selected'));
        dayEl.classList.add('selected');
      });
      grid.appendChild(dayEl);
    }

    grid.style.gridTemplateColumns = 'repeat(7, 1fr)';
  }

  /* ---- Panel Toggle ---- */

  function openWidgetPanel() {
    if (!widgetPanel) createWidgetPanel();
    if (typeof window.__win11.activateOverlay === 'function') window.__win11.activateOverlay('widget');
    widgetPanel.style.display = 'block';
    requestAnimationFrame(() => {
      widgetPanel.style.opacity = '1';
      widgetPanel.style.transform = 'translateY(0)';
    });
    updatePomodoroDisplay();
  }

  function closeWidgetPanel() {
    if (!widgetPanel) return;
    widgetPanel.style.opacity = '0';
    widgetPanel.style.transform = 'translateY(-10px)';
    if (typeof window.__win11.deactivateOverlay === 'function') window.__win11.deactivateOverlay('widget');
    setTimeout(() => { if (widgetPanel) widgetPanel.style.display = 'none'; }, 200);
  }

  function toggleWidgetPanel() {
    if (!widgetPanel || widgetPanel.style.display === 'none') {
      openWidgetPanel();
    } else {
      closeWidgetPanel();
    }
  }

  /* ---- Register ---- */
  window.__win11 = window.__win11 || {};
  window.__win11.toggleWidgetPanel = toggleWidgetPanel;
  window.__win11.openWidgetPanel = openWidgetPanel;
  window.__win11.closeWidgetPanel = closeWidgetPanel;

})();