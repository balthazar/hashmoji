const nodeSha = str =>
  new Promise(resolve => {
    const crypto = require('crypto')

    const hash = crypto.createHash('sha256')
    hash.update(`${str}`)

    resolve(hash.digest('hex'))
  })

module.exports = str => {
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    return nodeSha(str)
  }

  const msgBuffer = new TextEncoder().encode(str)

  return crypto.subtle.digest('SHA-256', msgBuffer).then(hashBuffer => {
    const hashArray = Array.from(new Uint8Array(hashBuffer))

    return hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('')
  })
}
