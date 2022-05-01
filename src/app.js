import { Question } from './question';
import './style.css';
import { isValid } from './utils';



const form = document.getElementById('form');
const submitBtn = form.querySelector('#submit');
const input = form.querySelector('#question-input');

form.addEventListener('submit', submitFormHendler);
input.addEventListener('input', () => {
  submitBtn.disabled = !isValid(input.value);
})

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


