// User data with login IDs, passwords, roles, and names
const users = [
  { id: "admin001", password: "admin123", role: "admin", name: "Admin User" },
  { id: "teacher001", password: "teach123", role: "teacher", name: "Mr. Sharma" },
  { id: "student001", password: "stud123", role: "student", name: "Sita Giri" },
  { id: "parent001", password: "parent123", role: "parent", name: "Uma Giri" }
];

// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector("form");

  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const role = loginForm.role.value;
      const userId = loginForm.user_id.value.trim();
      const password = loginForm.password.value;

      // Find user with matching credentials
      const user = users.find(
        (u) => u.id === userId && u.password === password && u.role === role
      );

      if (user) {
        // Save logged-in user info in localStorage
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        // Redirect to dashboard
        window.location.href = "dashboard.html";
      } else {
        alert("Invalid login ID, password, or role. Please try again.");
      }
    });
  }

  // On dashboard and other pages: check if user is logged in
  if (window.location.pathname.includes("dashboard.html")) {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!user) {
      // If not logged in, redirect to login page
      window.location.href = "login.html";
    } else {
      // Display welcome message and role-specific content
      const welcomeEl = document.getElementById("welcome-message");
      if (welcomeEl) {
        welcomeEl.textContent = `Welcome, ${user.name} (${user.role})!`;
      }

      // Here you can add logic to load or display content based on user.role
      // For example:
      // if (user.role === "admin") { showAdminDashboard(); }
      // else if (user.role === "teacher") { showTeacherDashboard(); }
      // etc.
    }
  }
});

// Logout function to clear session and redirect to login page
function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
}
