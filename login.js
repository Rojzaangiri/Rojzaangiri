document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const email = document.getElementById('email').value.trim().toLowerCase();
  const password = document.getElementById('password').value;
  const role = document.getElementById('role').value;

  const users = JSON.parse(localStorage.getItem('users')) || [];

  const matchedUser = users.find(user =>
    user.email === email && user.password === password && user.role === role
  );

  if (!matchedUser) {
    alert('Invalid credentials or role mismatch!');
    return;
  }

  localStorage.setItem('loggedInUser', JSON.stringify(matchedUser));

  alert(`Welcome ${matchedUser.name}! Redirecting to your dashboard...`);

  switch (matchedUser.role) {
    case 'admin':
      window.location.href = 'admin-dashboard.html';
      break;
    case 'teacher':
      window.location.href = 'teacher-dashboard.html';
      break;
    case 'student':
      window.location.href = 'student-dashboard.html';
      break;
    case 'parent':
      window.location.href = 'parent-dashboard.html';
      break;
    default:
      alert("Unknown role.");
  }
});
