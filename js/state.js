/* ============================================================
   Global App State - Windows 11 Portfolio
   ============================================================ */

window.__win11 = {
  openWindows: [],
  activeWindow: null,
  zCounter: 100,
  startMenuOpen: false,
  contextMenuOpen: false,
  isDragging: false,
  isResizing: false,
  dragTarget: null,
  dragOffset: { x: 0, y: 0 },
  resizeTarget: null,
  resizeEdge: null,
  preDragState: null,
  preResizeState: null
};

/* ============================================================
   Helper Functions
   ============================================================ */

/**
 * Increment z-index counter and return new value
 */
function getNextZIndex() {
  return ++window.__win11.zCounter;
}

/**
 * Bring a window to front
 */
function bringToFront(windowId) {
  const win = window.__win11.openWindows.find(w => w.id === windowId);
  if (win) {
    win.zIndex = getNextZIndex();
    window.__win11.activeWindow = windowId;
    updateTaskbarFocus();
  }
}

/**
 * Update taskbar active state
 */
function updateTaskbarFocus() {
  document.querySelectorAll('.taskbar-app').forEach(btn => {
    const appId = btn.dataset.app;
    if (window.__win11.openWindows.some(w => w.id === appId || w.app === appId)) {
      btn.classList.toggle('active', window.__win11.activeWindow === appId);
    }
  });
}

/**
 * Check if an app window is already open
 */
function isAppOpen(appId) {
  return window.__win11.openWindows.some(w => w.app === appId);
}

/**
 * Get open window by app ID
 */
function getWindowByApp(appId) {
  return window.__win11.openWindows.find(w => w.app === appId);
}