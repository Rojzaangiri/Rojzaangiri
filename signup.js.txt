document.getElementById('signupForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const role = document.getElementById('role').value;
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim().toLowerCase();
  const password = document.getElementById('password').value;

  if (!role || !name || !email || !password) {
    alert("Please fill in all fields.");
    return;
  }

  const users = JSON.parse(localStorage.getItem('users')) || [];

  const userExists = users.some(user => user.email === email);
  if (userExists) {
    alert("An account with this email already exists.");
    return;
  }

  const newUser = {
    id: 'user_' + Date.now(),
    role,
    name,
    email,
    password, // NOTE: This is for demo only. Never store plain passwords in real apps!
  };

  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));
  alert("Signup successful! You can now log in.");
  window.location.href = "login.html";
});
