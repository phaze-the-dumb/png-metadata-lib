# PNG Metadata Lib

`npm i github:phaze-the-dumb/png-metadata-lib`

Example:

```js
const { PNGImage } = require('png-metadata');

let png = new PNGImage('FILE BUFFER');

console.log(png)

/*
PNGImage {
  width: 2560,
  height: 1440,
  bitDepth: 8,
  colourType: 2,
  filterMethod: 0,
  interlaceMethod: 0,
  meta: {
    Description: {
      application: 'VRCX',
      version: 1,
      author: [Object],
      world: [Object],
      players: [Array]
    }
  }
}
*/
```
