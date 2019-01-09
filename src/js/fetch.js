class fetchingTime {
  constructor () {
    this.nextURL = 'http://vhost3.lnu.se:20080/question/1'
  }
  // function to send the users answer/chosen alternative to the server
  async fetchQuestion () {
    let response = await window.fetch(this.nextURL)
    let data = await response.json()

    this.nextURL = data.nextURL

    console.log(this.nextURL)
  }
  async sendAnswer () {
    let input
    if (document.querySelector('#answer')) {
      input = document.querySelector('#answer').value
    } else {
      input = document.querySelector('#alternative:checked').value
    }

    await window.fetch(this.nextURL, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ answer: input })
    })
      .then((res) => res.json())
      .then((obj) => {
      // correct answer, next question
        if (obj.message === 'Correct answer!') {
          window.fetch(obj.nextURL)
          console.log(obj)
        } else {
        // wrong answer, back to startpage
          this.message.style.color = 'red'
          this.message.innerHTML = 'WRONG! YOU LOSE'
          setTimeout(function () {
            window.location.reload()
          }, 2000)
        }
      })
  }
}
export { fetchingTime }
