import { QuizTime } from './quiz.js'

let quiz

function submit (e) {
  if (e.type === 'click' || e.keyCode === 13 | e.which === 13) {
    e.preventDefault()

    let input = document.querySelector('#nickname').value

    if (input.length > 1) {
      quiz = new QuizTime()
    }
  }
}
let form = document.querySelector('#questionForm')
let button = document.querySelector('#submit')

form.addEventListener('keypress', submit, true)
button.addEventListener('click', submit, true)

document.querySelector('input').focus()

console.log(quiz)
