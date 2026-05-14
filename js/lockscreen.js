/* ============================================================
   Lock Screen & Login Screen Logic
   ============================================================ */

/* ============================================================
   Lock Screen
   ============================================================ */

const lockScreen = document.getElementById('lockScreen');
const loginScreen = document.getElementById('loginScreen');

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

let lockActive = true;

function unlock() {
  if (!lockActive) return;
  lockActive = false;

  if (lockScreen) {
    lockScreen.classList.add('unlocking');
    setTimeout(() => {
      lockScreen.style.display = 'none';
    }, 500);
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

function performLogin(skipPassword) {
  if (loginScreen) {
    loginScreen.classList.add('logging-in');
    setTimeout(() => {
      loginScreen.style.display = 'none';
      document.body.classList.add('desktop-revealed', 'desktop-ready');

      setTimeout(() => {
        document.body.classList.remove('desktop-revealed');
      }, 600);

      setTimeout(() => {
        if (typeof showToast === 'function') {
          showToast('👋 Welcome to Oke Precious\'s Windows 11 Portfolio!', 'info', '👋');
        }
      }, 1600);
    }, 300);
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
  loginGuest.addEventListener('click', () => {
    performLogin(true);
  });
}

if (loginForm) {
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const val = loginPassword ? loginPassword.value.trim() : '';
    if (val === '' || val === 'guest') {
      performLogin(true);
    }
  });
}

/* ============================================================
   Boot Animation on initial load
   ============================================================ */

function simulateBoot() {
  if (lockScreen) {
    lockScreen.style.display = 'flex';
    lockScreen.style.animation = 'none';
    lockScreen.style.opacity = '0';

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        lockScreen.style.transition = 'opacity 800ms ease';
        lockScreen.style.opacity = '1';
      });
    });
  }
  if (loginScreen) {
    loginScreen.style.display = 'none';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  updateLockClock();
  setInterval(updateLockClock, 1000);
  simulateBoot();
});