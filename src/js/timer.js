class Timer {
  constructor () {
    this.timeLeft = 20
    this.elem = document.getElementById('countdown')
    this.timerID = setInterval(this.countdown(), 1000)
  }
  countdown () {
    if (this.timeLeft === -1) {
      clearTimeout(this.timerID)
      this.doSomething()
    } else {
      this.elem.innerHTML = this.timeLeft + ' seconds remaining'
      this.timeLeft--
    }
  }
  doSomething () {
    console.log('hello')
  }
}

export default Timer
