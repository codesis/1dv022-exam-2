// import { Question } from 'questions.js'
/**
 * @constructor
 * @param _input is for nickname and the questions requiring a written answer
 * @param _startButton & _submitButton is for when the button is clicked
 */
class QuizTime extends window.HTMLElement {
  constructor () {
    super()

    this._input = document.querySelector('#name input')
    this._startButton = document.querySelector('#start')
    this._submitButton = document.querySelector('#submit')
  }
  // when the start button is clicked, first do NOT refresh the page and then do onClick
  connectedCallback () {
    this._startButton.addEventListener('click', function (event) {
      event.preventDefault()
    })
    // this._button.addEventListener('click', this.nicknameText)
    this._startButton.addEventListener('click', this._onClickStart)
  }
  disconnectedCallback () {
    this.removeEventListener('click', this._onClickStart)
  }
  // async fetchQuestion () {
  //   let nextURL = this.obj.nextURL
  //   await window.fetch(nextURL)
  //     .then(response => response.json())
  //     .then(data => console.log(data))
  //     .catch(err => console.error(err))
  // }
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
      document.getElementById('name').innerHTML = ''
    } else {
      message.innerHTML = 'You need to put in more characters to proceed'
    }
  }
}
window.customElements.define('quiz-time', QuizTime)
