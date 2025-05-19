// Validate login form (login.html)
function validateLoginForm() {
  const username = document.getElementById('username')?.value.trim();
  const password = document.getElementById('password')?.value.trim();

  if (!username) {
    alert('Please enter your username');
    return false;
  }
  if (!password) {
    alert('Please enter your password');
    return false;
  }
  return true;
}

// Show notification message (top of page)
function showNotification(message, type = 'success') {
  const notif = document.createElement('div');
  notif.className = `alert alert-${type}`;
  notif.textContent = message;
  document.body.prepend(notif);
  setTimeout(() => notif.remove(), 4000);
}

// Save announcements in localStorage
function saveAnnouncement(announcement) {
  let announcements = JSON.parse(localStorage.getItem('announcements')) || [];
  announcements.push(announcement);
  localStorage.setItem('announcements', JSON.stringify(announcements));
  showNotification('Announcement created successfully!');
}

// Load announcements and display (for notices.html)
function loadAnnouncements() {
  const container = document.getElementById('announcementsList');
  if (!container) return;

  const announcements = JSON.parse(localStorage.getItem('announcements')) || [];

  if (announcements.length === 0) {
    container.innerHTML = '<p>No announcements yet.</p>';
    return;
  }

  container.innerHTML = '';
  announcements.forEach((a, i) => {
    const div = document.createElement('div');
    div.className = 'announcement-item';
    div.innerHTML = `
      <h3>${a.title}</h3>
      <small>Posted on: ${a.date}</small>
      <p>${a.message.length > 200 ? a.message.substring(0, 200) + '...' : a.message}</p>
    `;
    container.appendChild(div);
  });
}

// Toggle menu for responsive (if you implement sidebar)
function toggleMenu() {
  const sidebar = document.querySelector('.sidebar');
  if (!sidebar) return;
  sidebar.classList.toggle('active');
}

// Run after DOM loads
document.addEventListener('DOMContentLoaded', () => {
  // Login form validation
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', e => {
      if (!validateLoginForm()) e.preventDefault();
    });
  }

  // Load announcements if on notices page
  if (document.getElementById('announcementsList')) {
    loadAnnouncements();
  }

  // Handle create notice form submission (create-notice.html)
  const createNoticeForm = document.getElementById('createNoticeForm');
  if (createNoticeForm) {
    createNoticeForm.addEventListener('submit', e => {
      e.preventDefault();
      const title = document.getElementById('noticeTitle').value.trim();
      const message = document.getElementById('noticeMessage').value.trim();

      if (!title || !message) {
        alert('Please fill in both title and message.');
        return;
      }

      const announcement = {
        title,
        message,
        date: new Date().toLocaleDateString(),
      };

      saveAnnouncement(announcement);
      createNoticeForm.reset();
    });
  }
});
