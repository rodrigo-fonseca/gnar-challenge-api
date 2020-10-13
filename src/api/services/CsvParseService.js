const csv = require('csv-parse')
const { Duplex } = require('stream')

class CsvParseService {
  constructor(buffer) {
    this.buffer = buffer
  }

  parse() {
    const parsed = []

    return new Promise(resolve => {
      this._bufferToStream(this.buffer)
        .pipe(csv())
        .on('data', data => parsed.push(data))
        .on('end', () => resolve(parsed))
    })
  }

  _bufferToStream(buffer) {
    const tmp = new Duplex()

    tmp.push(buffer)
    tmp.push(null)

    return tmp
  }
}

module.exports = CsvParseService
