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
  createModal('Sign in', '<h1>Test</h1>')
}


