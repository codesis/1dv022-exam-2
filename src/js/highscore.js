/**
 * @constructor for the highscore
 * @param checkscore for the locally stored highscore
 * @param setHighscore to set nickname on list

 */
class HighScore extends window.HTMLElement() {
  constructor (nickname, score, server) {
    super()

    this.nickname = nickname
    this.score = score
    this.server = server
    this.highscore = []

    this.fetchFileData()
  }
  // Function to read the highscore file
  fetchFileData () {
    let hsData = window.localStorage.getItem('hs-' + this.server)

    if (hsData) {
      let json = JSON.parse(hsData)

      for (let nickname in json) {
        if (json.hasOwnProperty(nickname)) {
          this.highscore.push(json[nickname])
        }
      }
    }
  }
  // Functions checks wether user make it to the highscore or not
  ifOnHighscore () {
    let ifHighscore = false

    if (this.highscore.length === 0) {
      ifHighscore = true
    } else {
      // check the last submitted score on the highscore
      let prevScore = this.highscore[this.highscore.length - 1].score
      // if the score is greater than the last score on list or if highscore has less than 5 submits
      if (parseFloat(this.score) < parseFloat(prevScore) || this.highscore.length < 5) {
        ifHighscore = true
      }
    }
    return ifHighscore
  }
  // Function for putting a new highscore on the list
  addNewHighscore () {
    let added = false
    // if a new hs will be on the list
    if (this.ifHighscore()) {
      let newScore = {
        nickname: this.nickname,
        score: this.score
      }
      // incase of hs having 5 already, delete last place
      if (this.highscore.length === 5) {
        this.highscore.splice(-1, 1)
      }
      // sort the hs array before adding/saving the hs file
      this.highscore.push(newScore)
      this.highscore = this.highscore.sort((a, b) => a.score - b.score)

      this.addToFile()

      added = true
    }
    return added
  }
  // saving the highscore to local storage in JSON
  addToFile () {
    window.localStorage.setItem('hs-' + this.server, JSON.stringify(this.highscore))
  }
}

window.customElements.define('high-score', HighScore)
