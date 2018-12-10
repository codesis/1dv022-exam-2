import Timer from './timer.js'
// template for shadow dom
const template = document.createElement('template')
template.innerHTML = /* html */ `
<div id="quiz">
<div id="textbox">
<form id="questionForm">
    <input id="name" type="text" placeholder="Nickname"/>
    <button class="button">Start</button>
    </form>
</div>
</div>

<style>
  #textbox {
    padding: 25px;
  }
  #name {
    width: 100px;
    height: 30px;
    border-radius: 5px;
    font-size: 20px;
  }
  .button {
    cursor: pointer;
    background-color: #5d9598;
    color: #ffe4e1;
    font-size: 20px;
    width: 100px;
    height: 35px;
    border-radius: 5px;
  }
</style>
`
/**
 * @constructor
 */
class QuizTime extends window.HTMLElement {
  constructor () {
    super()

    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this._input = this.shadowRoot.querySelector('#name input')
    this._button = this.shadowRoot.querySelector('.button')
    this.submitButton = document.querySelector('#choice')
  }
  // when the start button is clicked, do onClick
  connectedCallback () {
    this._button.addEventListener('click', this._onClickStart)
    this.submitButton.addEventListener('click', this._onSubmit)
  }
  disconnectedCallback () {
    this.removeEventListener('click', this._onClickStart)
  }
  // when clicking start, fetch first question
  async _onClickStart () {
    this.obj = await window.fetch('http://vhost3.lnu.se:20080/question/1')
    this.obj = await this.obj.json()
    console.log(this.obj)
    // adding the question to the quiz
    document.getElementById('question').innerHTML = this.obj.question

    this.timer = new Timer()
  }
  // when submitting, client-data will be sent to the server
  _onSubmit (event) {
    if (event.type === 'click') {
      event.preventDefault()
    }
  }
}

window.customElements.define('quiz-time', QuizTime)
