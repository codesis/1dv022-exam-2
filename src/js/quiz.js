// import { Question } from 'questions.js'
/**
 * @constructor
 * @param _input is for nickname and the questions requiring a written answer
 * @param _startButton & _submitButton is for when the button is clicked
 * @param _sendButton sends the users answer (the form) to the server
 */
class QuizTime extends window.HTMLElement {
  constructor () {
    super()

    this.totalTime = 0
    this._input = document.querySelector('#name input')
    this._button = document.querySelector('#submit')
    this._sendButton = document.getElementById('send')
    this.nextURL = undefined
    this.question = {}
    this.answer = {}

    this.getQuestion()
  }
  // when the start button is clicked, first do NOT refresh the page and then do onClick
  connectedCallback () {
    this._button.addEventListener('click', function (event) {
      event.preventDefault()
    })
    // this._button.addEventListener('click', this.nicknameText)
    this._button.addEventListener('click', this._onClickStart)
    this._sendButton.addEventListener('click', this.sendAnswer)
  }
  disconnectedCallback () {
    this.removeEventListener('click', this._onClickStart)
  }
  async getQuestion () {
    this.nextURL = 'http://vhost3.lnu.se:20080/question/1'

    this.question = await window.fetch(this.nextURL)
    this.question = await this.question.json()
    console.log(this.question)

    this.nextURL = this.question.nextURL
  }
  // when clicking start, fetch first question if nickname value is correct
  async _onClickStart () {
    let nickName = document.querySelector('#name')
    this.message = document.querySelector('#quiz p.nicknameText')

    let nameText = nickName.value

    if (nameText.length >= 3) {
      // if 3 or more characters, fetch first question
      window.getQuestion()
      document.getElementById('question').innerHTML = this.question.question
      document.getElementById('nicknameChosen').innerHTML = nameText
      document.getElementById('quizbox-Start').style.visibility = 'hidden'
      document.getElementById('quizbox-Answer').style.visibility = 'visible'
      document.getElementById('name').value = ''
      document.getElementsByClassName('nicknameText').innerHTML = ''
    } else {
      this.message.innerHTML = 'You need to put in a minimum of 3 characters to proceed'
    }
  }
  // function to send the users answer/chosen alternative to the server
  async sendAnswer (e) {
    e.preventDefault()

    let answer = document.getElementById('answer').value
    let alternative = document.getElementById('alternative').value
    this.message = document.querySelector('#question')

    await window.fetch(this.nextURL, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ answer: answer, alternative: alternative })
    })
      .then((res) => res.json())
      .then((obj) => {
        // correct answer, next question
        if (obj.message === 'Correct answer!') {
          window.fetch(obj.nextURL)
          console.log(obj)
        } else {
          // wrong answer, back to startpage
          this.message.style.color = 'red'
          this.message.innerHTML = 'WRONG! YOU LOSE'
          setTimeout(function () {
            window.location.reload()
          }, 2000)
        }
      })
  }
}
window.customElements.define('quiz-time', QuizTime)
