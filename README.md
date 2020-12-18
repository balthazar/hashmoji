# hashmoji

> Transform a string into an emoji representation

Supports 3360+ emojis per Unicode 13 spec.

### Install

    yarn add hashmoji

### Usage

Consistent API on both node through the crypto module and browsers with Web Cryptography (not supported on IE 11 and Opera mini 💩🤣🖕😂💦👃)

```js
const hashmoji = require('hashmoji')

await hashmoji('sushi')
🕴🏼

await hashmoji('balthazar', 5)
🇹🇱👵🏻🚶‍♂️♂️🚴🏻‍♂️
```

##### Mentions

Inspired by hash-emoji.
