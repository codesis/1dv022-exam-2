/**
 * @constructor
 * @param - {object} which holds the question
 */
class Question {
  constructor (obj) {
    this.id = obj.id
    this.question = obj.question
    this.alt = obj.alternatives
  }
  // check if question is alternative or answer type
  present () {
    if (this.alt) {
      this.presentAlt()
    } else {
      this.presentQuestion()
    }
    document.querySelector('input').focus()
  }
  // remove last content so we can present a new question
  clearDiv (div) {
    while (div.hasChildNodes()) {
      div.removeChild(div.lastChild)
    }
  }
  // present the alternative question and its alternatives
  presentAlt () {
    let altQuestion = document.querySelector('#quizbox-Alt').content.cloneNode(true)
    altQuestion.querySelector('#question').appendChild(document.createTextNode(this.question))
    // call the handler for the questions alternatives
    let altChoices = this.altFragment()
    altQuestion.querySelector('#questionForm').insertBefore(altChoices, altQuestion.querySelector('#submit'))
    document.querySelector('#quizsrc').appendChild(altQuestion)
  }
  // handle the questions alternatives by documentfragment
  altFragment () {
    let altChoices = document.createDocumentFragment()
    let first = true
    let input
    let label
    for (let alt in this.alt) {
      if (this.alt.hasOwnProperty(alt)) {
        input = document.querySelector('#quizbox-Alt').content.cloneNode(true)
        if (first) {
          input.querySelector('input').setAttribute('checked', 'checked')
          first = false
        }
        input.querySelector('input').setAttribute('value', alt)
        label = input.querySelector('label')
        label.appendChild(document.createTextNode(this.alt[alt]))
        altChoices.appendChild(input)
      }
    }
    return altChoices
  }
  // present answer-typed questions
  presentQuestion () {
    let answerQuestion = document.querySelector('#quixbox-Answer').content.cloneNode(true)
    answerQuestion.querySelector('#question').appendChild(document.createTextNode(this.question))
    document.querySelector('#quizsrc').appendChild(answerQuestion)
  }
}

export default Question
