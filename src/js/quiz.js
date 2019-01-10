import { Question } from './questions.js'
import { Timer } from './timer.js'
import { ajax } from './ajax.js'
import { Highscore } from './highscore.js'
/**
 * @constructor
 */
class QuizTime extends window.HTMLElement {
  constructor (nickname) {
    super()

    this.totalTime = 0
    this.nickname = nickname
    this.button = undefined
    this.timer = undefined
    this.form = undefined
    this.question = undefined
    this.nextURL = 'http://vhost3.lnu.se:20080/question/1'
  }
  // our eventlisteners for the form and the submit button
  listener () {
    this.form = document.querySelector('#questionForm')
    this.button = document.querySelector('#submit')

    this.form.addEventListener('keypress', this.submit.bind(this))
    this.button.addEventListener('click', this.submit.bind(this))
  }
  // function to request questions
  getQuestion () {
    let config = {
      method: 'GET',
      url: this.nextURL
    }
    let respFunc = this.response.bind(this)

    ajax.request(config, respFunc)
  }
  // handler for our response, if error or if response
  response (error, response) {
    if (error) {
      this.gameEnds()
    }
    if (response) {
      let obj = JSON.parse(response)
      this.nextURL = obj.nextURL

      if (obj.question) {
        this.respQuestion(obj)
      } else {
        if (this.nextURL || obj.message === 'Correct answer!') {
          this.respAnswer(obj)
        }
      }
    }
  }
  // handler for if our response is a question
  respQuestion (obj) {
    let content = document.querySelector('#content')
    this.clearDiv(content)

    this.question = new Question(obj)
    this.question.present()

    this.timer = new Timer(this, document.querySelector('#timer h1'), 20)
    this.timer.startTimer()

    this.listener()
  }
  // handler for when the response is an answer
  respAnswer (obj) {
    let content = document.querySelector('#content')
    this.clearDiv(content)

    let text = document.createTextNode(obj.message)
    let template = document.querySelector('#temp-answer').content.cloneNode(true)

    template.querySelector('p').appendChild(text)

    content.appendChild(template)
    // if we have a nextURL, wait 1 second before showing. if not, game is completed
    if (this.nextURL) {
      let nextQuestion = this.getQuestion.bind(this)
      setTimeout(nextQuestion, 1000)
    } else {
      this.gameComplete()
    }
  }
  // handler for when clicking on submit button or using enter (key)
  submit (e) {
    if (e.keyCode === 13 || e.which === 13 || e.type === 'click') {
      e.preventDefault()
      // when this happens stop the timer
      this.totalTime += this.timer.stopTimer()

      let input
      // remove our eventlistener so the user dont double submit
      this.form.removeEventListener('keypress', this.submit.bind(this))
      this.button.removeEventListener('click', this.submit.bind(this))
      // checks wether the user has typed the answer or chosen one alt
      if (document.querySelector('#answer')) {
        input = document.querySelector('#answer').value
      } else {
        input = document.getElementsByName('alternative').checked.value
      }
      // configuring the configuration for when we send the user's answer
      let config = {
        method: 'POST',
        url: this.nextURL,
        data: {
          answer: input
        }
      }
      let respFunc = this.response.bind(this)
      ajax.request(config, respFunc)
    }
  }
  // handler for when user loses the game because of wrong answer or lack of time
  gameEnds (cause) {
    let hs = new Highscore(this.nickname, this.totalTime.toFixed(1))
    this.clearDiv(document.querySelector('#content'))

    let template = document.querySelector('#gameEnds').content.cloneNode(true)

    let title
    // if the cause is loss of time or else
    if (cause === 'time') {
      title = document.createTextNode('Uh oh, time is up! You lose!')
    } else {
      title = document.createTextNode('Wrong! You lose!')
    }
    template.querySelector('h1').appendChild(title)
    // if there is already inputs on our highscore, show them
    if (hs.highscore.length > 0) {
      template.querySelector('h2').appendChild(document.createTextNode('Current highscore:'))
      let hsDoc = hs.highscoreDocument()
      template.querySelector('table').appendChild(hsDoc)
    }
    document.querySelector('#content').appendChild(template)
  }
  // handler for when user completed the quiz
  gameComplete () {
    let hs = new Highscore(this.nickname, this.totalTime.toFixed(1))
    let template = document.querySelector('#quizFinished').content.cloneNode(true)

    if (hs.highscore.length > 0) {
      template.querySelector('.hs-title').appendChild(document.createTextNode('Current highscore:'))
      let hsDoc = hs.highscoreDocument()
      template.querySelector('table').appendChild(hsDoc)
    }
    if (hs.addToFile()) {
      let newScore = document.createElement('h1')
      newScore.appendChild(document.createTextNode('New highscore!!'))
      let div = template.querySelector('div')
      div.insertBefore(newScore, div.firstChild)
    }
    this.clearDiv(document.querySelector('#content'))

    let h3 = template.querySelector('.time')
    let text = document.createTextNode(this.totalTime.toFixed(1))
    h3.appendChild(text)

    document.querySelector('#content').appendChild(template)
  }
  // clearing a div of choice
  clearDiv (div) {
    while (div.hasChildNodes()) {
      div.removeChild(div.lastChild)
    }
  }
}
window.customElements.define('quiz-time', QuizTime)

export { QuizTime }
