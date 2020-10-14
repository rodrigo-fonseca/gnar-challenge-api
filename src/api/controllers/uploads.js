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

function get(req, res, next) {
  const mapped = _map(req.params)
  const instance = new Uploads()

  return instance.get(mapped).then(
    data => res.send({ data }),
    err => next(err)
  )
}

function filterByNotTitleRows(rows) {
  return rows.filter((_row, i) => i !== 0)
}

function _map({ id }) {
  const mapped = {}

  if (id) mapped.id = Number(id)

  return mapped
}

module.exports = {
  create,
  get,
}
