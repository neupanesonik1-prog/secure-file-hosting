const API = 'http://localhost:5000/api';

// Helper
const msg = (id, text, type = 'error') => {
  const el = document.getElementById(id);
  if (el) {
    el.textContent = text;
    el.className = `message ${type}`;
  }
};

// Register
async function register() {
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const res = await fetch(`${API}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password })
  });

  const data = await res.json();
  if (res.ok) {
    msg('msg', 'Registered! Redirecting to login...', 'success');
    setTimeout(() => location.href = 'login.html', 1500);
  } else {
    msg('msg', data.msg || 'Error');
  }
}

// Login
async function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const res = await fetch(`${API}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();
  if (res.ok) {
    localStorage.setItem('token', data.token);
    location.href = 'dashboard.html';
  } else {
    msg('msg', data.msg || 'Login failed');
  }
}

// Logout
function logout() {
  localStorage.clear();
  location.href = 'login.html';
}

// Protect pages
if (window.location.pathname.includes('dashboard.html') ||
    window.location.pathname.includes('upload.html') ||
    window.location.pathname.includes('myfiles.html')) {
  if (!localStorage.getItem('token')) {
    location.href = 'login.html';
  }
}