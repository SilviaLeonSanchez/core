
var isstream = require('isstream')
  , length = require('@http/length')


function contentLength (req, options, done) {
  if (options.headers.get('transfer-encoding') === 'chunked' ||
      options.headers.get('content-length') !== undefined) {
    return done()
  }

  if (options.body && !options.multipart) {
    if (isstream(options.body)) {
      length.async(options.body, done)
    }
    else {
      done(length.sync(options.body))
    }
  }
  else if (req._src) {
    length.async(req._src, done)
  }
  else if (options.multipart) {
    length.multipart(options.body, done)
  }
}

module.exports = contentLength