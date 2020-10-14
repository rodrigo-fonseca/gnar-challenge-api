const CsvParseService = require('api/services/CsvParseService')
const error = require('api/services/core/error')
const Uploads = require('api/models/Uploads')

async function create(req, res, next) {
  try {
    const { file, filename } = _map(req)
    const csvParseService = new CsvParseService(file.buffer)
    const parsed = await csvParseService.parse()
    const filtered = filterByNotTitleRows(parsed)
    const instance = new Uploads()

    return instance.add({ list: filtered, filename }).then(
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

function _map({ id, file }) {
  const mapped = {}

  if (id) mapped.id = Number(id)
  if (file) {
    mapped.file = file
    if (file.originalname) mapped.filename = file.originalname
  }

  return mapped
}

module.exports = {
  create,
  get,
}
