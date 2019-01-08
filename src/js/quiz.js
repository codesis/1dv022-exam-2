// import { Question } from 'questions.js'
/**
 * @constructor
 * @param _input is for nickname and the questions requiring a written answer
 * @param _startButton & _submitButton is for when the button is clicked
 */
class QuizTime extends window.HTMLElement {
  constructor () {
    super()

    this.totalTime = 0
    this._input = document.querySelector('#name input')
    this._button = document.querySelector('#submit')
    this._sendButton = document.getElementById('send')
    this.nextURL = undefined
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
  // when clicking start, fetch first question if nickname value is correct
  async _onClickStart () {
    let nickName = document.querySelector('#name')
    let message = document.querySelector('#quiz p.nicknameText')

    let nameText = nickName.value

    if (nameText.length >= 3) {
      // if 3 or more characters, fetch first question
      this.obj = await window.fetch('http://vhost3.lnu.se:20080/question/1')
      this.obj = await this.obj.json()
      console.log(this.obj)
      // adding the question to the quiz
      document.getElementById('question').innerHTML = this.obj.question
      document.getElementById('quizbox-Start').style.visibility = 'hidden'
      document.getElementById('quizbox-Answer').style.visibility = 'visible'
      this.nextURL = this.obj.nextURL
      document.getElementById('name').value = ''
      document.getElementsByClassName('nicknameText').innerHTML = ''
    } else {
      message.innerHTML = 'You need to put in a minimum of 3 characters to proceed'
    }
  }
  // function to send the users answer/chosen alternative to the server
  async sendAnswer (e) {
    e.preventDefault()

    let answer = document.getElementById('answer').value
    let alternative = document.getElementById('alternative').value

    await window.fetch('http://vhost3.lnu.se:20080/answer/1', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ answer: answer, alternative: alternative })
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
  }
}
window.customElements.define('quiz-time', QuizTime)
