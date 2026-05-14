/* ============================================================
   Smart System Manager - Global State for Portfolio
   Manages: Theme, Wallpaper, Brightness, Volume, WiFi, Battery
   ============================================================ */

(function () {
  'use strict';

  /* ============================================================
     Wallpaper Definitions
     ============================================================ */

  const WALLPAPERS = [
    {
      id: 'abstract-dark',
      name: 'Abstract Dark',
      thumb: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=400&q=60',
      url: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=1920&q=80',
      credit: 'Unsplash'
    },
    {
      id: 'mountain-peak',
      name: 'Mountain Peak',
      thumb: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=60',
      url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&q=80',
      credit: 'Unsplash'
    },
    {
      id: 'cyberpunk-city',
      name: 'Cyberpunk City',
      thumb: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=60',
      url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80',
      credit: 'Unsplash'
    },
    {
      id: 'bloom',
      name: 'Bloom',
      css: `radial-gradient(ellipse at 20% 30%, #c471ed 0%, #f64f59 30%, #12c2e9 60%, #0f0c29 100%)`
    },
    {
      id: 'synthwave',
      name: 'Synthwave',
      css: `linear-gradient(180deg, #0f0c29 0%, #302b63 25%, #24243e 50%, #e94560 75%, #ff6f91 100%)`
    },
    {
      id: 'minimal-dark',
      name: 'Minimal Dark',
      css: `linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #16162a 100%)`
    }
  ];

  /* ============================================================
     State
     ============================================================ */

  const state = {
    theme: localStorage.getItem('win11-theme') || 'dark',
    wallpaper: localStorage.getItem('win11-wallpaper') || 'abstract-dark',
    wallpaperCss: localStorage.getItem('win11-wallpaper-css') || '',
    brightness: parseFloat(localStorage.getItem('win11-brightness') || '0'),
    volume: parseInt(localStorage.getItem('win11-volume') || '65'),
    wifiConnected: localStorage.getItem('win11-wifi') !== 'off',
    hotspotEnabled: localStorage.getItem('win11-hotspot') === 'on',
    batterySaver: localStorage.getItem('win11-battery-saver') === 'on',
    nightLight: localStorage.getItem('win11-night-light') === 'on'
  };

  /* ============================================================
     Apply Theme (Dark / Light)
     ============================================================ */

  function applyTheme(theme) {
    const r = document.documentElement;
    if (theme === 'light') {
      r.style.setProperty('--win11-bg-glass', 'rgba(243, 243, 243, 0.85)');
      r.style.setProperty('--win11-bg-glass-light', 'rgba(255, 255, 255, 0.92)');
      r.style.setProperty('--win11-bg-taskbar', 'rgba(243, 243, 243, 0.82)');
      r.style.setProperty('--win11-bg-window', 'rgba(243, 243, 243, 0.85)');
      r.style.setProperty('--win11-bg-elevated', 'rgba(255, 255, 255, 0.92)');
      r.style.setProperty('--win11-text', '#1a1a1a');
      r.style.setProperty('--win11-text-secondary', 'rgba(0, 0, 0, 0.6)');
      r.style.setProperty('--win11-text-tertiary', 'rgba(0, 0, 0, 0.38)');
      r.style.setProperty('--win11-border', '1px solid rgba(0, 0, 0, 0.12)');
      r.style.setProperty('--win11-shadow', '0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08)');
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    } else {
      r.style.setProperty('--win11-bg-glass', 'rgba(32, 32, 32, 0.75)');
      r.style.setProperty('--win11-bg-glass-light', 'rgba(243, 243, 243, 0.85)');
      r.style.setProperty('--win11-bg-taskbar', 'rgba(32, 32, 32, 0.82)');
      r.style.setProperty('--win11-bg-window', 'rgba(32, 32, 32, 0.78)');
      r.style.setProperty('--win11-bg-elevated', 'rgba(45, 45, 45, 0.85)');
      r.style.setProperty('--win11-text', '#ffffff');
      r.style.setProperty('--win11-text-secondary', 'rgba(255, 255, 255, 0.6)');
      r.style.setProperty('--win11-text-tertiary', 'rgba(255, 255, 255, 0.38)');
      r.style.setProperty('--win11-border', '1px solid rgba(255, 255, 255, 0.12)');
      r.style.setProperty('--win11-shadow', '0 8px 32px rgba(0, 0, 0, 0.28), 0 2px 8px rgba(0, 0, 0, 0.18)');
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    }
    state.theme = theme;
    localStorage.setItem('win11-theme', theme);
  }

  /* ============================================================
     Apply Wallpaper
     ============================================================ */

  function applyWallpaper(id) {
    const desktop = document.getElementById('desktop');
    if (!desktop) return;

    const wp = WALLPAPERS.find(w => w.id === id);
    if (!wp) return;

    if (wp.url) {
      desktop.style.background = `url('${wp.url}') center/cover no-repeat`;
      desktop.style.transition = 'background 0.5s ease';
      localStorage.setItem('win11-wallpaper', id);
      localStorage.removeItem('win11-wallpaper-css');
    } else if (wp.css) {
      desktop.style.background = wp.css;
      desktop.style.backgroundSize = 'cover';
      desktop.style.backgroundPosition = 'center';
      desktop.style.transition = 'background 0.5s ease';
      localStorage.setItem('win11-wallpaper-css', wp.css);
      localStorage.setItem('win11-wallpaper', id);
    }

    state.wallpaper = id;
    document.querySelectorAll('.wp-swatch').forEach(s => {
      s.classList.toggle('active', s.dataset.id === id);
    });
    document.querySelectorAll('.cv-wallpaper-thumb').forEach(t => {
      t.classList.toggle('active', t.dataset.id === id);
    });
  }

  function applyCustomWallpaper(color) {
    const desktop = document.getElementById('desktop');
    if (!desktop) return;
    desktop.style.background = `linear-gradient(135deg, ${color} 0%, ${adjustColor(color, -30)} 50%, ${adjustColor(color, -60)} 100%)`;
    desktop.style.backgroundSize = 'cover';
    desktop.style.backgroundPosition = 'center';
    desktop.style.transition = 'background 0.5s ease';
    state.wallpaper = 'custom';
    localStorage.setItem('win11-wallpaper', 'custom');
    localStorage.setItem('win11-custom-color', color);
  }

  /* ============================================================
     Apply Brightness (Dim Overlay)
     ============================================================ */

  function applyBrightness(value) {
    let overlay = document.getElementById('brightnessOverlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'brightnessOverlay';
      overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0);pointer-events:none;z-index:9997;transition:background 200ms ease';
      document.body.appendChild(overlay);
    }
    overlay.style.background = `rgba(0, 0, 0, ${value})`;
    state.brightness = value;
    localStorage.setItem('win11-brightness', value);
  }

  /* ============================================================
     Apply Volume + HUD
     ============================================================ */

  let volumeHideTimer = null;

  function applyVolume(value) {
    state.volume = value;
    localStorage.setItem('win11-volume', value);
    showVolumeHUD(value);
    updateTrayVolumeIcon(value);
  }

  function showVolumeHUD(level) {
    let hud = document.getElementById('volumeHud');
    if (!hud) {
      hud = document.createElement('div');
      hud.id = 'volumeHud';
      hud.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0.8);
        background: rgba(32, 32, 32, 0.95);
        backdrop-filter: blur(30px);
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 12px;
        padding: 24px 32px;
        z-index: 9998;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
        opacity: 0;
        pointer-events: none;
        transition: opacity 150ms ease, transform 200ms cubic-bezier(0.34,1.56,0.64,1);
        box-shadow: 0 8px 32px rgba(0,0,0,0.3);
      `;
      document.body.appendChild(hud);
    }

    const icon = level === 0 ? volumeOffSVG() : level < 50 ? volumeMedSVG() : volumeHighSVG();

    hud.innerHTML = `
      <div style="width:40px;height:40px;color:rgba(255,255,255,0.9)">${icon}</div>
      <div style="width:120px;height:4px;background:rgba(255,255,255,0.1);border-radius:2px;overflow:hidden">
        <div style="width:${level}%;height:100%;background:linear-gradient(90deg,#667eea,#764ba2);border-radius:2px;transition:width 150ms ease"></div>
      </div>
      <div style="font-size:12px;color:rgba(255,255,255,0.5);text-align:center">Volume<br><strong style="color:#fff;font-size:16px">${level}%</strong></div>
    `;

    hud.style.opacity = '1';
    hud.style.transform = 'translate(-50%, -50%) scale(1)';

    clearTimeout(volumeHideTimer);
    volumeHideTimer = setTimeout(() => {
      hud.style.opacity = '0';
      hud.style.transform = 'translate(-50%, -50%) scale(0.8)';
    }, 1800);
  }

  function volumeHighSVG() {
    return `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>`;
  }

  function volumeMedSVG() {
    return `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>`;
  }

  function volumeOffSVG() {
    return `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>`;
  }

  /* ============================================================
     Apply Battery Saver (reduce / remove backdrop-filter)
     ============================================================ */

  function applyBatterySaver(enabled) {
    if (enabled) {
      document.querySelectorAll('.win11-window, .win-content, #startMenu, #actionCenter, .win11-window .win-titlebar').forEach(el => {
        el.style.transition = 'backdrop-filter 300ms ease';
      });
      document.querySelectorAll('.win11-window, #startMenu, #actionCenter').forEach(el => {
        el.style.backdropFilter = 'none';
        el.style.webkitBackdropFilter = 'none';
      });
      document.body.classList.add('battery-saver');
      if (typeof showToast === 'function') {
        showToast('Battery Saver enabled — performance optimized', 'info', '🔋');
      }
    } else {
      document.querySelectorAll('.win11-window, #startMenu, #actionCenter').forEach(el => {
        el.style.backdropFilter = '';
        el.style.webkitBackdropFilter = '';
      });
      document.body.classList.remove('battery-saver');
    }
    state.batterySaver = enabled;
    localStorage.setItem('win11-battery-saver', enabled ? 'on' : 'off');
  }

  /* ============================================================
     Night Light (warm color overlay)
     ============================================================ */

  function applyNightLight(enabled) {
    let overlay = document.getElementById('nightLightOverlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'nightLightOverlay';
      overlay.style.cssText = 'position:fixed;inset:0;background:rgba(255,160,50,0);pointer-events:none;z-index:9996;transition:background 500ms ease;mix-blend-mode:overlay;pointer-events:none';
      document.body.appendChild(overlay);
    }
    overlay.style.background = enabled ? 'rgba(255, 160, 50, 0.12)' : 'rgba(255, 160, 50, 0)';
    state.nightLight = enabled;
    localStorage.setItem('win11-night-light', enabled ? 'on' : 'off');
  }

  /* ============================================================
     WiFi Toggle
     ============================================================ */

  function applyWifi(connected) {
    state.wifiConnected = connected;
    localStorage.setItem('win11-wifi', connected ? 'on' : 'off');
    updateTrayWifiIcon(connected);
    if (typeof showToast === 'function') {
      if (connected) {
        showToast('Wi-Fi connected', 'success', '📶');
      } else {
        showToast('Wi-Fi disconnected', 'warning', '📵');
      }
    }
  }

  function updateTrayWifiIcon(connected) {
    const icons = document.querySelectorAll('.tray-icon[title="Network"], .tray-icon[title="Wi-Fi"]');
    icons.forEach(icon => {
      const svg = icon.querySelector('svg');
      if (!svg) return;
      if (connected) {
        svg.innerHTML = `<path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3a4.24 4.24 0 0 0-6-6l-3 3zm4-12l2 2c2.76-2.76 7.24-2.76 10 0l2-2C23.07 1.37 14.42 1.37 5 7l2 2c7.07-7.07 16.92-7.07 23 0z" fill="currentColor" opacity="0.9"/>`;
        icon.title = 'Wi-Fi';
      } else {
        svg.innerHTML = `<path d="M22.99 9C19.15 5.16 13.8 3.76 8.84 4.78l2.52 2.52c3.47-.17 6.99 1.05 9.63 3.7l2-2zm-4 4c-1.29-1.29-2.84-2.13-4.49-2.56l3.53 3.53.96-.97zM2 3.05L5.07 6.1C3.6 6.82 2.22 7.78 1 9l2 2c1.02-1.02 2.17-1.85 3.39-2.53l2.54 2.54C7.42 11.76 6 13.43 6 15.5c0 3.19 2.58 5.79 5.77 5.78 2.22-.01 4.27-.87 5.88-2.32l2.42 2.42C19.36 23.04 15.72 24 12 24c-3.72 0-7.36-.96-10.49-2.87L3.51 23.2c.66.21 1.34.32 2.02.32 4.46 0 8.48-2.08 11.19-5.31L19 17l1.41 1.41L12 6.9 2 16.9 3.41 18.31 12 9.71l4.97 4.97L18.4 13.25 12 6.86l-1.42-1.41L12 4.41 4.2 12.21 2.94 10.95l3.66-3.66L2 3.05z" fill="currentColor" opacity="0.4"/>`;
        icon.title = 'Wi-Fi (disconnected)';
      }
    });
  }

  function updateTrayVolumeIcon(level) {
    // Volume icon on tray is static - we update the SVG here
    const icons = document.querySelectorAll('.tray-icon[title="Volume"]');
    icons.forEach(icon => {
      const svg = icon.querySelector('svg');
      if (!svg) return;
      if (level === 0) {
        svg.innerHTML = `<path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h3l5 5V4L8 9H5zm11.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" fill="currentColor" opacity="0.9"/>`;
      } else {
        svg.innerHTML = `<path d="M3 9v6h3l4 4V1L6 9H3zm8.5 1.5c.9-.9.9-2.4 0-3.3-.9-.9-2.4-.9-3.3 0-.4.4-.6.9-.6 1.4s.2 1 .6 1.4c.9.9 2.4.9 3.3 0zm.5 2c.7-.7.7-1.9 0-2.6-.7-.7-1.9-.7-2.6 0-.3.3-.4.6-.4 1s.1.7.4 1c.7.7 1.9.7 2.6 0z" fill="currentColor" opacity="0.9"/>`;
      }
    });
  }

  /* ============================================================
     Hotspot Toggle
     ============================================================ */

  function applyHotspot(enabled) {
    state.hotspotEnabled = enabled;
    localStorage.setItem('win11-hotspot', enabled ? 'on' : 'off');
    const title = enabled ? 'Hotspot On' : 'Hotspot Off';
    const icon = enabled ? '🔗' : '🔗';
    if (typeof showToast === 'function') {
      showToast(`${title} — ${enabled ? 'Your PC is now sharing internet' : 'Hotspot turned off'}`, enabled ? 'success' : 'info', icon);
    }
  }

  /* ============================================================
     Utility: Darken / lighten a hex color
     ============================================================ */

  function adjustColor(hex, amount) {
    const num = parseInt(hex.replace('#', ''), 16);
    const r = Math.min(255, Math.max(0, (num >> 16) + amount));
    const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + amount));
    const b = Math.min(255, Math.max(0, (num & 0x0000FF) + amount));
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  /* ============================================================
     Init: Apply all saved state on load
     ============================================================ */

  function init() {
    applyTheme(state.theme);

    if (state.wallpaper === 'custom') {
      const customColor = localStorage.getItem('win11-custom-color') || '#667eea';
      applyCustomWallpaper(customColor);
    } else {
      applyWallpaper(state.wallpaper);
    }

    applyBrightness(state.brightness);
    updateTrayWifiIcon(state.wifiConnected);
    updateTrayVolumeIcon(state.volume);

    if (state.batterySaver) applyBatterySaver(true);
    if (state.nightLight) applyNightLight(true);

    document.addEventListener('click', () => {
      const hud = document.getElementById('volumeHud');
      if (hud && parseFloat(hud.style.opacity) > 0) {
        setTimeout(() => {
          if (parseFloat(hud.style.opacity) > 0) {
            hud.style.opacity = '0';
            hud.style.transform = 'translate(-50%, -50%) scale(0.8)';
          }
        }, 200);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  /* ============================================================
     Expose Public API
     ============================================================ */

  window.__win11 = window.__win11 || {};
  window.__win11.system = {
    state,
    WALLPAPERS,
    applyTheme,
    applyWallpaper,
    applyCustomWallpaper,
    applyBrightness,
    applyVolume,
    showVolumeHUD,
    applyBatterySaver,
    applyNightLight,
    applyWifi,
    applyHotspot,
    adjustColor
  };

})();