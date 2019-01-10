/**
 * @constructor for the highscore
 * @param fetchFileData reads the hs file
 * @param ifOnHighscore checks wether user makes it or not to hs list
 * @param addNewHighscore puts new score on the hs list
 * @param addToFile saves the hs file when new score is added
 * @param highscoreDocument the document for the hs list
 */
class Highscore {
  constructor (nickname, score) {
    this.nickname = nickname
    this.score = score
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
    let ifOnHighscore = false

    if (this.highscore.length === 0) {
      ifOnHighscore = true
    } else {
      // check the last submitted score on the highscore
      let prevScore = this.highscore[this.highscore.length - 1].score
      // if the time is faster than the last time on list or if highscore has less than 5 submits
      if (this.score < prevScore || this.highscore.length < 5) {
        ifOnHighscore = true
      }
    }
    return ifOnHighscore
  }
  // Function for putting a new highscore on the list
  addNewHighscore () {
    let added = false
    // if a new hs will be on the list
    if (this.ifOnHighscore()) {
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
    window.localStorage.setItem('hs', JSON.stringify(this.highscore))
  }
  // the document holding the highscore
  highscoreDocument () {
    let doc = document.createDocumentFragment()
    let template
    let hsName
    let hsScore

    for (let i = 0; i < this.highscore.length; i += 1) {
      template = document.querySelector('#highscoreList').content.cloneNode(true)
      hsName = template.querySelector('.hs-nickname')
      hsScore = template.querySelector('.hs-score')

      hsName.appendChild(document.createTextNode(this.highscore[i].nickname))
      hsScore.appendChild(document.createTextNode(this.highscore[i].score))

      doc.appendChild(template)
    }
    return doc
  }
}

export { Highscore }
