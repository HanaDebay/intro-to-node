// Tab logic (if your page has multiple tabs)
const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.tab-panel');
tabs.forEach((btn) => {
  btn.addEventListener('click', () => {
    tabs.forEach(b => b.classList.remove('active'));
    panels.forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');
  });
});

// Password confirmation check
const userForm = document.querySelector('form[action="/signup"]');
userForm?.addEventListener('submit', (e) => {
  const pass = document.getElementById('password');
  const confirm = document.getElementById('confirmPassword');
  if (pass.value !== confirm.value) {
    e.preventDefault();
    alert('Passwords do not match.');
    confirm.focus();
  }
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Navbar toggle
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".navbar-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("active");
    });
  }
});
