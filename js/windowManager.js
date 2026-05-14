/* ============================================================
   Window Manager - Complete Windows 11 Window System
   ============================================================ */

(function () {
  'use strict';

  const Z_BASE = 1000;
  let zCounter = Z_BASE;
  let windowIdCounter = 0;
  let dragState = null;
  let resizeState = null;

  /* ============================================================
     Audio System (Web Audio API - no external files)
     ============================================================ */

  let audioCtx = null;

  function getAudioCtx() {
    if (!audioCtx) {
      try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { /* no audio */ }
    }
    return audioCtx;
  }

  function playWindowOpenSound() {
    try {
      const ctx = getAudioCtx();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const now = ctx.currentTime;
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.05);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.start(now);
      osc.stop(now + 0.12);
    } catch (e) { /* silent fail */ }
  }

  function playKonamiSound() {
    try {
      const ctx = getAudioCtx();
      if (!ctx) return;
      const notes = [262, 330, 392, 523, 659, 784, 1047];
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'square';
        const start = ctx.currentTime + i * 0.08;
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.04, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.15);
        osc.start(start);
        osc.stop(start + 0.15);
      });
    } catch (e) { /* silent fail */ }
  }

  function activateOverlay() {
    const overlay = document.getElementById('globalOverlay');
    if (overlay) overlay.classList.add('active');
  }

  function deactivateOverlay() {
    const overlay = document.getElementById('globalOverlay');
    if (overlay) overlay.classList.remove('active');
  }

  /* ============================================================
     Core API
     ============================================================ */

  function createWindow(config) {
    const id = 'win-' + (++windowIdCounter);
    const appId = config.id || config.appId || 'unknown';
    const title = config.title || 'Window';
    const icon = config.icon || '';
    const content = config.content || '';
    const width = Math.min(config.width || 800, window.innerWidth * 0.9);
    const height = Math.min(config.height || 540, (window.innerHeight - 48) * 0.85);
    const x = config.x !== undefined ? config.x : (window.innerWidth - width) / 2 + (Math.random() * 80 - 40);
    const y = config.y !== undefined ? config.y : Math.max(0, (window.innerHeight - 48 - height) / 2) + (Math.random() * 80 - 40);

    const win = document.createElement('div');
    win.className = 'win11-window';
    win.id = id;
    win.dataset.app = appId;

    win.innerHTML = `
      <div class="win-titlebar">
        <div class="win-icon">${icon}</div>
        <span class="win-title">${title}</span>
        <div class="win-controls">
          <button class="win-btn win-minimize" title="Minimize" data-action="minimize">─</button>
          <button class="win-btn win-maximize" title="Maximize" data-action="maximize">
            <span class="maximize-icon">□</span>
            <div class="snap-hint">
              <div class="snap-zones-grid">
                <div class="snap-zone snap-full" data-snap="full" title="Full">
                  <div class="snap-zone-fill"></div>
                </div>
                <div class="snap-zone snap-left" data-snap="left" title="Left Half">
                  <div class="snap-zone-fill"></div>
                </div>
                <div class="snap-zone snap-right" data-snap="right" title="Right Half">
                  <div class="snap-zone-fill"></div>
                </div>
                <div class="snap-zone snap-tl" data-snap="tl" title="Top Left">
                  <div class="snap-zone-fill"></div>
                </div>
                <div class="snap-zone snap-tr" data-snap="tr" title="Top Right">
                  <div class="snap-zone-fill"></div>
                </div>
                <div class="snap-zone snap-bottom" data-snap="bottom" title="Bottom Half">
                  <div class="snap-zone-fill"></div>
                </div>
              </div>
            </div>
          </button>
          <button class="win-btn win-close" title="Close" data-action="close">✕</button>
        </div>
      </div>
      <div class="win-content">${content}</div>
      <div class="win-resize-handle win-resize-n"></div>
      <div class="win-resize-handle win-resize-ne"></div>
      <div class="win-resize-handle win-resize-e"></div>
      <div class="win-resize-handle win-resize-se"></div>
      <div class="win-resize-handle win-resize-s"></div>
      <div class="win-resize-handle win-resize-sw"></div>
      <div class="win-resize-handle win-resize-w"></div>
      <div class="win-resize-handle win-resize-nw"></div>
    `;

    document.getElementById('windows-container').appendChild(win);

    const winData = {
      id,
      appId,
      title,
      icon,
      x,
      y,
      width,
      height,
      zIndex: ++zCounter,
      minimized: false,
      maximized: false,
      focused: true,
      preMax: null
    };

    win.style.cssText = `left:${x}px;top:${y}px;width:${width}px;height:${height}px;z-index:${zCounter}`;

    _store[id] = winData;
    _order.push(id);
    _updateFocusState(id);
    _setupWindowEvents(id);
    _addTaskbarButton(appId, id, icon, title);

    playWindowOpenSound();

    const contentEl = win.querySelector('.win-content');
    if (typeof window.__loadAppContent === 'function') {
      window.__loadAppContent(appId, contentEl);
    } else if (content && typeof content === 'string') {
      contentEl.innerHTML = content;
    }

    return id;
  }

  /* ============================================================
     Window Events
     ============================================================ */

  function _setupWindowEvents(id) {
    const win = document.getElementById(id);
    if (!win) return;

    win.addEventListener('mousedown', () => focusWindow(id));

    const titlebar = win.querySelector('.win-titlebar');
    titlebar.addEventListener('mousedown', e => _onTitlebarMousedown(id, e));
    titlebar.addEventListener('dblclick', () => toggleMaximize(id));

    const controls = win.querySelectorAll('.win-btn');
    controls.forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const action = btn.dataset.action;
        if (action === 'minimize') minimizeWindow(id);
        else if (action === 'maximize') { /* handled by mouseup */ }
        else if (action === 'close') closeWindow(id);
      });
    });

    const snapZones = win.querySelectorAll('.snap-zone');
    snapZones.forEach(zone => {
      zone.addEventListener('click', e => {
        e.stopPropagation();
        const snap = zone.dataset.snap;
        applySnap(id, snap);
        hideSnapHint(id);
      });
    });

    const maximizeBtn = win.querySelector('.win-maximize');
    if (maximizeBtn) {
      maximizeBtn.addEventListener('mouseenter', () => showSnapHint(id));
      maximizeBtn.addEventListener('mouseleave', () => {
        if (!win.matches(':hover')) hideSnapHint(id);
      });
    }

    _setupResizeHandles(id);
  }

  function _setupResizeHandles(id) {
    const win = document.getElementById(id);
    if (!win) return;

    const handles = win.querySelectorAll('.win-resize-handle');
    handles.forEach(h => {
      const dir = Array.from(h.classList).find(c => c.startsWith('win-resize-') && c !== 'win-resize-handle');
      h.addEventListener('mousedown', e => _onResizeMousedown(id, e, dir));
    });
  }

  /* ============================================================
     Dragging
     ============================================================ */

  function _onTitlebarMousedown(id, e) {
    if (e.target.closest('.win-controls')) return;
    const win = document.getElementById(id);
    if (!win) return;
    const d = _store[id];
    if (d.maximized) return;

    dragState = {
      id,
      offsetX: e.clientX - win.offsetLeft,
      offsetY: e.clientY - win.offsetTop
    };

    document.addEventListener('mousemove', _onDrag);
    document.addEventListener('mouseup', _onDragEnd);
    e.preventDefault();
  }

  function _onDrag(e) {
    if (!dragState) return;
    const { id, offsetX, offsetY } = dragState;
    const win = document.getElementById(id);
    if (!win) return;

    let nx = e.clientX - offsetX;
    let ny = e.clientY - offsetY;

    const minY = -(win.offsetHeight - 32);
    const maxX = window.innerWidth - 200;
    const maxY = window.innerHeight - 48;

    nx = Math.max(-(win.offsetWidth - 200), Math.min(maxX, nx));
    ny = Math.max(minY, Math.min(maxY, ny));

    win.style.left = nx + 'px';
    win.style.top = ny + 'px';
    _store[id].x = nx;
    _store[id].y = ny;
  }

  function _onDragEnd() {
    dragState = null;
    document.removeEventListener('mousemove', _onDrag);
    document.removeEventListener('mouseup', _onDragEnd);
  }

  /* ============================================================
     Resizing
     ============================================================ */

  const RESIZE_HANDLERS = {
    n: _resizeN, ne: _resizeNE, e: _resizeE, se: _resizeSE,
    s: _resizeS, sw: _resizeSW, w: _resizeW, nw: _resizeNW
  };

  function _onResizeMousedown(id, e, dir) {
    e.preventDefault();
    e.stopPropagation();
    const win = document.getElementById(id);
    if (!win) return;
    const d = _store[id];
    if (d.maximized) return;

    resizeState = {
      id,
      dir,
      mouseX: e.clientX,
      mouseY: e.clientY,
      x: win.offsetLeft,
      y: win.offsetTop,
      w: win.offsetWidth,
      h: win.offsetHeight
    };

    document.addEventListener('mousemove', _onResize);
    document.addEventListener('mouseup', _onResizeEnd);
  }

  function _onResize(e) {
    if (!resizeState) return;
    const fn = RESIZE_HANDLERS[resizeState.dir];
    if (fn) fn(e);
  }

  function _onResizeEnd() {
    resizeState = null;
    document.removeEventListener('mousemove', _onResize);
    document.removeEventListener('mouseup', _onResizeEnd);
  }

  function _resizeN(e) {
    const { id, mouseX, mouseY, x, y, w, h } = resizeState;
    const win = document.getElementById(id);
    const dy = e.clientY - mouseY;
    const newH = h - dy;
    if (newH >= 200 && e.clientY > 0) {
      win.style.height = newH + 'px';
      win.style.top = (y + dy) + 'px';
      _store[id].height = newH;
      _store[id].y = y + dy;
      resizeState.mouseY = e.clientY;
      resizeState.y = y + dy;
      resizeState.h = newH;
    }
  }

  function _resizeS(e) {
    const { id, mouseY, y, h } = resizeState;
    const win = document.getElementById(id);
    const dy = e.clientY - mouseY;
    const newH = h + dy;
    if (newH >= 200) {
      win.style.height = newH + 'px';
      _store[id].height = newH;
      resizeState.mouseY = e.clientY;
      resizeState.h = newH;
    }
  }

  function _resizeE(e) {
    const { id, mouseX, x, w } = resizeState;
    const win = document.getElementById(id);
    const dx = e.clientX - mouseX;
    const newW = w + dx;
    if (newW >= 320) {
      win.style.width = newW + 'px';
      _store[id].width = newW;
      resizeState.mouseX = e.clientX;
      resizeState.w = newW;
    }
  }

  function _resizeW(e) {
    const { id, mouseX, x, w } = resizeState;
    const win = document.getElementById(id);
    const dx = e.clientX - mouseX;
    const newW = w - dx;
    if (newW >= 320 && e.clientX > 0) {
      win.style.width = newW + 'px';
      win.style.left = (x + dx) + 'px';
      _store[id].width = newW;
      _store[id].x = x + dx;
      resizeState.mouseX = e.clientX;
      resizeState.x = x + dx;
      resizeState.w = newW;
    }
  }

  function _resizeNE(e) {
    _resizeN(e);
    _resizeE(e);
  }

  function _resizeNW(e) {
    _resizeN(e);
    _resizeW(e);
  }

  function _resizeSE(e) {
    _resizeS(e);
    _resizeE(e);
  }

  function _resizeSW(e) {
    _resizeS(e);
    _resizeW(e);
  }

  /* ============================================================
     Snap Layout
     ============================================================ */

  function showSnapHint(id) {
    const win = document.getElementById(id);
    if (!win) return;
    const hint = win.querySelector('.snap-hint');
    if (hint) hint.style.display = 'flex';
  }

  function hideSnapHint(id) {
    const win = document.getElementById(id);
    if (!win) return;
    const hint = win.querySelector('.snap-hint');
    if (hint) hint.style.display = 'none';
  }

  function applySnap(id, snap) {
    const win = document.getElementById(id);
    if (!win) return;
    const d = _store[id];
    const taskbarH = 48;
    const screenW = window.innerWidth;
    const screenH = window.innerHeight - taskbarH;

    let x, y, w, h;

    switch (snap) {
      case 'full':
        x = 0; y = 0; w = screenW; h = screenH;
        break;
      case 'left':
        x = 0; y = 0; w = screenW / 2; h = screenH;
        break;
      case 'right':
        x = screenW / 2; y = 0; w = screenW / 2; h = screenH;
        break;
      case 'tl':
        x = 0; y = 0; w = screenW / 2; h = screenH / 2;
        break;
      case 'tr':
        x = screenW / 2; y = 0; w = screenW / 2; h = screenH / 2;
        break;
      case 'bottom':
        x = 0; y = screenH / 2; w = screenW; h = screenH / 2;
        break;
      default:
        return;
    }

    d.preMax = { x: d.x, y: d.y, width: d.width, height: d.height };
    d.maximized = true;
    win.classList.add('maximized');
    win.style.left = x + 'px';
    win.style.top = y + 'px';
    win.style.width = w + 'px';
    win.style.height = h + 'px';
    _updateMaximizeIcon(win, true);
  }

  /* ============================================================
     Minimize / Maximize / Close
     ============================================================ */

  function minimizeWindow(id) {
    const win = document.getElementById(id);
    const d = _store[id];
    if (!win || !d) return;

    win.classList.add('minimizing');
    setTimeout(() => {
      win.style.visibility = 'hidden';
      win.classList.remove('minimizing');
      win.classList.add('minimized');
      d.minimized = true;
      _removeFocusFromAll();
      _updateTaskbarButton(d.appId, id, 'minimized');
    }, 200);
  }

  function restoreWindow(id) {
    const win = document.getElementById(id);
    const d = _store[id];
    if (!win || !d) return;

    win.style.visibility = 'visible';
    win.classList.remove('minimized');
    d.minimized = false;
    focusWindow(id);
    _updateTaskbarButton(d.appId, id, 'active');
  }

  function toggleMaximize(id) {
    const win = document.getElementById(id);
    const d = _store[id];
    if (!win || !d) return;

    if (d.maximized) {
      if (d.preMax) {
        win.classList.remove('maximized');
        win.style.left = d.preMax.x + 'px';
        win.style.top = d.preMax.y + 'px';
        win.style.width = d.preMax.width + 'px';
        win.style.height = d.preMax.height + 'px';
        d.x = d.preMax.x;
        d.y = d.preMax.y;
        d.width = d.preMax.width;
        d.height = d.preMax.height;
        d.maximized = false;
      }
      _updateMaximizeIcon(win, false);
    } else {
      d.preMax = { x: d.x, y: d.y, width: d.width, height: d.height };
      const taskbarH = 48;
      win.classList.add('maximized');
      win.style.left = '0px';
      win.style.top = '0px';
      win.style.width = window.innerWidth + 'px';
      win.style.height = (window.innerHeight - taskbarH) + 'px';
      d.maximized = true;
      _updateMaximizeIcon(win, true);
    }
  }

  function _updateMaximizeIcon(win, maximized) {
    const icon = win.querySelector('.maximize-icon');
    if (icon) {
      icon.textContent = maximized ? '❐' : '□';
    }
  }

  function closeWindow(id) {
    const win = document.getElementById(id);
    const d = _store[id];
    if (!win) return;

    win.classList.add('closing');
    setTimeout(() => {
      win.remove();
      delete _store[id];
      const idx = _order.indexOf(id);
      if (idx !== -1) _order.splice(idx, 1);
      _removeTaskbarButton(id);
      _updateFocusToTop();
    }, 150);
  }

  /* ============================================================
     Focus / Z-Index
     ============================================================ */

  function focusWindow(id) {
    const win = document.getElementById(id);
    const d = _store[id];
    if (!win || !d) return;

    if (d.minimized) {
      restoreWindow(id);
      return;
    }

    _removeFocusFromAll();
    d.zIndex = ++zCounter;
    d.focused = true;
    win.style.zIndex = d.zIndex;
    win.classList.add('focused');
    win.classList.remove('unfocused');

    win.classList.remove('focus-pulse');
    void win.offsetWidth; // reflow to restart animation
    win.classList.add('focus-pulse');

    const btn = document.querySelector(`.taskbar-app-btn[data-window="${id}"]`);
    if (btn) btn.classList.add('active');

    _updateTaskbarButton(d.appId, id, 'active');

    if (d.maximized) {
      _updateMaximizeIcon(win, true);
    }
  }

  function _removeFocusFromAll() {
    Object.keys(_store).forEach(wid => {
      const w = document.getElementById(wid);
      if (w) {
        w.classList.remove('focused');
        w.classList.add('unfocused');
        _store[wid].focused = false;
      }
      const btn = document.querySelector(`.taskbar-app-btn[data-window="${wid}"]`);
      if (btn) btn.classList.remove('active');
    });
  }

  function _updateFocusToTop() {
    if (_order.length === 0) return;
    const topId = _order[_order.length - 1];
    focusWindow(topId);
  }

  function _updateFocusState(id) {
    _removeFocusFromAll();
    const win = document.getElementById(id);
    if (win) {
      win.classList.add('focused');
      win.classList.remove('unfocused');
    }
    _store[id].focused = true;
    _store[id].zIndex = ++zCounter;
    if (win) win.style.zIndex = _store[id].zIndex;
  }

  /* ============================================================
     Taskbar Integration
     ============================================================ */

  function _addTaskbarButton(appId, windowId, icon, title) {
    const center = document.getElementById('taskbar-center');
    if (!center) return;

    let existing = center.querySelector(`.taskbar-app-btn[data-app="${appId}"]`);
    if (existing) {
      existing.dataset.window = windowId;
      existing.title = title;
      return;
    }

    const btn = document.createElement('div');
    btn.className = 'taskbar-app-btn active';
    btn.dataset.app = appId;
    btn.dataset.window = windowId;
    btn.title = title;
    btn.innerHTML = `<span class="tbi-icon">${icon}</span>`;

    btn.addEventListener('click', () => {
      const d = _store[windowId];
      if (!d) return;

      if (d.minimized) {
        restoreWindow(windowId);
      } else if (d.focused) {
        minimizeWindow(windowId);
      } else {
        focusWindow(windowId);
      }
    });

    btn.addEventListener('mouseenter', e => _showTaskbarTooltip(e.target, title));
    btn.addEventListener('mouseleave', _hideTaskbarTooltip);

    center.appendChild(btn);
  }

  function _removeTaskbarButton(windowId) {
    const btn = document.querySelector(`.taskbar-app-btn[data-window="${windowId}"]`);
    if (btn) {
      const appId = btn.dataset.app;
      btn.remove();
      const stillOpen = Object.values(_store).some(d => d.appId === appId);
      if (stillOpen) {
        const firstWin = Object.values(_store).find(d => d.appId === appId);
        if (firstWin) {
          _addTaskbarButton(appId, firstWin.id, firstWin.icon, firstWin.title);
        }
      }
    }
  }

  function _updateTaskbarButton(appId, windowId, state) {
    const btn = document.querySelector(`.taskbar-app-btn[data-app="${appId}"]`);
    if (btn) {
      btn.classList.toggle('active', state === 'active');
      btn.classList.toggle('minimized', state === 'minimized');
    }
  }

  function _showTaskbarTooltip(target, text) {
    _hideTaskbarTooltip();
    const tip = document.createElement('div');
    tip.id = 'win11-taskbar-tip';
    tip.className = 'taskbar-tooltip';
    tip.textContent = text;
    document.body.appendChild(tip);

    const rect = target.getBoundingClientRect();
    tip.style.left = (rect.left + (rect.width / 2) - (tip.offsetWidth / 2)) + 'px';
    tip.style.bottom = '54px';
    requestAnimationFrame(() => tip.classList.add('visible'));
  }

  function _hideTaskbarTooltip() {
    const tip = document.getElementById('win11-taskbar-tip');
    if (tip) {
      tip.classList.remove('visible');
      setTimeout(() => tip.remove(), 80);
    }
  }

  /* ============================================================
     Public API
     ============================================================ */

  function openApp(appId, config) {
    const win = Object.values(_store).find(d => d.appId === appId);
    if (win) {
      focusWindow(win.id);
      if (win.minimized) restoreWindow(win.id);
      return win.id;
    }

    config = config || {};
    config.id = appId;
    return createWindow(config);
  }

  function closeApp(appId) {
    const wins = Object.values(_store).filter(d => d.appId === appId);
    wins.forEach(w => closeWindow(w.id));
  }

  function minimizeApp(appId) {
    const win = Object.values(_store).find(d => d.appId === appId);
    if (win) minimizeWindow(win.id);
  }

  function focusApp(appId) {
    const win = Object.values(_store).find(d => d.appId === appId);
    if (win) focusWindow(win.id);
  }

  /* ============================================================
     Window State Store
     ============================================================ */

  const _store = {};
  const _order = [];

  /* ============================================================
     Global Click - Close context menus / deselect
     ============================================================ */

  document.addEventListener('mousedown', e => {
    if (!e.target.closest('.win11-window')) {
      if (!e.target.closest('.snap-hint')) {
        _order.forEach(id => {
          if (_store[id]) {
            const win = document.getElementById(id);
            if (win && win.querySelector('.snap-hint')) {
              hideSnapHint(id);
            }
          }
        });
      }
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      _order.forEach(id => {
        const win = document.getElementById(id);
        if (win) {
          const hint = win.querySelector('.snap-hint');
          if (hint) hint.style.display = 'none';
        }
      });
    }
  });

  /* ============================================================
     Expose to Global
     ============================================================ */

  window.__win11 = window.__win11 || {};
  window.__win11.createWindow = createWindow;
  window.__win11.focusWindow = focusWindow;
  window.__win11.minimizeWindow = minimizeWindow;
  window.__win11.restoreWindow = restoreWindow;
  window.__win11.toggleMaximize = toggleMaximize;
  window.__win11.closeWindow = closeWindow;
  window.__win11.openApp = openApp;
  window.__win11.closeApp = closeApp;
  window.__win11.minimizeApp = minimizeApp;
  window.__win11.focusApp = focusApp;
  window.__win11._getStore = () => _store;

})();