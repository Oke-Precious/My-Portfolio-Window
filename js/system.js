/**
 * ================================================
 * SYSTEM.JS - Smart System Features Manager
 * ================================================
 * Manages Dark/Light Mode, Brightness, Volume, 
 * Battery Saver, WiFi, and Wallpaper preferences
 */

class SmartSystem {
  constructor() {
    this.mode = localStorage.getItem('theme-mode') || 'light';
    this.brightness = localStorage.getItem('brightness') || 75;
    this.volume = localStorage.getItem('volume') || 65;
    this.wallpaper = localStorage.getItem('wallpaper') || 'abstract';
    this.batterySaver = localStorage.getItem('battery-saver') === 'true' || false;
    this.wifiConnected = localStorage.getItem('wifi-connected') === 'true' || true;
    this.hotspotEnabled = localStorage.getItem('hotspot-enabled') === 'true' || false;

    this.volumeHUDTimeout = null;

    this.init();
  }

  /**
   * Initialize all system features
   */
  init() {
    this.applyTheme();
    this.applyBrightness();
    this.applyWallpaper();
    this.attachEventListeners();
    this.updateConnectivityStatus();
  }

  /**
   * ================================================
   * DARK/LIGHT MODE MANAGEMENT
   * ================================================
   */

  applyTheme() {
    const root = document.documentElement;
    if (this.mode === 'dark') {
      root.classList.add('dark-mode');
    } else {
      root.classList.remove('dark-mode');
    }
  }

  toggleTheme() {
    this.mode = this.mode === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme-mode', this.mode);
    this.applyTheme();
    this.showToast(`${this.mode.charAt(0).toUpperCase() + this.mode.slice(1)} mode enabled`);
  }

  /**
   * ================================================
   * BRIGHTNESS MANAGEMENT
   * ================================================
   */

  applyBrightness() {
    const overlay = document.getElementById('brightnessOverlay');
    if (overlay) {
      const brightnessPercent = 100 - parseInt(this.brightness);
      const opacityValue = (brightnessPercent / 100) * 0.5; // Max 50% black
      overlay.style.backgroundColor = `rgba(0, 0, 0, ${opacityValue})`;
    }
  }

  setBrightness(value) {
    this.brightness = value;
    localStorage.setItem('brightness', this.brightness);
    this.applyBrightness();
  }

  /**
   * ================================================
   * VOLUME MANAGEMENT
   * ================================================
   */

  setVolume(value) {
    this.volume = value;
    localStorage.setItem('volume', this.volume);
    this.showVolumeHUD();
  }

  showVolumeHUD() {
    const hud = document.getElementById('volumeHUD');
    const fill = document.getElementById('volumeHUD-fill');
    const text = document.getElementById('volumeHUD-text');

    if (hud && fill && text) {
      fill.style.width = `${this.volume}%`;
      text.textContent = `${this.volume}%`;
      hud.classList.add('visible');

      // Clear previous timeout
      if (this.volumeHUDTimeout) {
        clearTimeout(this.volumeHUDTimeout);
      }

      // Hide after 1.5 seconds
      this.volumeHUDTimeout = setTimeout(() => {
        hud.classList.remove('visible');
      }, 1500);
    }
  }

  /**
   * ================================================
   * WALLPAPER MANAGEMENT
   * ================================================
   */

  applyWallpaper() {
    const desktop = document.getElementById('desktop');
    if (desktop) {
      desktop.className = '';
      desktop.classList.add(`wallpaper-${this.wallpaper}`);
    }
  }

  setWallpaper(wallpaper) {
    this.wallpaper = wallpaper;
    localStorage.setItem('wallpaper', this.wallpaper);
    this.applyWallpaper();
    this.showToast(`Wallpaper changed to ${this.wallpaperName(wallpaper)}`);
  }

  wallpaperName(wallpaper) {
    const names = {
      'abstract': 'Abstract Dark',
      'mountain': 'Mountain Peak',
      'cyberpunk': 'Cyberpunk City'
    };
    return names[wallpaper] || wallpaper;
  }

  /**
   * ================================================
   * BATTERY SAVER MODE
   * ================================================
   */

  toggleBatterySaver() {
    this.batterySaver = !this.batterySaver;
    localStorage.setItem('battery-saver', this.batterySaver);

    const root = document.documentElement;
    const windowsContainer = document.getElementById('windows-container');
    const taskbar = document.getElementById('taskbar');
    const startMenu = document.getElementById('startMenu');

    if (this.batterySaver) {
      root.classList.add('battery-saver-on');
      if (windowsContainer) windowsContainer.classList.add('battery-saver-on');
      if (taskbar) taskbar.classList.add('battery-saver-on');
      if (startMenu) startMenu.classList.add('battery-saver-on');
      this.showToast('Battery Saver ON - Backdrop filters disabled');
    } else {
      root.classList.remove('battery-saver-on');
      if (windowsContainer) windowsContainer.classList.remove('battery-saver-on');
      if (taskbar) taskbar.classList.remove('battery-saver-on');
      if (startMenu) startMenu.classList.remove('battery-saver-on');
      this.showToast('Battery Saver OFF');
    }
  }

  /**
   * ================================================
   * WIFI/HOTSPOT MANAGEMENT
   * ================================================
   */

  toggleWifi() {
    this.wifiConnected = !this.wifiConnected;
    localStorage.setItem('wifi-connected', this.wifiConnected);
    this.updateConnectivityStatus();
    this.showToast(
      this.wifiConnected ? '✓ WiFi connected' : '✗ WiFi disconnected'
    );
  }

  toggleHotspot() {
    this.hotspotEnabled = !this.hotspotEnabled;
    localStorage.setItem('hotspot-enabled', this.hotspotEnabled);
    this.updateConnectivityStatus();
    this.showToast(
      this.hotspotEnabled ? '✓ Hotspot enabled' : '✗ Hotspot disabled'
    );
  }

  updateConnectivityStatus() {
    const wifiIcon = document.getElementById('wifiStatusIcon');
    const hotspotIcon = document.getElementById('hotspotStatusIcon');

    if (wifiIcon) {
      if (this.wifiConnected) {
        wifiIcon.classList.remove('disconnected');
        wifiIcon.classList.add('connected');
        wifiIcon.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/></svg>';
      } else {
        wifiIcon.classList.remove('connected');
        wifiIcon.classList.add('disconnected');
        wifiIcon.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M2.5 3L1 4.5 3 6.5 1 8.5 2.5 10 4 8.5 5.5 10 7 8.5 5 6.5 7 4.5 5.5 3 4 4.5 2.5 3m6 0l1.5 1.5-2 2 2 2-1.5 1.5-1.5-1.5-1.5 1.5-1.5-1.5 2-2-2-2 1.5-1.5 1.5 1.5 1.5-1.5m8 0l1.5 1.5-2 2 2 2-1.5 1.5-1.5-1.5-1.5 1.5-1.5-1.5 2-2-2-2 1.5-1.5 1.5 1.5 1.5-1.5m8 0l1.5 1.5-2 2 2 2-1.5 1.5-1.5-1.5-1.5 1.5-1.5-1.5 2-2-2-2 1.5-1.5 1.5 1.5 1.5-1.5"/></svg>';
      }
    }

    if (hotspotIcon) {
      if (this.hotspotEnabled) {
        hotspotIcon.classList.remove('disconnected');
        hotspotIcon.classList.add('connected');
        hotspotIcon.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7.5 2C11.6 2 15 5.4 15 9.5h-2c0-3-2.5-5.5-5.5-5.5S1.5 6.5 1.5 9.5H-.5C-.5 5.4 3.4 2 7.5 2m0 2c-2.2 0-4 1.8-4 4h2c0-1.1.9-2 2-2s2 .9 2 2h2c0-2.2-1.8-4-4-4m0 6c-.6 0-1 .4-1 1s.4 1 1 1 1-.4 1-1-.4-1-1-1z"/></svg>';
      } else {
        hotspotIcon.classList.remove('connected');
        hotspotIcon.classList.add('disconnected');
        hotspotIcon.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M5 5l1.41 1.41C4.2 8 2.5 10.2 2.5 13h2c0-2.2 1.2-4.2 2.9-5.2L9 10c-1.3.9-2 2.3-2 3.9h2c0-1 .6-2 1.4-2.5L13 14c-1 1.3-2.6 2-4.4 2-3.9 0-7-3.1-7-7 0-1.9.8-3.7 2.1-4.9zm10 0l1.41 1.41c-2.2 2.2-3.6 5.2-3.6 8.6h2c0-2.9 1-5.6 2.9-7.6l1.4 1.4c-1.3.9-2.2 2.4-2.2 4.2h2c0-1.5.6-2.9 1.6-3.9l1.4 1.4c-1 1.3-1.6 2.9-1.6 4.5h2c0-3 1-5.8 2.7-8.1l1.4 1.4c-1.3 1.3-2.1 3.1-2.1 5.1h2c0-3.8 1.5-7.2 3.9-9.7z"/></svg>';
      }
    }
  }

  /**
   * ================================================
   * UI EVENT LISTENERS
   * ================================================
   */

  attachEventListeners() {
    // Dark/Light Mode Toggle
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleTheme();
        themeToggle.classList.toggle('active');
      });
      if (this.mode === 'dark') themeToggle.classList.add('active');
    }

    // Brightness Slider
    const brightnessSlider = document.getElementById('settingsBrightnessSlider');
    if (brightnessSlider) {
      brightnessSlider.value = this.brightness;
      brightnessSlider.addEventListener('input', (e) => this.setBrightness(e.target.value));
    }

    // Volume Slider
    const volumeSlider = document.getElementById('settingsVolumeSlider');
    if (volumeSlider) {
      volumeSlider.value = this.volume;
      volumeSlider.addEventListener('input', (e) => this.setVolume(e.target.value));
    }

    // Wallpaper Selection
    document.querySelectorAll('.wallpaper-item').forEach(item => {
      const wallpaperType = item.dataset.wallpaper;
      if (wallpaperType === this.wallpaper) {
        item.classList.add('active');
      }
      item.addEventListener('click', () => {
        document.querySelectorAll('.wallpaper-item').forEach(w => w.classList.remove('active'));
        item.classList.add('active');
        this.setWallpaper(wallpaperType);
      });
    });

    // Battery Saver Toggle
    const batterySaverToggle = document.getElementById('batterySaverToggle');
    if (batterySaverToggle) {
      batterySaverToggle.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleBatterySaver();
        batterySaverToggle.classList.toggle('active');
      });
      if (this.batterySaver) batterySaverToggle.classList.add('active');
    }

    // WiFi Toggle
    const wifiToggle = document.getElementById('wifiToggle');
    if (wifiToggle) {
      wifiToggle.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleWifi();
        wifiToggle.classList.toggle('active');
      });
      if (this.wifiConnected) wifiToggle.classList.add('active');
    }

    // Hotspot Toggle
    const hotspotToggle = document.getElementById('hotspotToggle');
    if (hotspotToggle) {
      hotspotToggle.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleHotspot();
        hotspotToggle.classList.toggle('active');
      });
      if (this.hotspotEnabled) hotspotToggle.classList.add('active');
    }
  }

  /**
   * ================================================
   * UTILITY METHODS
   * ================================================
   */

  showToast(message) {
    const toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toastContainer.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => {
      toast.classList.add('visible');
    });

    // Remove after 2 seconds
    setTimeout(() => {
      toast.classList.remove('visible');
      setTimeout(() => toast.remove(), 300);
    }, 2000);
  }
}

// Initialize Smart System when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.smartSystem = new SmartSystem();
});
