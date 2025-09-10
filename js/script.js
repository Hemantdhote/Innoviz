let currentRole = 'client';

const title = document.getElementById('login-title');
const subtitle = document.getElementById('login-subtitle');
const emailInput = document.getElementById('email');
const passInput = document.getElementById('password');
const loginBtn = document.getElementById('login-btn');
const forgotLink = document.getElementById('forgot-link');
const roleLinks = document.querySelectorAll('.role-link');

function updateUI(role) {
  currentRole = role;

  // Update heading text dynamically
  if (role === 'client') {
    title.textContent = 'Log in as Client User';
  } else if (role === 'manager') {
    title.textContent = 'Log in as Project Manager';
  } else if (role === 'admin') {
    title.textContent = 'Log in as Admin User';
  }
  subtitle.textContent = 'Enter your credentials to continue';

  // Clear inputs
  emailInput.value = '';
  passInput.value = '';

  // Hide selected role from the “Login as” links
  roleLinks.forEach(link => {
    if (link.dataset.role === role) {
      link.style.display = 'none';
    } else {
      link.style.display = 'inline-block';
    }
  });
}

// Role switcher
roleLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const role = link.dataset.role;
    updateUI(role);
  });
});

// Login button
loginBtn.addEventListener('click', () => {
  const email = emailInput.value.trim();
  const pass = passInput.value.trim();

  if (!email || !pass) {
    alert('Please enter both email and password.');
    return;
  }

  if (currentRole === 'admin') {
    window.location.href = 'admin-dashboard.html';
  } else if (currentRole === 'manager') {
    window.location.href = 'manager-dashboard.html';
  } else {
    window.location.href = 'client-dashboard.html';
  }
});

// Forgot password
forgotLink.addEventListener('click', e => {
  e.preventDefault();
  const email = emailInput.value.trim();
  if (!email) {
    alert('Please enter your email before resetting password.');
  } else {
    alert(`Password reset instructions sent to ${email} for ${currentRole} user.`);
  }
});

// initialise default
updateUI('client');
