import { Question } from './questions.js'
import { Timer } from './timer.js'
import { Ajax } from './ajax.js'
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

    Ajax.request(config, respFunc)
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
  submit (e) {
    if (e.keyCode === 13 || e.which === 13 || e.type === 'click') {
      e.preventDefault()

      this.totalTime += this.timer.stopTimer()

      let input

      this.form.removeEventListener('keypress', this.submit.bind(this))
      this.button.removeEventListener('click', this.submit.bind(this))

      if (document.querySelector('#answer')) {
        input = document.querySelector('#answer').value
      } else {
        input = document.getElementsByName('alternative').checked.value
      }
      let config = {
        method: 'POST',
        url: this.nextURL,
        data: {
          answer: input
        }
      }
      let respFunc = this.response.bind(this)
      Ajax.request(config, respFunc)
    }
  }
  // handler for when user loses the game because of wrong answer or lack of time
  gameEnds (cause) {
    let hs = new Highscore(this.nickname, this.totalTime.toFixed(1))
    this.clearDiv(document.querySelector('#content'))

    let template = document.querySelector('#temp-gameEnds').content.cloneNode(true)

    let title
    if (cause === 'time') {
      title = document.createTextNode('Uh oh, time is up! You lose!')
    } else {
      title = document.createTextNode('Wrong! You lose!')
    }
    template.querySelector('h1').appendChild(title)

    if (hs.highscore.length > 0) {
      template.querySelector('h2').appendChild(document.createTextNode('Current highscore:'))
      let hsDoc = hs.highscoreDocument()
      template.querySelector('table').appendChild(hsDoc)
    }
    document.querySelector('#content').appendChild(template)
  }
  // handler for when user completed the quiz
  gameComplete () {

  }
}
window.customElements.define('quiz-time', QuizTime)
