
const template = document.createElement('template')
template.innerHTML = /* html */ `
<style>
  :host {
    background: white;
    font-size; 14px;
    color: black;
    width: 50%;
    height: 300px;
    float: center;
  }
</style>
`

class QuizTime extends window.HTMLElement {
  constructor () {
    super()

    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }
  // start the quiz
  startQuiz () {
    let button = document.querySelector('#textbox button')
    button.addEventListener('click', function clickListener () {
      let nicknameValue = document.querySelector('#textbox input').value

      if (nicknameValue.length > 0) {
        let div = document.createElement('div')
        let 
      }
        
      }
    }
  }
  async getQuestion () {
    let question = await window.fetch('http://vhost3.lnu.se:20080/question/1')
    return question.json()
  }
  /**  let req = new window.XMLHttpRequest()
  req.addEventListener('load', function () {
    console.log(req.responseText)
  })
  req.open('GET', 'data.json')
  req.send()
  */
}

window.customElements.define('quiz-time', QuizTime)
