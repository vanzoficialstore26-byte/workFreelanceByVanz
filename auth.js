// js/auth.js

function login(email, password) {
  // Validasi password minimal 6 karakter
  if (password.length < 6) {
    alert('Password minimal 6 karakter!');
    return;
  }

  let users = JSON.parse(localStorage.getItem('users')) || {};

  // Cek apakah user sudah ada
  if (users[email]) {
    // Verifikasi password
    if (users[email].password !== password) {
      alert('Password salah!');
      return;
    }
  } else {
    // User baru → buat akun dengan saldo 0
    users[email] = {
      name: email.split('@')[0],
      email: email,
      password: password,
      balance: 0,
      portfolio: [],
      projects: [],
      is_admin: (email === 'admin@workbyvanz.com' && password === 'admin123')
    };
    localStorage.setItem('users', JSON.stringify(users));
    console.log('Akun baru dibuat:', email);
  }

  // Simpan sesi
  localStorage.setItem('currentUser', email);
  localStorage.setItem('isLoggedIn', 'true');

  // Redirect
  const isAdmin = users[email].is_admin;
  window.location.href = isAdmin ? 'admin.html' : 'dashboard.html';
}

// Handle form submit
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  login(email, password);
});

function logout() {
  localStorage.removeItem('currentUser');
  localStorage.removeItem('isLoggedIn');
  window.location.href = 'login.html';
}