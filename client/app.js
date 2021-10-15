const socket = io();

socket.on('message', ({ author, content }) => addMessage(author, content));


'use strict';

const loginForm = document.querySelector('#welcome-form');
const messagesSection = document.querySelector('#messages-section');
const messagesList = document.querySelector('#messages-list');
const addMessageForm = document.querySelector('#add-messages-form');
const userNameInput = document.querySelector('#username');
const messageContentInput = document.querySelector('#message-content');
// console.log(messageContentInput);

let userName;

function login(event) {
  event.preventDefault();
  if (userNameInput.value === '') {
    alert('Uzupełnij pole nazwy');
  } else {
    userName = userNameInput.value;
    loginForm.classList.remove('show');
    messagesSection.classList.add('show');
  }
}

function addMessage(author, content) {
  // mój pomysł na ten kod
  // let list = document.createElement('li');
  // let heading = document.createElement('h3');
  // let message = document.createElement('div');
  // messagesList.appendChild(list);
  // list.appendChild(heading);
  // list.appendChild(message);
  // heading.innerHTML = { author };
  // message.innerHTML = { textMessage };

  const message = document.createElement('li');
  message.classList.add('message');
  message.classList.add('message--received');
  if (author == userName) message.classList.add('message--self');
  message.innerHTML = `
      <h3 class="message__author">${userName === author ? 'You' : author}</h3>
      <div class="message__content">
        ${content}
      </div>
    `;
  messagesList.appendChild(message);

}

loginForm.addEventListener('submit', login);
addMessageForm.addEventListener('submit', function sendMessage(event) {
  event.preventDefault();
  let messageContent = messageContentInput.value;
  if (messageContent === '') {
    alert('Uzupełnij pole wiadomości');
  } else {
    addMessage(userName, messageContent);
    socket.emit('message', { author: userName, content: messageContent });
    messageContent = '';
  }
});