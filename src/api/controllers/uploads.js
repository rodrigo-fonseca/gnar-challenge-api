const CsvParseService = require('api/services/CsvParseService')
const error = require('api/services/core/error')
const Uploads = require('api/models/Uploads')

async function create(req, res, next) {
  try {
    const csvParseService = new CsvParseService(req.file.buffer)
    const parsed = await csvParseService.parse()
    const filtered = filterByNotTitleRows(parsed)
    const instance = new Uploads()

    return instance.add(filtered).then(
      data => res.send({ data }),
      err => next(err)
    )
  } catch (e) {
    return next(new error.InternalServerError(e))
  }
}

function filterByNotTitleRows(rows) {
  return rows.filter((_row, i) => i !== 0)
}

module.exports = {
  create,
}
