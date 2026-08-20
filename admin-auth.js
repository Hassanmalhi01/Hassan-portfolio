// ==========================================================================
// HASSAN PORTFOLIO — admin-auth.js
// Client-side login gate for the Admin Panel.
//
// IMPORTANT HONESTY NOTE (also explained to the site owner outside the code):
// This is a static website with no server, so this login cannot be
// "real" server-side security — the credentials are checked in the
// visitor's own browser. It successfully keeps out casual visitors and
// gives the owner a genuine working login/password-change flow, but a
// technically determined person could bypass it via browser dev tools.
// Treat it as a front door, not a bank vault.
// ==========================================================================

const ADMIN_AUTH_KEY = 'hassanAdminAuth_v1';
const ADMIN_SESSION_KEY = 'hassanAdminSession_v1';

const ADMIN_DEFAULTS = {
  username: 'admin',
  password: 'Admin@123'
};

function getAdminCreds() {
  try {
    const raw = localStorage.getItem(ADMIN_AUTH_KEY);
    if (!raw) return Object.assign({}, ADMIN_DEFAULTS);
    const parsed = JSON.parse(raw);
    return {
      username: parsed.username || ADMIN_DEFAULTS.username,
      password: parsed.password || ADMIN_DEFAULTS.password
    };
  } catch (e) {
    return Object.assign({}, ADMIN_DEFAULTS);
  }
}

function saveAdminCreds(creds) {
  localStorage.setItem(ADMIN_AUTH_KEY, JSON.stringify(creds));
}

function isAdminLoggedIn() {
  return sessionStorage.getItem(ADMIN_SESSION_KEY) === 'true';
}

function setAdminLoggedIn(value) {
  if (value) sessionStorage.setItem(ADMIN_SESSION_KEY, 'true');
  else sessionStorage.removeItem(ADMIN_SESSION_KEY);
}

// ---------- Login page logic ----------
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  if (!form) return; // not on the login page

  // Already logged in this session? Skip straight to dashboard.
  if (isAdminLoggedIn()) {
    window.location.href = 'dashboard.html';
    return;
  }

  const errorBox = document.getElementById('loginError');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const creds = getAdminCreds();

    if (username === creds.username && password === creds.password) {
      setAdminLoggedIn(true);
      window.location.href = 'dashboard.html';
    } else {
      errorBox.classList.add('show');
    }
  });
});
