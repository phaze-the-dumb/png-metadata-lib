class PNGImage{
  /***
   * @param {Buffer} buffer
   */
  constructor( buff ){
    this.width = null;
    this.height = null;
    this.bitDepth = null;
    this.colourType = null;
    this.compressionMethod = null;
    this.filterMethod = null;
    this.interlaceMethod = null;
    this.meta = {};

    // Check for 8-byte signature, if it doesn't have it then its not a png.
    if(
      buff[0] !== 0x89 || buff[1] !== 0x50 || buff[2] !== 0x4E || buff[3] !== 0x47 ||
      buff[4] !== 0x0D || buff[5] !== 0x0A || buff[6] !== 0x1A || buff[7] !== 0x0A
    ) throw new Error('Not a PNG file');

    this.readPngChunk(8, buff);
  }

  /***
   * @param {Number} startByte
   * @param {Buffer} buffer
   */
  readPngChunk( startByte, buffer ){
    let buff = buffer.subarray(startByte, buffer.length);
    
    let length = this.readNum(buff.subarray(0, 4));
    let type = String.fromCharCode(...buff.subarray(4, 8));

    switch(type){
      case 'IHDR':
        this.width = this.readNum(buff.subarray(8, 12));
        this.height = this.readNum(buff.subarray(12, 16));
        this.bitDepth = buff[16];
        this.colourType = buff[17];
        this.compressionMethod = buff[18];
        this.filterMethod = buff[19];
        this.interlaceMethod = buff[20];

        // I'll probably do checksums at some point, cba right now
        break;
      case 'iTXt':
        let d = String.fromCharCode(...buff.subarray(8, 8 + length)).split("\x00");
        d = d.filter(x => x !== '');

        try{
          this.meta[d[0]] = JSON.parse(d[1]);
        } catch(e){
          this.meta[d[0]] = d[1];
        }

        break;
    }

    if(type !== 'IEND')
      this.readPngChunk(length + 12, buff);
  }

  /***
   * @param {Array<Number>} hex
   */
  readNum( hex ){
    let num = 0;

    for(let i = 0; i < hex.length; i++)
      num += hex[i] * Math.pow(16, (i - hex.length + 1) * -2);

    return num;
  }
}

module.exports = { PNGImage }