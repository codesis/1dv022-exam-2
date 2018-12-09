
const template = document.createElement('template')
template.innerHTML = /* html */ `
<div id="quiz"></div>
<div id="textbox">
    <input id="name" type="text" placeholder="Nickname"/>
    <button class="button">Start</button>
</div>
<div id="quizbox"></div>
<div id="results"></div>
<style>
  #textbox {
    padding: 5px;
  }
  .button {
    cursor: pointer;
  }
  #quizbox {
    background:white;
    color:black;
    width: 700px;
    height: 400px;
    border: 2px solid #5d9598;
    margin: auto;
    }
</style>
`

class QuizTime extends window.HTMLElement {
  constructor () {
    super()

    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }
  async getQuestion () {
    let question = await window.fetch('http://vhost3.lnu.se:20080/question/1')
    console.log(await question.json())
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
