/**
 * @constructor
 * @param - {object} which holds the question
 */

function Question (obj) {
  this.id = obj.id
  this.question = obj.question
  this.alt = obj.alternatives
}
// check if question is alternative or answer type
Question.prototype.present = function () {
  if (this.alt) {
    this.presentAlt()
  } else {
    this.presentQuestion()
  }
  document.querySelector('input').focus()
}
