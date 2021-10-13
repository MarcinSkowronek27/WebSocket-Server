{
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
    if (userNameInput === '') {
      alert('Uzupełnij pole nazwy');
    } else {
      userName = userNameInput;
      loginForm.classList.remove('show');
      messagesSection.classList.add('show');
    }
  }

  loginForm.addEventListener('submit', login());
}