/* ============================================================
   Task View (Win + Tab equivalent)
   ============================================================ */

(function () {
  'use strict';

  let taskViewEl = null;
  let active = false;

  function build() {
    if (taskViewEl) return taskViewEl;
    taskViewEl = document.createElement('div');
    taskViewEl.id = 'taskView';
    taskViewEl.innerHTML = `
      <div id="tvHeader">
        <h3>Task View</h3>
        <button class="tv-close-btn" id="tvCloseBtn" aria-label="Close Task View">✕</button>
      </div>
      <div id="tvDesktopLabel">Desktop 1</div>
      <div id="tvThumbnails"></div>
      <div id="tvNewDesktop">
        <svg viewBox="0 0 20 20" width="20" height="20" fill="currentColor">
          <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"/>
        </svg>
        <span>New Desktop</span>
      </div>
    `;
    document.body.appendChild(taskViewEl);

    document.getElementById('tvCloseBtn').addEventListener('click', closeTaskView);
    taskViewEl.addEventListener('click', (e) => {
      if (e.target === taskViewEl) closeTaskView();
    });
    document.addEventListener('keydown', handleTaskViewKey);

    return taskViewEl;
  }

  function handleTaskViewKey(e) {
    if (!active) return;
    if (e.key === 'Escape') closeTaskView();
  }

  function openTaskView() {
    build();
    renderThumbnails();
    taskViewEl.classList.add('visible');
    document.getElementById('globalOverlay')?.classList.add('active');
    active = true;

    document.getElementById('mobileBottomNav')?.querySelectorAll('.mobile-nav-btn').forEach(b => b.classList.remove('active'));
    const tvBtn = document.querySelector('.mobile-nav-btn[data-action="taskview"]');
    if (tvBtn) tvBtn.classList.add('active');
  }

  function closeTaskView() {
    if (!taskViewEl) return;
    taskViewEl.classList.remove('visible');
    document.getElementById('globalOverlay')?.classList.remove('active');
    active = false;
  }

  function renderThumbnails() {
    const container = document.getElementById('tvThumbnails');
    if (!container || !window.__win11) return;

    const windows = Array.from(document.querySelectorAll('.win11-window:not(.closed)'));
    container.innerHTML = '';

    if (windows.length === 0) {
      container.innerHTML = '<p class="tv-empty">No open windows</p>';
      return;
    }

    windows.forEach(win => {
      const title = win.querySelector('.win-title')?.textContent || 'Window';
      const id = win.dataset.winId;
      const isMin = win.classList.contains('minimized');

      const card = document.createElement('div');
      card.className = 'tv-thumb-card';
      card.dataset.winId = id;
      card.innerHTML = `
        <div class="tv-thumb-preview" id="tvPreview-${id}">
          <div class="tv-thumb-title">${title}</div>
          ${isMin ? '<span class="tv-min-badge">Minimized</span>' : ''}
        </div>
        <div class="tv-thumb-label">${title}</div>
      `;

      const preview = card.querySelector(`#tvPreview-${id}`);
      const winContent = win.querySelector('.win-content');

      if (winContent && !isMin) {
        const clone = winContent.cloneNode(true);
        clone.style.cssText = `
          position: absolute; top: 0; left: 0; right: 0; bottom: 0;
          transform-origin: top left;
          width: ${winContent.scrollWidth}px; height: ${winContent.scrollHeight}px;
          pointer-events: none;
          overflow: hidden;
        `;
        preview.appendChild(clone);
      }

      card.addEventListener('click', (e) => {
        e.stopPropagation();
        closeTaskView();
        if (window.__win11.focusApp) window.__win11.focusApp(id);
      });

      card.addEventListener('mouseenter', () => {
        card.classList.add('hovered');
      });

      card.addEventListener('mouseleave', () => {
        card.classList.remove('hovered');
      });

      container.appendChild(card);
    });
  }

  window.__win11 = window.__win11 || {};
  window.__win11.openTaskView = openTaskView;
  window.__win11.closeTaskView = closeTaskView;

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      if (active) {
        closeTaskView();
      } else {
        openTaskView();
      }
    }
  });

  const taskbarBtn = document.querySelector('[data-action="taskview"]');
  if (taskbarBtn) {
    taskbarBtn.addEventListener('click', () => {
      if (active) closeTaskView(); else openTaskView();
    });
  }

})();