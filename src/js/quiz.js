// template for shadow dom
const template = document.createElement('template')
template.innerHTML = /* html */ `
<div id="quiz"></div>
<div id="textbox">
    <input id="name" type="text" placeholder="Nickname"/>
    <button class="button">Start</button>
</div>

<style>
  #textbox {
    padding: 5px;
  }
  .button {
    cursor: pointer;
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
  }
  // when the start button is clicked, do onClick
  connectedCallback () {
    this._button.addEventListener('click', this._onClick)
  }
  disconnectedCallback () {
    this.removeEventListener('click', this._onClick)
  }
  // when clicking start, fetch first question
  async _onClick () {
    this.obj = await window.fetch('http://vhost3.lnu.se:20080/question/1')
    this.obj = await this.obj.json()
    console.log(this.obj)
    // adding the question to the quiz
    document.getElementById('question').innerHTML = this.obj.question
  }
  createQuestion () {
  }
  // when submitting, client-data will be sent to the server
  async _onSubmit () {
    this.answer = await window.fetch('', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        answer: document.getElementById('#answer').value
      })
    })
  }
}

window.customElements.define('quiz-time', QuizTime)
