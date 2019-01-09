import { Question } from './questions.js'
import { Timer } from './timer.js'
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
    this.nextURL = 'http://vhost3.lnu.se:20080/question/21'
    this._onClickStart = this._onClickStart.bind(this)
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
  // when clicking start, call getQuestion() if nickname value is correct
  _onClickStart () {
    let nickName = document.querySelector('#name')
    this.message = document.querySelector('#quiz p.nicknameText')

    let nameText = nickName.value

    if (nameText.length >= 3) {
      // if 3 or more characters, fetch first question
      this.getQuestion()
      // adding the question to the quiz
      document.getElementById('nicknameChosen').innerHTML = nameText
      document.getElementById('quizbox-Start').style.visibility = 'hidden'
      document.getElementById('quizbox-Answer').style.visibility = 'visible'
      document.getElementById('name').value = ''
      document.getElementsByClassName('nicknameText').innerHTML = ''
    } else {
      this.message.innerHTML = 'You need to put in a minimum of 3 characters to proceed'
    }
  }
  // function to fetch questions
  async getQuestion () {
    this.question = await window.fetch(this.nextURL)
    this.question = await this.question.json()
    this.nextURL = this.question.nextURL
    console.log(this.question)

    document.getElementById('question').innerHTML = this.question.question

    if (this.question.alternatives) {
      this.presentAlt()
    } else {
      this.presentQuestion()
    }
  }
  // function to send the users answer/chosen alternative to the server
  async sendAnswer () {
    let input
    if (document.querySelector('#answer')) {
      input = document.querySelector('#answer').value
    } else {
      input = document.querySelector('#alternative:checked').value
    }
    this.message = document.querySelector('#question')

    await window.fetch('http://vhost3.lnu.se:20080/answer/21', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ answer: input })
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
  presentAlt () {
    document.getElementById('quizbox-Alt').style.visibility = 'visible'
    document.getElementById('quizbox-Answer').style.visibility = 'hidden'
  }
  presentQuestion () {
    // let answerQuestion = document.querySelector('#quixbox-Answer')
    // answerQuestion.querySelector('#question').appendChild(document.createTextNode(this.question))
    // document.querySelector('#quizsrc').appendChild(answerQuestion)
    document.getElementById('quizbox-Alt').style.visibility = 'hidden'
    document.getElementById('quizbox-Answer').style.visibility = 'visible'
  }
}
window.customElements.define('quiz-time', QuizTime)
