const dbService = require('api/services/core/dbService')
const sequelize = require('api/services/core/sequelize')

class Uploads {
  constructor() {
    this.model = this._getModel()
  }

  create({ yardCode, employeeCode, clockIn, clockOut, filename }) {
    const { model } = this
    const data = {
      yardCode,
      employeeCode,
      clockIn,
      clockOut,
      filename,
    }

    return dbService.create({ model, data })
  }

  _getModel() {
    return sequelize.getModel('Uploads')
  }
}

module.exports = Uploads
