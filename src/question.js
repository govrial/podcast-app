export class Question {
  static create(question) {
    return fetch("https://podcast-app-27558-default-rtdb.europe-west1.firebasedatabase.app/questions.json", {
      method: 'POST',
      body: JSON.stringify(question),
      headers: {
        'Content-Type': 'application-json'
      }
    })
    .then( response => response.json())
    .then( response => {
     question.id = response.name;
     return question
    })
    .then(addToLocalStorage)
    .then(Question.renderList)
  }

  static renderList() {
    const questions = getLocalStorageQuestions();

    const html = questions.length 
    ? questions.map(toCard).join('') 
    : `<div class="mui--text-black-54 mui--text-body2">Empty</div>`

    const list = document.getElementById('list');
    list.innerHTML = html;
  }
}

function addToLocalStorage(question) {
  const allQuestions = getLocalStorageQuestions();
  allQuestions.push(question)
  localStorage.setItem('questions', JSON.stringify(allQuestions))
}

function getLocalStorageQuestions() {
  return JSON.parse(localStorage.getItem('questions') || '[]')
}

function toCard(question) {
  return `
  <div class="mui--text-black-54 mui--text-body2">
  ${new Date(question.date).toLocaleDateString()}
  ${new Date(question.date).toLocaleTimeString()}
  </div>
  <div class="mui--text-headline">${question.text}</div>
  `
}