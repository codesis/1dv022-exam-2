// import Timer from './timer.js'
// template for shadow dom
// const template = document.createElement('template')
// template.innerHTML = /* html */ `
// <div id="quiz">
// <div id="textbox">
// <form id="questionForm">
//     <input id="name" type="text" placeholder="Nickname"/>
//     <button class="button">Start</button>
//     </form>
// </div>
// </div>

// <style>
//   #textbox {
//     padding: 25px;
//   }
//   #name {
//     width: 100px;
//     height: 30px;
//     border-radius: 5px;
//     font-size: 20px;
//   }
//   .button {
//     cursor: pointer;
//     background-color: #5d9598;
//     color: #ffe4e1;
//     font-size: 20px;
//     width: 100px;
//     height: 35px;
//     border-radius: 5px;
//   }
// </style>
// `
/**
 * @constructor
 * @param _input is for nickname and the questions requiring a written answer
 * @param _button is for when the button is clicked
 */
class QuizTime extends window.HTMLElement {
  constructor () {
    super()

    // this.attachShadow({ mode: 'open' })
    // this.shadowRoot.appendChild(template.content.cloneNode(true))
    this._input = document.querySelector('#name input')
    this._button = document.querySelector('.button')
    this.submitButton = document.querySelector('#choice')
  }
  // when the start button is clicked, first do NOT refresh the page and then do onClick
  connectedCallback () {
    this._button.addEventListener('click', function (event) {
      event.preventDefault()
    })
    this._button.addEventListener('click', this.nicknameText)
    // this._button.addEventListener('click', this._onClickSubmit)
  }
  disconnectedCallback () {
    this.removeEventListener('click', this._onClickStart)
  }
  nicknameText () {
    let nicknameBox = document.querySelector('#name')
    let nickName = nicknameBox
    let message = document.querySelector('#quiz p.nicknameText')

    let nameText = nickName.value

    if (nameText.length >= 3) {
      message.innerHTML = 'Valid nickname'
    } else {
      message.innerHTML = 'You need to put in more characters to proceed'
    }
  }

  // when clicking submit, fetch first question
  async _onClickSubmit () {
    this.obj = await window.fetch('http://vhost3.lnu.se:20080/question/1')
    this.obj = await this.obj.json()
    console.log(this.obj)
    // adding the question to the quiz
    document.getElementById('question').innerHTML = this.obj.question
  }
  // when submitting, client-data will be sent to the server
  // _onSubmit (event) {
  //   if (event.type === 'click') {
  //     event.preventDefault()
  //   }
  // }
}

window.customElements.define('quiz-time', QuizTime)
