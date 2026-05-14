/* ============================================================
   Window Manager - Handles open/close/minimize/maximize/drag/resize
   ============================================================ */

/* ============================================================
   Window Creation
   ============================================================ */

function createWindow(app) {
  const existing = window.__win11.openWindows.find(w => w.app === app.id);
  if (existing) {
    if (existing.minimized) {
      restoreWindow(existing.id);
    } else {
      bringToFront(existing.id);
      focusWindow(existing.id);
    }
    return existing.id;
  }

  const windowId = 'win-' + app.id + '-' + Date.now();
  const zIndex = getNextZIndex();

  const winEl = document.createElement('div');
  winEl.className = 'window';
  winEl.id = windowId;
  winEl.style.cssText = `
    left: ${app.defaultX || 150}px;
    top: ${app.defaultY || 80}px;
    width: ${app.defaultWidth || 800}px;
    height: ${app.defaultHeight || 600}px;
    z-index: ${zIndex};
  `;

  winEl.innerHTML = `
    <div class="window-titlebar" data-window-id="${windowId}">
      <img class="window-titlebar-icon" src="${app.icon}" alt="${app.name}" />
      <span class="window-titlebar-title">${app.name}</span>
      <div class="window-titlebar-controls">
        <button class="window-control minimize" data-action="minimize" title="Minimize">
          <svg viewBox="0 0 10 10"><line x1="0" y1="5" x2="10" y2="5" stroke="currentColor" stroke-width="1"/></svg>
        </button>
        <button class="window-control maximize" data-action="maximize" title="Maximize">
          <svg viewBox="0 0 10 10"><rect x="0" y="0" width="10" height="10" fill="none" stroke="currentColor" stroke-width="1"/></svg>
        </button>
        <button class="window-control close" data-action="close" title="Close">
          <svg viewBox="0 0 10 10"><line x1="0" y1="0" x2="10" y2="10" stroke="currentColor" stroke-width="1"/><line x1="10" y1="0" x2="0" y2="10" stroke="currentColor" stroke-width="1"/></svg>
        </button>
      </div>
    </div>
    <div class="window-content" data-window-id="${windowId}"></div>
  `;

  document.getElementById('windows-container').appendChild(winEl);

  window.__win11.openWindows.push({
    id: windowId,
    app: app.id,
    title: app.name,
    icon: app.icon,
    minimized: false,
    maximized: false,
    zIndex: zIndex,
    bounds: {
      x: app.defaultX || 150,
      y: app.defaultY || 80,
      width: app.defaultWidth || 800,
      height: app.defaultHeight || 600
    }
  });

  winEl.classList.add('open');
  window.__win11.activeWindow = windowId;
  updateTaskbarFocus();

  loadAppContent(windowId, app);

  setupWindowEvents(windowId);

  return windowId;
}

/* ============================================================
   Load App Content
   ============================================================ */

function loadAppContent(windowId, app) {
  const contentEl = document.querySelector(`#${windowId} .window-content`);
  if (contentEl && app.htmlFile) {
    fetch(app.htmlFile)
      .then(res => res.text())
      .then(html => {
        contentEl.innerHTML = html;
        if (app.onLoad) app.onLoad(windowId, contentEl);
      })
      .catch(() => {
        contentEl.innerHTML = `<div class="window-content-inner" style="padding: 20px; color: white;">
          <p>Could not load ${app.name}</p>
        </div>`;
      });
  } else if (app.onLoad) {
    app.onLoad(windowId, contentEl);
  }
}

/* ============================================================
   Window Events Setup
   ============================================================ */

function setupWindowEvents(windowId) {
  const winEl = document.getElementById(windowId);
  if (!winEl) return;

  winEl.addEventListener('mousedown', () => bringToFront(windowId));

  const titlebar = winEl.querySelector('.window-titlebar');
  titlebar.addEventListener('mousedown', e => {
    if (e.target.closest('.window-control')) return;
    startDrag(windowId, e);
  });

  const controls = winEl.querySelectorAll('.window-control');
  controls.forEach(ctrl => {
    ctrl.addEventListener('click', e => {
      e.stopPropagation();
      const action = ctrl.dataset.action;
      if (action === 'minimize') minimizeWindow(windowId);
      else if (action === 'maximize') toggleMaximize(windowId);
      else if (action === 'close') closeWindow(windowId);
    });
  });
}

/* ============================================================
   Drag & Drop
   ============================================================ */

function startDrag(windowId, e) {
  e.preventDefault();
  const winEl = document.getElementById(windowId);
  const state = window.__win11.openWindows.find(w => w.id === windowId);
  if (!winEl || !state) return;

  if (state.maximized) return;

  window.__win11.isDragging = true;
  window.__win11.dragTarget = windowId;

  const rect = winEl.getBoundingClientRect();
  window.__win11.dragOffset = {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  };

  document.addEventListener('mousemove', onDrag);
  document.addEventListener('mouseup', stopDrag);
}

function onDrag(e) {
  if (!window.__win11.isDragging) return;
  const windowId = window.__win11.dragTarget;
  const winEl = document.getElementById(windowId);
  if (!winEl) return;

  const x = e.clientX - window.__win11.dragOffset.x;
  const y = e.clientY - window.__win11.dragOffset.y;

  winEl.style.left = Math.max(0, x) + 'px';
  winEl.style.top = Math.max(0, y) + 'px';
}

function stopDrag() {
  window.__win11.isDragging = false;
  window.__win11.dragTarget = null;
  document.removeEventListener('mousemove', onDrag);
  document.removeEventListener('mouseup', stopDrag);
}

/* ============================================================
   Focus
   ============================================================ */

function focusWindow(windowId) {
  const winEl = document.getElementById(windowId);
  if (winEl) {
    winEl.classList.add('focused');
    winEl.style.zIndex = getNextZIndex();
  }
}

/* ============================================================
   Minimize
   ============================================================ */

function minimizeWindow(windowId) {
  const winEl = document.getElementById(windowId);
  const state = window.__win11.openWindows.find(w => w.id === windowId);
  if (!winEl || !state) return;

  winEl.classList.add('minimizing');
  setTimeout(() => {
    winEl.classList.remove('minimizing');
    winEl.classList.add('minimized');
    state.minimized = true;

    const otherOpen = window.__win11.openWindows.filter(w => !w.minimized);
    if (otherOpen.length > 0) {
      bringToFront(otherOpen[otherOpen.length - 1].id);
    } else {
      window.__win11.activeWindow = null;
    }
    updateTaskbarFocus();
  }, 200);
}

/* ============================================================
   Restore
   ============================================================ */

function restoreWindow(windowId) {
  const winEl = document.getElementById(windowId);
  const state = window.__win11.openWindows.find(w => w.id === windowId);
  if (!winEl || !state) return;

  state.minimized = false;
  winEl.classList.remove('minimized');
  winEl.style.left = state.bounds.x + 'px';
  winEl.style.top = state.bounds.y + 'px';
  winEl.style.width = state.bounds.width + 'px';
  winEl.style.height = state.bounds.height + 'px';

  bringToFront(windowId);
  focusWindow(windowId);
}

/* ============================================================
   Maximize / Restore Toggle
   ============================================================ */

function toggleMaximize(windowId) {
  const winEl = document.getElementById(windowId);
  const state = window.__win11.openWindows.find(w => w.id === windowId);
  if (!winEl || !state) return;

  if (state.maximized) {
    winEl.classList.remove('maximized');
    winEl.style.left = state.bounds.x + 'px';
    winEl.style.top = state.bounds.y + 'px';
    winEl.style.width = state.bounds.width + 'px';
    winEl.style.height = state.bounds.height + 'px';
    state.maximized = false;
  } else {
    state.bounds = {
      x: winEl.offsetLeft,
      y: winEl.offsetTop,
      width: winEl.offsetWidth,
      height: winEl.offsetHeight
    };
    winEl.classList.add('maximized');
    state.maximized = true;
  }
}

/* ============================================================
   Close
   ============================================================ */

function closeWindow(windowId) {
  const winEl = document.getElementById(windowId);
  const idx = window.__win11.openWindows.findIndex(w => w.id === windowId);
  if (idx === -1) return;

  winEl.classList.add('closing');
  setTimeout(() => {
    winEl.remove();
    window.__win11.openWindows.splice(idx, 1);

    if (window.__win11.activeWindow === windowId) {
      const otherOpen = window.__win11.openWindows.filter(w => !w.minimized);
      window.__win11.activeWindow = otherOpen.length > 0 ? otherOpen[otherOpen.length - 1].id : null;
    }
    updateTaskbarFocus();
  }, 150);
}

/* ============================================================
   Context Menu
   ============================================================ */

function showContextMenu(x, y, items, onClose) {
  closeContextMenu();

  const menu = document.createElement('div');
  menu.className = 'context-menu';
  menu.style.left = x + 'px';
  menu.style.top = y + 'px';

  items.forEach(item => {
    if (item.divider) {
      menu.innerHTML += '<div class="context-menu-divider"></div>';
    } else {
      const el = document.createElement('div');
      el.className = 'context-menu-item';
      el.innerHTML = (item.icon ? `<span>${item.icon}</span>` : '') + `<span>${item.label}</span>`;
      if (item.disabled) el.style.opacity = '0.4';
      if (item.click) el.addEventListener('click', () => {
        if (!item.disabled) item.click();
      });
      menu.appendChild(el);
    }
  });

  document.body.appendChild(menu);
  menu.classList.add('visible');
  window.__win11.contextMenuOpen = true;

  setTimeout(() => {
    const rect = menu.getBoundingClientRect();
    if (rect.right > window.innerWidth) {
      menu.style.left = (x - rect.width) + 'px';
    }
    if (rect.bottom > window.innerHeight - 48) {
      menu.style.top = (y - rect.height) + 'px';
    }
  }, 0);

  window.__win11._contextMenu = menu;
  window.__win11._contextMenuClose = onClose || closeContextMenu;
}

function closeContextMenu() {
  if (window.__win11._contextMenu) {
    window.__win11._contextMenu.remove();
    window.__win11._contextMenu = null;
  }
  window.__win11.contextMenuOpen = false;
  if (window.__win11._contextMenuClose) {
    window.__win11._contextMenuClose();
    window.__win11._contextMenuClose = null;
  }
}

/* ============================================================
   Window State Persistence (optional localStorage)
   ============================================================ */

function saveWindowStates() {
  const data = window.__win11.openWindows.map(w => ({
    app: w.app,
    bounds: w.bounds,
    minimized: w.minimized,
    maximized: w.maximized
  }));
  try {
    localStorage.setItem('win11_windows', JSON.stringify(data));
  } catch (e) {}
}

function restoreWindowStates() {
  // Could be used to restore windows on page reload
}

/* ============================================================
   Global Event Listeners
   ============================================================ */

document.addEventListener('click', e => {
  if (!e.target.closest('.context-menu')) {
    closeContextMenu();
  }
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeContextMenu();
  }
});

window.addEventListener('beforeunload', saveWindowStates);