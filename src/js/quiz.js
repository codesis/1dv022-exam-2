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
    this._input = this.shadowRoot.querySelector('#name')
    this._button = this.shadowRoot.querySelector('.button')
    this._url = 'http://vhost3.lnu.se:20080/question/1'
    this._minInput = this._input.value
  }
  connectedCallback () {
    this._button.addEventListener('click', e => {
      if (this._minInput.length > 2) {
        console.log('okay')
      } else {
        console.log('error')
      }
    })
  }
  openSesame () {
    this._button.addEventListener('click', e => {
      if (this._minInput.length > 2) {
      }
    })
  }
  async getQuestion (str) {
    let question = await window.fetch(this._url)
    return question.json()
  }
}

/** async getQuestion () {
    let question = await window.fetch('http://vhost3.lnu.se:20080/question/1')
    return question.json()
  }
    let req = new window.XMLHttpRequest()
  req.addEventListener('load', function () {
    console.log(req.responseText)
  })
  req.open('GET', 'data.json')
  req.send()
  */

window.customElements.define('quiz-time', QuizTime)
