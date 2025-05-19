// Utility: load data from localStorage or empty array
function loadData(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

// Utility: create element with classes and text
function createEl(tag, classNames, text) {
  const el = document.createElement(tag);
  if (classNames) el.className = classNames;
  if (text) el.textContent = text;
  return el;
}

// Show overview stats for Admin Dashboard
function loadAdminDashboard() {
  const userStatsEl = document.getElementById('userStats');
  const announcementsEl = document.getElementById('recentAnnouncements');
  
  if (!userStatsEl || !announcementsEl) return;

  // Load users
  const teachers = loadData('teachers');
  const students = loadData('students');
  const parents = loadData('parents');

  userStatsEl.innerHTML = `
    <p>Teachers: ${teachers.length}</p>
    <p>Students: ${students.length}</p>
    <p>Parents: ${parents.length}</p>
  `;

  // Load recent announcements (last 5)
  const announcements = loadData('announcements').slice(-5).reverse();
  announcementsEl.innerHTML = '';

  if (announcements.length === 0) {
    announcementsEl.textContent = 'No announcements yet.';
    return;
  }

  announcements.forEach(a => {
    const div = createEl('div', 'announcement-item');
    div.innerHTML = `<strong>${a.title}</strong> <small>${a.date}</small><p>${a.message.substring(0, 100)}...</p>`;
    announcementsEl.appendChild(div);
  });
}

// Load Teacher Dashboard
function loadTeacherDashboard() {
  const classesEl = document.getElementById('assignedClasses');
  const assignmentsEl = document.getElementById('pendingAssignments');
  const messagesEl = document.getElementById('messages');

  if (!classesEl || !assignmentsEl || !messagesEl) return;

  // Example: Load assigned classes for logged-in teacher
  const assignedClasses = loadData('assignedClasses'); // array of classes

  classesEl.innerHTML = assignedClasses.length
    ? assignedClasses.map(c => `<li>${c}</li>`).join('')
    : '<li>No classes assigned</li>';

  // Pending assignments (mocked)
  const pendingAssignments = loadData('pendingAssignments');
  assignmentsEl.innerHTML = pendingAssignments.length
    ? pendingAssignments.map(a => `<li>${a.title}</li>`).join('')
    : '<li>No pending assignments</li>';

  // Messages (mocked)
  const messages = loadData('messages');
  messagesEl.innerHTML = messages.length
    ? messages.map(m => `<li>${m.sender}: ${m.subject}</li>`).join('')
    : '<li>No messages</li>';
}

// Load Student Dashboard
function loadStudentDashboard() {
  const timetableEl = document.getElementById('timetable');
  const homeworkEl = document.getElementById('homework');
  const announcementsEl = document.getElementById('recentAnnouncements');

  if (!timetableEl || !homeworkEl || !announcementsEl) return;

  // Example timetable
  const timetable = loadData('timetable');
  timetableEl.innerHTML = timetable.length
    ? timetable.map(t => `<li>${t.day}: ${t.subject} at ${t.time}</li>`).join('')
    : '<li>No timetable available</li>';

  // Homework assignments
  const homework = loadData('homework');
  homeworkEl.innerHTML = homework.length
    ? homework.map(h => `<li>${h.title} (Due: ${h.dueDate})</li>`).join('')
    : '<li>No homework assigned</li>';

  // Announcements (last 3)
  const announcements = loadData('announcements').slice(-3).reverse();
  announcementsEl.innerHTML = '';
  if (announcements.length === 0) {
    announcementsEl.textContent = 'No announcements yet.';
  } else {
    announcements.forEach(a => {
      const div = document.createElement('div');
      div.className = 'announcement-item';
      div.innerHTML = `<strong>${a.title}</strong> <small>${a.date}</small><p>${a.message.substring(0, 100)}...</p>`;
      announcementsEl.appendChild(div);
    });
  }
}

// Load Parent Dashboard
function loadParentDashboard() {
  const childProgressEl = document.getElementById('childProgress');
  const upcomingEventsEl = document.getElementById('upcomingEvents');

  if (!childProgressEl || !upcomingEventsEl) return;

  // Child's grades example
  const childGrades = loadData('childGrades');
  childProgressEl.innerHTML = childGrades.length
    ? childGrades.map(g => `<li>${g.subject}: ${g.grade}</li>`).join('')
    : '<li>No grades available</li>';

  // Events (mocked)
  const events = loadData('events');
  upcomingEventsEl.innerHTML = events.length
    ? events.map(ev => `<li>${ev.title} on ${ev.date}</li>`).join('')
    : '<li>No upcoming events</li>';
}

// Main load function
function loadDashboard(role) {
  switch(role) {
    case 'admin':
      loadAdminDashboard();
      break;
    case 'teacher':
      loadTeacherDashboard();
      break;
    case 'student':
      loadStudentDashboard();
      break;
    case 'parent':
      loadParentDashboard();
      break;
    default:
      console.warn('Unknown role:', role);
  }
}

// On DOM ready
document.addEventListener('DOMContentLoaded', () => {
  // Example: Detect role from a hidden input or data attribute
  const role = document.body.dataset.role || 'student'; // default student

  loadDashboard(role);
});
