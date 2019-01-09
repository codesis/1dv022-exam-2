/**
 * Timer class
 * @constructor
 * @param time {number} - countdown time
 * @param elem {object} - element to which we print the timer
 * @param owner {object} - object that created the timer
 */
class Timer {
  constructor (time, elem, owner) {
    this.time = time
    this.elem = elem
    this.owner = owner
    this.startTime = new Date().getTime()
    this.interval = undefined
  }
  // starts the interval of the timer
  startTimer () {
    this.interval = setInterval(this.run.bind(this), 100)
  }
  // function for each interval
  run () {
    let now = new Date().getTime()
    let diff = (now - this.startTime) / 1000
    let showTime = this.time - diff

    if (diff >= this.time) {
      showTime = 0
      clearInterval(this.interval)
      this.owner.gameOver('time')
    }
    if (showTime <= 10) {
      this.printTime(showTime.toFixed(1))
    } else {
      this.printTime(showTime.toFixed(0))
    }
  }
  // function to stop the timer before it has reached 0
  stopTimer () {
    clearInterval(this.interval)
    let now = new Date().getTime()

    return (now - this.startTime) / 1000
  }
  // function to print the timer to the element
  printTime (diff) {
    this.elem.replaceChild(document.createTextNode(diff), this.elem.firstChild)
  }
}

export { Timer }
