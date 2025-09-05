// Client-side logic for the simple chat
const socket = io();

const authCard = document.getElementById('auth-card');
const chatCard = document.getElementById('chat-card');
const loginForm = document.getElementById('login-form');
const loginInput = document.getElementById('login-username');
const authError = document.getElementById('auth-error');
const logoutBtn = document.getElementById('logout-btn');

const meName = document.getElementById('me-name');
const messages = document.getElementById('messages');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');

// Handle login
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = loginInput.value.trim();
  if (!name) {
    authError.textContent = 'Введите логин';
    return;
  }
  socket.emit('login', name);
});

socket.on('login:success', (name) => {
  meName.textContent = name;
  authCard.style.display = 'none';
  chatCard.style.display = 'block';
});

// Handle incoming messages
socket.on('message', ({ username, text }) => {
  const li = document.createElement('li');
  li.textContent = `${username}: ${text}`;
  messages.appendChild(li);
  messages.scrollTop = messages.scrollHeight;
});

// Send a new message
messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = messageInput.value.trim();
  if (!text) return;
  socket.emit('message', text);
  messageInput.value = '';
});

// Logout and reset state
logoutBtn.addEventListener('click', () => {
  socket.disconnect();
  window.location.reload();
});

