const emojis = require('./emojis.json')
const sha256 = require('./sha256')

module.exports = (str, hashLength = 1) => {
  if (!str || hashLength < 1) {
    return ''
  }

  return sha256(str).then(hexHash => {
    const decimalHash = parseInt(hexHash, 16)
    let emojiIndex = decimalHash % Math.pow(emojis.length, hashLength)

    let emojiString = ''
    for (let ii = 0; ii < hashLength; ii++) {
      emojiString = `${emojis[emojiIndex % emojis.length]}${emojiString}`
      emojiIndex = Math.floor(emojiIndex / emojis.length)
    }

    return emojiString
  })
}
