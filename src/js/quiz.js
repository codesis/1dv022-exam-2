class QuizTime extends HTMLElement {
  constructor () {
    super()
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
