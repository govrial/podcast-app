import { authWithEmailAndPassword, getAuthForm } from './auth';
import { Question } from './question';
import './style.css';
import { createModal, isValid } from './utils';


window.addEventListener('load', Question.renderList)
const form = document.getElementById('form');
const submitBtn = form.querySelector('#submit');
const input = form.querySelector('#question-input');
const modalBtn = document.getElementById('modal-btn');

form.addEventListener('submit', submitFormHendler);
input.addEventListener('input', () => {
  submitBtn.disabled = !isValid(input.value);
})

modalBtn.addEventListener('click', openModal())

function submitFormHendler (e) {
  e.preventDefault();

  if(isValid(input.value)) {
    const question = {
      text: input.value.trim(),
      date: new Date().toJSON(),
    }

    submitBtn.disabled = true;
    //async request to server to save question
    Question.create(question)
    .then(() => {
      input.value = ''
      input.className = ''
      submitBtn.disabled = false;
    })
    

  }
}

function openModal() {
  createModal('Sign in', getAuthForm())
  document
    .getElementById('auth-form')
    .addEventListener('submit', authFormHandler, {once: true})

}

function authFormHandler(e) {
  e.preventDefault()

  const btn = e.target.querySelector('button')
  const email = e.target.querySelector('#email').value
  const password = e.target.querySelector('#password').value

  btn.disabled = true
  authWithEmailAndPassword(email, password)
  .then(Question.fetch)
  .then(renderModalAfterAuth)
  .then( () => btn.disabled = false)
}

function renderModalAfterAuth(content ) {
 if (typeof content === 'string') {
   createModal("Error", content)
 } else {
   createModal("Your questions", Question.listToHTML(content))
 }
}


