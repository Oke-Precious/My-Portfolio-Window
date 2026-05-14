/* ============================================================
   Lock Screen & Login Screen Logic
   ============================================================ */

(function () {
  'use strict';

  /* ============================================================
     Sequence Manager
     ============================================================ */

  const bootScreen = document.getElementById('bootScreen');
  const lockScreen = document.getElementById('lockScreen');
  const loginScreen = document.getElementById('loginScreen');

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function runBootSequence() {
    // Phase 1: Boot screen (black, logo + spinner)
    if (bootScreen) bootScreen.style.display = 'flex';

    await sleep(400);

    // Logo fades in
    const logo = bootScreen?.querySelector('.os-logo');
    if (logo) logo.classList.add('visible');

    // Ring starts spinning
    const ring = bootScreen?.querySelector('.boot-ring');
    if (ring) ring.classList.add('spinning');

    await sleep(2200);

    // Fade out boot screen
    if (bootScreen) {
      bootScreen.classList.add('booting-out');
      await sleep(600);
      bootScreen.style.display = 'none';
      bootScreen.classList.remove('booting-out');
    }

    // Phase 2: Lock screen slides in
    if (lockScreen) {
      lockScreen.style.display = 'flex';
      lockScreen.style.opacity = '0';
      lockScreen.style.transform = 'translateY(40px)';
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          lockScreen.style.transition = 'opacity 600ms ease, transform 600ms cubic-bezier(0.22,1,0.36,1)';
          lockScreen.style.opacity = '1';
          lockScreen.style.transform = 'translateY(0)';
        });
      });
      updateLockClock();
      lockInterval = setInterval(updateLockClock, 1000);
    }

    // Phase 3: Login screen (after click)
  }

  /* ============================================================
     Lock Screen
     ============================================================ */

  let lockActive = true;
  let lockInterval = null;

  function updateLockClock() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
    const dateStr = now.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });

    const clockEl = document.getElementById('lockClock');
    const dateEl = document.getElementById('lockDate');
    if (clockEl) clockEl.textContent = timeStr;
    if (dateEl) dateEl.textContent = dateStr;
  }

  async function unlock() {
    if (!lockActive) return;
    lockActive = false;
    clearInterval(lockInterval);

    if (lockScreen) {
      lockScreen.style.transition = 'opacity 500ms ease, transform 500ms cubic-bezier(0.4,0,0.2,1)';
      lockScreen.style.opacity = '0';
      lockScreen.style.transform = 'translateY(-100vh)';
      await sleep(500);
      lockScreen.style.display = 'none';
    }

    // Show login
    if (loginScreen) {
      loginScreen.style.display = 'flex';
      loginScreen.style.opacity = '0';
      loginScreen.style.transform = 'scale(0.97)';
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          loginScreen.style.transition = 'opacity 400ms ease, transform 400ms cubic-bezier(0.22,1,0.36,1)';
          loginScreen.style.opacity = '1';
          loginScreen.style.transform = 'scale(1)';
        });
      });
    }
  }

  if (lockScreen) {
    lockScreen.addEventListener('click', unlock);
    document.addEventListener('keydown', function onFirstKey(e) {
      unlock();
      document.removeEventListener('keydown', onFirstKey);
    });
  }

  /* ============================================================
     Login Screen
     ============================================================ */

  const loginForm = document.getElementById('loginForm');
  const loginPassword = document.getElementById('loginPassword');
  const loginSubmit = document.getElementById('loginSubmit');
  const loginGuest = document.getElementById('loginGuest');
  const loginCard = document.getElementById('loginCard');
  const loginAvatar = document.getElementById('loginAvatar');

  async function performLogin(skipPassword) {
    if (loginScreen) {
      const card = document.getElementById('loginCard');

      // Avatar pulse
      if (loginAvatar) loginAvatar.classList.add('login-pulse');
      await sleep(200);

      // Card shatters / blurs out
      loginScreen.classList.add('logging-in');
      await sleep(450);

      loginScreen.style.display = 'none';
      document.body.classList.add('desktop-revealed');

      await sleep(600);
      document.body.classList.remove('desktop-revealed');
      document.body.classList.add('desktop-ready');

      await sleep(1000);
      if (typeof showToast === 'function') {
        showToast('Welcome to Oke Precious\'s Windows 11 Portfolio!', 'info', '👋');
      }
    }
  }

  if (loginSubmit) {
    loginSubmit.addEventListener('click', () => {
      const val = loginPassword ? loginPassword.value.trim() : '';
      if (val === '' || val === 'guest' || skipPassword) {
        performLogin(true);
      }
    });
  }

  if (loginGuest) {
    loginGuest.addEventListener('click', () => performLogin(true));
  }

  if (loginForm) {
    loginForm.addEventListener('submit', e => {
      e.preventDefault();
      const val = loginPassword ? loginPassword.value.trim() : '';
      if (val === '' || val === 'guest') performLogin(true);
    });
  }

  /* ============================================================
     Boot on page load
     ============================================================ */

  window.addEventListener('load', () => {
    runBootSequence();
  });

})();