/* ============================================================
   Responsive Mode Handler + Mobile Touch Support
   ============================================================ */

(function () {
  'use strict';

  const isMobile = () => window.matchMedia('(max-width: 768px)').matches;

  /* ---------- Mobile Banner ---------- */
  function showMobileBanner() {
    let banner = document.getElementById('mobileBanner');
    if (!banner) {
      banner = document.createElement('div');
      banner.id = 'mobileBanner';
      banner.innerHTML = `
        <span>Tablet Mode active</span>
        <div id="mobileBannerClose">✕</div>
      `;
      document.body.appendChild(banner);

      document.getElementById('mobileBannerClose').addEventListener('click', () => {
        banner.classList.remove('visible');
        sessionStorage.setItem('mobileBannerDismissed', '1');
      });
    }
    if (!sessionStorage.getItem('mobileBannerDismissed')) {
      banner.classList.add('visible');
    }
  }

  function hideMobileBanner() {
    const banner = document.getElementById('mobileBanner');
    if (banner) banner.classList.remove('visible');
  }

  /* ---------- Bottom Navigation ---------- */
  function buildMobileNav() {
    let nav = document.getElementById('mobileBottomNav');
    if (!nav) {
      nav = document.createElement('div');
      nav.id = 'mobileBottomNav';
      nav.innerHTML = `
        <div class="mobile-nav-btn active" data-action="desktop">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 3h8v8H3zm10 0h8v8h-8zM3 13h8v8H3zm10 0h8v8h-8z"/></svg>
          <span>Desktop</span>
        </div>
        <div class="mobile-nav-btn" data-action="taskview">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 4h6v6H4zm10 0h6v6h-6zM4 14h6v6H4zm10 0h6v6h-6z"/></svg>
          <span>Task View</span>
        </div>
        <div class="mobile-nav-btn" data-action="start">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 3h8v8H3zm10 0h8v8h-8zM3 13h8v8H3zm10 0h8v8h-8z"/></svg>
          <span>Apps</span>
        </div>
        <div class="mobile-nav-btn" data-action="notifications">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/></svg>
          <span>Alerts</span>
        </div>
        <div class="mobile-nav-btn" data-action="settings">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>
          <span>Settings</span>
        </div>
      `;
      document.body.appendChild(nav);

      nav.querySelectorAll('.mobile-nav-btn').forEach(btn => {
        btn.addEventListener('click', () => handleMobileNavAction(btn.dataset.action));
      });
    }
    nav.classList.toggle('visible', isMobile());
  }

  function handleMobileNavAction(action) {
    const nav = document.getElementById('mobileBottomNav');
    nav.querySelectorAll('.mobile-nav-btn').forEach(b => b.classList.remove('active'));
    event.currentTarget.classList.add('active');

    switch (action) {
      case 'desktop':
        closeMobileDrawer();
        break;
      case 'taskview':
        if (window.__win11 && window.__win11.openTaskView) {
          window.__win11.openTaskView();
        }
        break;
      case 'start':
        toggleMobileDrawer();
        break;
      case 'notifications':
        if (window.__win11 && window.__win11.openActionCenter) {
          window.__win11.openActionCenter();
        }
        break;
      case 'settings':
        if (window.__win11 && window.__win11.openApp) {
          window.__win11.openApp('Settings');
        }
        break;
    }
  }

  /* ---------- Mobile Start Drawer ---------- */
  function buildMobileDrawer() {
    let drawer = document.getElementById('mobileDrawer');
    if (!drawer) {
      drawer = document.createElement('div');
      drawer.id = 'mobileDrawer';
      drawer.innerHTML = `
        <div id="mobileDrawerInner">
          <div class="mobile-drawer-title">All Apps</div>
          <div class="mobile-drawer-grid" id="mobileDrawerGrid">
            <!-- Populated by __buildMobileDrawerGrid() -->
          </div>
        </div>
      `;
      document.body.appendChild(drawer);

      drawer.addEventListener('click', (e) => {
        if (e.target === drawer) closeMobileDrawer();
      });
    }
    __buildMobileDrawerGrid();
    return drawer;
  }

  function __buildMobileDrawerGrid() {
    const grid = document.getElementById('mobileDrawerGrid');
    if (!grid || !window.__win11 || !window.__win11.APP_REGISTRY) return;
    const registry = window.__win11.APP_REGISTRY;
    grid.innerHTML = '';

    const sortedApps = Object.keys(registry).sort();

    sortedApps.forEach(appId => {
      const app = registry[appId];
      if (app.name === 'Calculator' || app.name === 'Photos' || app.name === 'Music') return;
      const tile = document.createElement('div');
      tile.className = 'mobile-app-tile';
      tile.innerHTML = `${app.icon}<span>${app.name}</span>`;
      tile.addEventListener('click', () => {
        closeMobileDrawer();
        if (window.__win11.openApp) window.__win11.openApp(appId);
      });
      grid.appendChild(tile);
    });
  }

  function toggleMobileDrawer() {
    const drawer = document.getElementById('mobileDrawer');
    if (!drawer) return;
    drawer.classList.toggle('visible');

    if (drawer.classList.contains('visible')) {
      __buildMobileDrawerGrid();
      setupSwipeToClose(drawer);
    }
  }

  function closeMobileDrawer() {
    const drawer = document.getElementById('mobileDrawer');
    if (drawer) drawer.classList.remove('visible');
  }

  /* ---------- Swipe Gesture ---------- */
  function setupSwipeToClose(drawer) {
    let startY = 0;
    let startX = 0;
    const inner = drawer.querySelector('#mobileDrawerInner');
    if (!inner) return;

    drawer.ontouchstart = (e) => {
      startY = e.touches[0].clientY;
      startX = e.touches[0].clientX;
    };

    drawer.ontouchmove = (e) => {
      const deltaY = e.touches[0].clientY - startY;
      if (deltaY > 0 && startY < 80) {
        inner.style.transform = `translateY(${deltaY}px)`;
        drawer.style.background = `rgba(0,0,0,${Math.min(0.7, 0.4 + deltaY / 300)})`;
      }
    };

    drawer.ontouchend = (e) => {
      const deltaY = e.changedTouches[0].clientY - startY;
      inner.style.transform = '';
      drawer.style.background = '';
      if (deltaY > 120) {
        closeMobileDrawer();
      }
    };
  }

  /* ---------- Mode Switch Handler ---------- */
  function handleModeSwitch() {
    if (isMobile()) {
      showMobileBanner();
      buildMobileNav();
      buildMobileDrawer();

      const banner = document.getElementById('mobileBanner');
      if (banner && sessionStorage.getItem('mobileBannerDismissed')) {
        banner.style.display = 'none';
      }
    } else {
      hideMobileBanner();
      const nav = document.getElementById('mobileBottomNav');
      if (nav) nav.classList.remove('visible');
      const drawer = document.getElementById('mobileDrawer');
      if (drawer) drawer.classList.remove('visible');
    }
  }

  /* ---------- Touch: prevent double-tap zoom ---------- */
  document.addEventListener('touchstart', (e) => {
    if (e.touches.length > 1) return;
    const target = e.target;
    if (target.tagName === 'BUTTON' || target.closest('button') ||
        target.tagName === 'INPUT' || target.closest('input') ||
        target.tagName === 'TEXTAREA' || target.closest('textarea')) {
      return;
    }
    e.preventDefault();
  }, { passive: false });

  /* ---------- Init ---------- */
  handleModeSwitch();
  window.matchMedia('(max-width: 768px)').addEventListener('change', handleModeSwitch);

  window.__win11 = window.__win11 || {};
  window.__win11.handleModeSwitch = handleModeSwitch;
  window.__win11.toggleMobileDrawer = toggleMobileDrawer;
  window.__win11.closeMobileDrawer = closeMobileDrawer;
  window.__win11.openMobileDrawer = () => {
    buildMobileDrawer();
    document.getElementById('mobileDrawer').classList.add('visible');
  };

})();