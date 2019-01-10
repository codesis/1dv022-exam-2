/**
 * Function to handle requests via XMLHttpRequest
 * @param config {object} - with a method and a url
 * @param callback {function} - to call when responding
 *
 */

function ajax (config, callback) {
  let req = new window.XMLHttpRequest()

  // first eventlistener, then see if we get an error (and which one)
  // callback returns the response to the request as text if successfull, or else null

  req.addEventListener('load', function () {
    if (req.status >= 400) {
      callback(req.status)
    }

    callback(null, req.responseText)
  })

  // open a request from the configuration we have
  req.open(config.method, config.url)

  // if the configuration has any data, send it as JSON to the server or else send our request
  if (config.data) {
    req.setRequestHeader('Content-Type', 'application/json')
    req.send(JSON.stringify(config.data))
  } else {
    req.send(null)
  }
}

export { ajax }
