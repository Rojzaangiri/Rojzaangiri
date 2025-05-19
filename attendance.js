// Load students for a given class (mocked or from localStorage)
function loadStudents(className) {
  const allStudents = JSON.parse(localStorage.getItem('students')) || [];
  // Filter students by class if className given
  return className ? allStudents.filter(s => s.class === className) : allStudents;
}

// Render attendance form for teacher to mark attendance
function renderAttendanceForm(className, date) {
  const container = document.getElementById('attendanceContainer');
  if (!container) return;

  const students = loadStudents(className);
  if (students.length === 0) {
    container.innerHTML = '<p>No students found for this class.</p>';
    return;
  }

  // Load existing attendance for this class & date
  const attendanceKey = `attendance_${className}_${date}`;
  const savedAttendance = JSON.parse(localStorage.getItem(attendanceKey)) || {};

  let html = `<h3>Attendance for ${className} on ${date}</h3>`;
  html += `<form id="attendanceForm">`;
  students.forEach(student => {
    const checked = savedAttendance[student.id] === 'present' ? 'checked' : '';
    html += `
      <label>
        <input type="checkbox" name="student_${student.id}" ${checked}>
        ${student.name}
      </label><br>
    `;
  });
  html += `<button type="submit">Save Attendance</button></form>`;
  container.innerHTML = html;

  // Add form submit handler
  const form = document.getElementById('attendanceForm');
  form.addEventListener('submit', e => {
    e.preventDefault();

    const formData = new FormData(form);
    const attendanceRecord = {};

    students.forEach(student => {
      const present = formData.get(`student_${student.id}`) === 'on';
      attendanceRecord[student.id] = present ? 'present' : 'absent';
    });

    // Save attendance in localStorage
    localStorage.setItem(attendanceKey, JSON.stringify(attendanceRecord));
    alert('Attendance saved!');
  });
}

// Student/Parent: View attendance records
function viewAttendance(className, studentId) {
  const container = document.getElementById('attendanceViewContainer');
  if (!container) return;

  const attendanceData = {};
  // Loop through all keys in localStorage matching attendance for the class
  Object.keys(localStorage).forEach(key => {
    if (key.startsWith(`attendance_${className}_`)) {
      const date = key.split('_')[2];
      const record = JSON.parse(localStorage.getItem(key));
      attendanceData[date] = record[studentId] || 'absent';
    }
  });

  if (Object.keys(attendanceData).length === 0) {
    container.innerHTML = '<p>No attendance records found.</p>';
    return;
  }

  // Build table
  let html = '<h3>Attendance Record</h3><table border="1"><tr><th>Date</th><th>Status</th></tr>';
  Object.entries(attendanceData)
    .sort((a, b) => new Date(a[0]) - new Date(b[0]))
    .forEach(([date, status]) => {
      html += `<tr><td>${date}</td><td>${status}</td></tr>`;
    });
  html += '</table>';

  container.innerHTML = html;
}

// Usage example:
// For teacher page: call renderAttendanceForm('Class 10', '2025-05-19');
// For student/parent page: call viewAttendance('Class 10', 'student123');

document.addEventListener('DOMContentLoaded', () => {
  // Example usage: read class and date from URL or inputs
  // Teacher marks attendance
  if (document.getElementById('attendanceContainer')) {
    const className = document.getElementById('classSelect')?.value || 'Class 10';
    const date = document.getElementById('dateInput')?.value || new Date().toISOString().split('T')[0];
    renderAttendanceForm(className, date);
  }

  // Student/Parent views attendance
  if (document.getElementById('attendanceViewContainer')) {
    const className = document.body.dataset.class || 'Class 10';
    const studentId = document.body.dataset.studentId || 'student123';
    viewAttendance(className, studentId);
  }
});
