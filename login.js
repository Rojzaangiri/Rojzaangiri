document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent form from submitting normally

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const role = document.getElementById("role").value;

  // Dummy users for demonstration
  const users = {
    "admin@gmail.com": { password: "admin123", role: "admin" },
    "teacher@gmail.com": { password: "teacher123", role: "teacher" },
    "student@gmail.com": { password: "student123", role: "student" },
    "parent@gmail.com": { password: "parent123", role: "parent" }
  };

  if (!users[email]) {
    alert("Email not found!");
    return;
  }

  if (users[email].password !== password) {
    alert("Incorrect password!");
    return;
  }

  if (users[email].role !== role) {
    alert("Role mismatch. Please select the correct role.");
    return;
  }

  // Save user session
  localStorage.setItem("userEmail", email);
  localStorage.setItem("userRole", role);

  // Redirect based on role
  switch (role) {
    case "admin":
      window.location.href = "admin-dashboard.html";
      break;
    case "teacher":
      window.location.href = "teacher-dashboard.html";
      break;
    case "student":
      window.location.href = "student-dashboard.html";
      break;
    case "parent":
      window.location.href = "parent-dashboard.html";
      break;
    default:
      alert("Invalid role.");
  }
});
