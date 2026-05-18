/* ============================================================
   Windows 11 Wallpaper System
   Built-in gradients & custom wallpaper management
   ============================================================ */

(function () {
  'use strict';

  const WALLPAPERS = [
    {
      id: 'bloom',
      name: 'Bloom (Default)',
      css: `radial-gradient(ellipse 120% 120% at 65% 45%,
              #7B2FBE 0%, #4A1A9E 20%, #1A0A5E 45%,
              #0D0221 70%, #000000 100%),
            radial-gradient(ellipse 60% 80% at 70% 40%,
              rgba(255,100,220,0.4) 0%, transparent 60%)`,
      thumb: '#4A1A9E'
    },
    {
      id: 'sunrise',
      name: 'Sunrise',
      css: `linear-gradient(160deg,
              #0F0C29 0%, #302B63 30%,
              #FF6B6B 60%, #FFD93D 85%, #FF9A3C 100%)`,
      thumb: '#FF6B6B'
    },
    {
      id: 'ocean',
      name: 'Deep Ocean',
      css: `radial-gradient(ellipse at 30% 70%,
              #001233 0%, #023E8A 30%,
              #0096C7 60%, #48CAE4 100%)`,
      thumb: '#023E8A'
    },
    {
      id: 'forest',
      name: 'Forest',
      css: `linear-gradient(135deg,
              #0A1628 0%, #0D2137 25%,
              #1A3A2A 55%, #2D5A3D 80%, #1B4332 100%)`,
      thumb: '#1A3A2A'
    },
    {
      id: 'synthwave',
      name: 'Synthwave',
      css: `linear-gradient(180deg,
              #0D0221 0%, #1A0533 30%,
              #2D0057 50%, #6A0080 70%,
              #FF006E 90%, #FF4D9E 100%)`,
      thumb: '#6A0080'
    },
    {
      id: 'aurora',
      name: 'Aurora',
      css: `linear-gradient(135deg,
              #000000 0%, #001a1a 20%,
              #003322 35%, #00ff88 50%,
              #0088ff 70%, #4400ff 85%, #000000 100%)`,
      thumb: '#003322'
    },
    {
      id: 'desert',
      name: 'Desert Dusk',
      css: `linear-gradient(180deg,
              #1a0a00 0%, #3d1a00 20%,
              #8B4513 40%, #D2691E 60%,
              #FF8C00 80%, #FFD700 100%)`,
      thumb: '#8B4513'
    },
    {
      id: 'minimal',
      name: 'Minimal Dark',
      css: `linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #111111 100%)`,
      thumb: '#1a1a1a'
    }
  ];

  // Initialize window.__win11 if it doesn't exist
  window.__win11 = window.__win11 || {};

  // Store wallpapers globally
  window.__win11.wallpapers = WALLPAPERS;
  window.__win11.currentWallpaper = 'bloom';

  /**
   * Apply a wallpaper to the desktop
   */
  function applyWallpaper(wallpaper) {
    const desktop = document.getElementById('desktop');
    if (!desktop) return;
    
    desktop.style.background = wallpaper.css;
    desktop.style.backgroundSize = 'cover';
    desktop.style.backgroundPosition = 'center center';
    desktop.style.backgroundRepeat = 'no-repeat';
    
    localStorage.setItem('win11_wallpaper', wallpaper.id);
    window.__win11.currentWallpaper = wallpaper.id;
    
    // Dispatch custom event for wallpaper change
    window.dispatchEvent(new CustomEvent('wallpaperChanged', { detail: wallpaper }));
  }

  /**
   * Apply custom color as wallpaper
   */
  function applyCustomWallpaper(color) {
    const desktop = document.getElementById('desktop');
    if (!desktop) return;
    
    // Create a radial gradient from the custom color
    const gradient = `radial-gradient(ellipse at 40% 40%,
                      ${color} 0%,
                      ${adjustColor(color, -30)} 50%,
                      #000000 100%)`;
    
    desktop.style.background = gradient;
    desktop.style.backgroundSize = 'cover';
    desktop.style.backgroundPosition = 'center center';
    desktop.style.backgroundRepeat = 'no-repeat';
    
    localStorage.setItem('win11_wallpaper_custom', color);
    window.__win11.currentWallpaper = 'custom';
  }

  /**
   * Adjust color brightness (darken/lighten)
   */
  function adjustColor(color, percent) {
    const num = parseInt(color.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.min(255, Math.max(0, (num >> 16) + amt));
    const G = Math.min(255, Math.max(0, (num >> 8 & 0x00FF) + amt));
    const B = Math.min(255, Math.max(0, (num & 0x0000FF) + amt));
    return '#' + (0x1000000 + (R < 16 ? 0 : 1) * R * 0x10000 + (G < 16 ? 0 : 1) * G * 0x100 + (B < 16 ? 0 : 1) * B).toString(16).slice(1);
  }

  /**
   * Load saved wallpaper from localStorage
   */
  function loadSavedWallpaper() {
    const saved = localStorage.getItem('win11_wallpaper') || 'bloom';
    const customColor = localStorage.getItem('win11_wallpaper_custom');
    
    if (customColor && saved === 'custom') {
      applyCustomWallpaper(customColor);
    } else {
      const wp = WALLPAPERS.find(w => w.id === saved) || WALLPAPERS[0];
      applyWallpaper(wp);
    }
  }

  // Expose functions globally
  window.__win11.applyWallpaper = applyWallpaper;
  window.__win11.applyCustomWallpaper = applyCustomWallpaper;
  window.__win11.loadSavedWallpaper = loadSavedWallpaper;

  // Load saved wallpaper when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadSavedWallpaper);
  } else {
    loadSavedWallpaper();
  }
})();
