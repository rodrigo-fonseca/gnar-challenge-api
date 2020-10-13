const CsvParseService = require('api/services/CsvParseService')

async function create(req, res, next) {
  const csvParseService = new CsvParseService(req.file.buffer)
  const parsed = await csvParseService.parse()

  console.info('parsed :>> ', parsed)
}

module.exports = {
  create,
}
