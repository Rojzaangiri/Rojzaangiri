// Load messages for logged-in user (mock example uses "currentUserId" from localStorage)
function loadMessages() {
  const currentUserId = localStorage.getItem('currentUserId');
  if (!currentUserId) return [];

  const allMessages = JSON.parse(localStorage.getItem('messages')) || [];
  // Filter messages where current user is sender or receiver
  return allMessages.filter(m => m.senderId === currentUserId || m.receiverId === currentUserId);
}

// Render inbox messages list
function renderInbox() {
  const inboxEl = document.getElementById('inboxMessages');
  if (!inboxEl) return;

  const messages = loadMessages();
  if (messages.length === 0) {
    inboxEl.innerHTML = '<p>No messages.</p>';
    return;
  }

  inboxEl.innerHTML = messages.map(m => {
    const fromTo = (m.senderId === localStorage.getItem('currentUserId')) ? `To: ${m.receiverName}` : `From: ${m.senderName}`;
    return `
      <div class="message-item" data-id="${m.id}" tabindex="0">
        <strong>${m.subject}</strong><br>
        <small>${fromTo} | ${m.date}</small>
      </div>
    `;
  }).join('');

  // Add click handlers to message items
  document.querySelectorAll('.message-item').forEach(item => {
    item.addEventListener('click', () => {
      const msgId = item.dataset.id;
      openMessage(msgId);
    });
    item.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        const msgId = item.dataset.id;
        openMessage(msgId);
      }
    });
  });
}

// Show message content in message-view.html
function openMessage(messageId) {
  const allMessages = JSON.parse(localStorage.getItem('messages')) || [];
  const msg = allMessages.find(m => m.id === messageId);
  if (!msg) {
    alert('Message not found');
    return;
  }

  const viewEl = document.getElementById('messageContent');
  if (!viewEl) return;

  viewEl.innerHTML = `
    <h2>${msg.subject}</h2>
    <p><strong>From:</strong> ${msg.senderName}</p>
    <p><strong>To:</strong> ${msg.receiverName}</p>
    <p><small>${msg.date}</small></p>
    <hr>
    <p>${msg.body.replace(/\n/g, '<br>')}</p>
  `;
}

// Send a new message (from compose.html)
function sendMessage(event) {
  event.preventDefault();

  const senderId = localStorage.getItem('currentUserId');
  const senderName = localStorage.getItem('currentUserName');
  const receiverId = document.getElementById('receiverId').value.trim();
  const receiverName = document.getElementById('receiverName').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const body = document.getElementById('body').value.trim();

  if (!receiverId || !subject || !body) {
    alert('Please fill in all required fields.');
    return;
  }

  const allMessages = JSON.parse(localStorage.getItem('messages')) || [];

  const newMessage = {
    id: 'msg_' + Date.now(),
    senderId,
    senderName,
    receiverId,
    receiverName,
    subject,
    body,
    date: new Date().toLocaleString(),
    read: false,
  };

  allMessages.push(newMessage);
  localStorage.setItem('messages', JSON.stringify(allMessages));
  alert('Message sent!');

  // Optionally redirect to inbox
  window.location.href = 'inbox.html';
}

// Initialize compose page form listener
function initCompose() {
  const form = document.getElementById('composeForm');
  if (!form) return;
  form.addEventListener('submit', sendMessage);
}

// Initialize inbox page
function initInbox() {
  renderInbox();
}

// Initialize message-view page if message id provided (e.g. via URL query param ?id=msg_123)
function initMessageView() {
  const params = new URLSearchParams(window.location.search);
  const messageId = params.get('id');
  if (messageId) {
    openMessage(messageId);
  }
}

// On DOM load, detect page and initialize accordingly
document.addEventListener('DOMContentLoaded', () => {
  if (document.body.classList.contains('inbox-page')) {
    initInbox();
  } else if (document.body.classList.contains('compose-page')) {
    initCompose();
  } else if (document.body.classList.contains('message-view-page')) {
    initMessageView();
  }
});
