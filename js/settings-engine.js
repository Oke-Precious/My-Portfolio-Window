/**
 * Settings Engine - Centralized settings management for Windows 11 Portfolio
 * Loads and applies all saved settings on page load
 */

(function() {
  'use strict';

  // Initialize global settings namespace
  if (!window.__win11) {
    window.__win11 = {};
  }

  // Default settings
  const DEFAULT_SETTINGS = {
    brightness: 100,
    theme: 'dark',           // 'dark' or 'light'
    nightLight: false,
    volume: 70,
    volumeMuted: false,
    wifiEnabled: true,
    wifiConnectedNetwork: 'HomeNetwork_5G',
    hotspotEnabled: false,
    airplaneModeEnabled: false,
    batterySaver: false,
    powerMode: 'balanced',   // 'efficiency', 'balanced', 'performance'
    batteryLevel: 78
  };

  /**
   * Load settings from localStorage with defaults
   */
  function loadSettings() {
    const settings = {};
    Object.keys(DEFAULT_SETTINGS).forEach(key => {
      const stored = localStorage.getItem(`win11_${key}`);
      settings[key] = stored !== null ? 
        (typeof DEFAULT_SETTINGS[key] === 'number' ? parseInt(stored, 10) : stored) :
        DEFAULT_SETTINGS[key];
    });
    return settings;
  }

  /**
   * Save a single setting to localStorage
   */
  function saveSetting(key, value) {
    localStorage.setItem(`win11_${key}`, value);
  }

  /**
   * Apply all saved settings to the page
   */
  function applyAllSavedSettings() {
    const settings = loadSettings();
    
    // Apply brightness
    applyBrightness(settings.brightness);
    
    // Apply theme
    applyTheme(settings.theme);
    
    // Apply night light
    if (settings.nightLight) {
      applyNightLight(true);
    }
    
    // Apply volume
    window.__win11.volume = settings.volume / 100;
    window.__win11.volumeMuted = settings.volumeMuted;
    
    // Apply Wi-Fi state
    window.__win11.wifiEnabled = settings.wifiEnabled;
    window.__win11.wifiConnectedNetwork = settings.wifiConnectedNetwork;
    
    // Apply hotspot state
    window.__win11.hotspotEnabled = settings.hotspotEnabled;
    
    // Apply airplane mode
    window.__win11.airplaneModeEnabled = settings.airplaneModeEnabled;
    
    // Apply battery saver
    if (settings.batterySaver) {
      applyBatterySaver(true);
    }
    
    // Apply power mode
    window.__win11.powerMode = settings.powerMode;
    
    // Apply battery level
    window.__win11.batteryLevel = settings.batteryLevel;
    
    // Store settings globally
    window.__win11.settings = settings;
  }

  /**
   * Apply brightness filter to the entire page
   */
  function applyBrightness(value) {
    // Clamp between 30% and 100%
    const clamped = Math.max(30, Math.min(100, value));
    const brightnessValue = clamped / 100;
    
    // Apply filter to document root
    const currentFilter = document.documentElement.style.filter || '';
    let newFilter = currentFilter.replace(/brightness\([^)]*\)/g, '').trim();
    newFilter = `brightness(${brightnessValue}) ${newFilter}`.trim();
    document.documentElement.style.filter = newFilter;
    
    // Save to localStorage
    saveSetting('brightness', clamped);
    window.__win11.brightness = clamped;
  }

  /**
   * Apply theme (light or dark)
   */
  function applyTheme(theme) {
    if (theme === 'light') {
      document.body.classList.add('light-mode');
      document.documentElement.style.setProperty('--win11-bg-glass', 'rgba(240,240,240,0.85)');
      document.documentElement.style.setProperty('--win11-bg-glass-light', 'rgba(255,255,255,0.92)');
      document.documentElement.style.setProperty('--win11-text', '#1a1a1a');
      document.documentElement.style.setProperty('--win11-text-secondary', 'rgba(0,0,0,0.6)');
    } else {
      document.body.classList.remove('light-mode');
      // Reset to dark mode defaults (defined in variables.css)
      document.documentElement.style.removeProperty('--win11-bg-glass');
      document.documentElement.style.removeProperty('--win11-bg-glass-light');
      document.documentElement.style.removeProperty('--win11-text');
      document.documentElement.style.removeProperty('--win11-text-secondary');
    }
    
    saveSetting('theme', theme);
    window.__win11.theme = theme;
  }

  /**
   * Apply night light filter
   */
  function applyNightLight(enabled) {
    if (enabled) {
      const currentFilter = document.documentElement.style.filter || '';
      if (!currentFilter.includes('sepia')) {
        const newFilter = `${currentFilter} sepia(0.15) brightness(0.95)`.trim();
        document.documentElement.style.filter = newFilter;
      }
    } else {
      const currentFilter = document.documentElement.style.filter || '';
      const newFilter = currentFilter.replace(/sepia\([^)]*\)/g, '').replace(/brightness\(0\.95\)/g, '').trim();
      document.documentElement.style.filter = newFilter;
    }
    
    saveSetting('nightLight', enabled);
    window.__win11.nightLight = enabled;
  }

  /**
   * Apply battery saver mode
   */
  function applyBatterySaver(enabled) {
    if (enabled) {
      // Reduce brightness by 20%
      const currentBrightness = window.__win11.brightness || 100;
      const reducedBrightness = Math.max(30, currentBrightness - 20);
      applyBrightness(reducedBrightness);
      
      // Add amber tint overlay (if not already present)
      let overlay = document.getElementById('battery-saver-overlay');
      if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'battery-saver-overlay';
        overlay.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(255,180,50,0.06);
          pointer-events: none;
          z-index: 9;
          opacity: 0;
          transition: opacity 300ms ease;
        `;
        document.body.appendChild(overlay);
      }
      overlay.style.opacity = '1';
      
      // Update taskbar accent (if taskbar exists)
      const taskbar = document.querySelector('.taskbar');
      if (taskbar) {
        taskbar.classList.add('battery-saver-mode');
      }
    } else {
      // Restore brightness (remove the -20% reduction)
      const currentBrightness = window.__win11.brightness || 100;
      applyBrightness(currentBrightness);
      
      // Remove overlay
      const overlay = document.getElementById('battery-saver-overlay');
      if (overlay) {
        overlay.style.opacity = '0';
        setTimeout(() => overlay.remove(), 300);
      }
      
      // Update taskbar accent
      const taskbar = document.querySelector('.taskbar');
      if (taskbar) {
        taskbar.classList.remove('battery-saver-mode');
      }
    }
    
    saveSetting('batterySaver', enabled);
    window.__win11.batterySaver = enabled;
  }

  /**
   * Play a test chime sound using Web Audio API
   */
  function playTestChime() {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.type = 'sine';
      oscillator.frequency.value = 523; // C5 note
      
      const volume = window.__win11.volumeMuted ? 0 : (window.__win11.volume || 0.7);
      gainNode.gain.setValueAtTime(volume * 0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.6);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.6);
    } catch (e) {
      console.error('Could not play chime:', e);
    }
  }

  /**
   * Show toast notification
   */
  function showToast(message, duration = 2000) {
    const toast = document.createElement('div');
    toast.className = 'win11-toast';
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: rgba(32,32,32,0.95);
      color: white;
      padding: 12px 20px;
      border-radius: 4px;
      font-size: 14px;
      z-index: 10000;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255,255,255,0.1);
    `;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 300ms ease';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }

  // Expose functions and data to window
  window.__win11.settings = window.__win11.settings || {};
  window.__win11.applyBrightness = applyBrightness;
  window.__win11.applyTheme = applyTheme;
  window.__win11.applyNightLight = applyNightLight;
  window.__win11.applyBatterySaver = applyBatterySaver;
  window.__win11.playTestChime = playTestChime;
  window.__win11.showToast = showToast;
  window.__win11.saveSetting = saveSetting;
  window.__win11.loadSettings = loadSettings;

  // Initialize on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyAllSavedSettings);
  } else {
    applyAllSavedSettings();
  }

})();
