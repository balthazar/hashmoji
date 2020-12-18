const test = require('ava')

const hashmoji = require('../src')
const emojis = require('../src/emojis.json')

const hashes = {
  '❄️': {
    1: '🇸🇸',
    2: '🏌🏼‍♀️🇸🇸',
    5: '💈♓️🦤🎦👩‍✈️',
  },
  haha: {
    1: '🌸',
    2: '💌🌸',
    5: '📓🧜🏿‍♀️👩🏾‍💼🟫👂🏼',
  },
  'yol🍔': {
    1: '💃🏼',
    2: '🏃🏾💃🏼',
    5: '🛶👩🏻‍🏫🐛🚴🏿‍♂️👨🏼‍🍳',
  },
  hashmoji: {
    1: '🧑🏾‍⚕️',
    2: '🏋🏽🧑🏾‍⚕️',
    5: '⚾️🏃🏽‍♀️🎷🧗🏽‍♀️⚫️',
  },
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua': {
    1: '⛹🏾‍♂️',
    2: '⏹️⛹🏾‍♂️',
    5: '🪶🥷📱👮🏻‍♂️🐶',
  },
}

const hashesKeys = Object.keys(hashes)

test('Should have more than 1200 emojis', t => {
  t.truthy(emojis.length > 1200)
})

test('Should have only unique emojis', t => {
  const unique = emojis.filter((el, i) => emojis.indexOf(el) === i)

  t.is(unique.length, emojis.length)
})

test('emojis with default length', async t => {
  for (const key of hashesKeys) {
    const out = await hashmoji(key)
    t.is(out, hashes[key][1], `${key} should be ${hashes[key][1]}`)
  }
})

test('emojis with defined lengths', async t => {
  for (const hashLength of [2, 5]) {
    for (const key of hashesKeys) {
      const out = await hashmoji(key, hashLength)
      const expected = hashes[key][hashLength]
      t.is(out, expected, `${key} with ${hashLength} should be ${expected}`)
    }
  }
})

test('error handling', async t => {
  t.is(hashmoji(), '')
  t.is(hashmoji(null), '')
  t.is(hashmoji('lol', 0), '')
  t.is(hashmoji('lol', -3), '')

  const big = await hashmoji('yo', 40)
  t.is(
    big,
    '0️⃣0️⃣0️⃣0️⃣0️⃣0️⃣0️⃣0️⃣0️⃣0️⃣0️⃣0️⃣0️⃣0️⃣0️⃣0️⃣0️⃣1️⃣🕰️🇰🇭👊🏿🎸📑👰🏻🏋🏻‍♀️🧖🏻‍♀️🧑🏾‍🔧🇹🇼🧑🏾‍⚕️🛌🏾👨🏽‍🦳👨🏽‍🦱🚶🏻👩🏽‍🚒☣️🔛🎰🇯🇾👮🏽‍♂️',
  )
})
