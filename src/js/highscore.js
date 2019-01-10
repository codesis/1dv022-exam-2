/**
 * @constructor for the highscore
 * @param fetchFileData reads the hs file
 * @param ifOnHighscore checks wether user makes it or not to hs list
 * @param addNewHighscore puts new score on the hs list
 * @param addToFile saves the hs file when new score is added
 * @param highscoreDocument the document for the hs list
 */
class Highscore {
  constructor (nickname, time) {
    this.nickname = nickname
    this.time = time
    this.highscore = []

    this.fetchFileData()
  }
  // Function to read the highscore file
  fetchFileData () {
    let hsData = window.localStorage.getItem('hs')

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
      let prevScore = this.highscore[this.highscore.length - 1].time
      // if the time is faster than the last time on list or if highscore has less than 5 submits
      if (this.time < prevScore || this.highscore.length < 5) {
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
        time: this.time
      }
      // incase of hs having 5 already, delete last place
      if (this.highscore.length === 5) {
        this.highscore.splice(-1, 1)
      }
      // sort the hs array before adding/saving the hs file
      this.highscore.push(newScore)
      this.highscore = this.highscore.sort((a, b) => a.time - b.time)

      this.addToFile()

      added = true
    }
    return added
  }
  // saving the highscore to local storage in JSON
  addToFile () {
    window.localStorage.setItem('hs', JSON.stringify(this.highscore))
  }
  // the document holding the highscore
  highscoreDocument () {
    let doc = document.createDocumentFragment()
    let div
    let hsName
    let hsTime

    for (let i = 0; i < this.highscore.length; i += 1) {
      div = document.querySelector('#quizbox-Highscore').content.cloneNode(true)
      hsName = div.querySelector('.hs-nickname')
      hsTime = div.querySelector('.hs-time')

      hsName.appendChild(document.createTextNode(this.highscore[i].nickname))
      hsTime.appendChild(document.createTextNode(this.highscore[i].time))

      doc.appendChild(div)
    }
    return doc
  }
}

export { Highscore }
