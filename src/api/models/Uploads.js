const dbService = require('api/services/core/dbService')
const sequelize = require('api/services/core/sequelize')
const error = require('api/services/core/error')
const _ = require('lodash')

class Uploads {
  constructor() {
    this.model = this._getModel()
  }

  add({ list, filename }) {
    if (!_.isArray(list) || _.isEmpty(list))
      return Promise.reject(new error.BadRequestError())
    if (!filename) return Promise.reject(new error.BadRequestError())

    return sequelize.get().transaction(transaction => {
      const mapped = this._mapToCreateFormat(list)
      const promises = mapped.map(data =>
        this.create(data, filename, transaction)
      )

      return Promise.all(promises)
    })
  }

  create({ yardCode, employeeCode, clockIn, clockOut }, filename, transaction) {
    let method = 'create'
    const { model } = this
    const data = {
      yardCode,
      employeeCode,
      clockIn,
      clockOut,
      filename,
    }

    if (transaction) method = 'createWithTransaction'
    return dbService[method]({ model, data, transaction })
  }

  get({ id }) {
    const { model } = this
    let where = {}
    let method = 'findAll'

    if (id) {
      where = { id }
      method = 'findByPk'
    }

    return dbService[method]({ model, where })
  }

  _mapToCreateFormat(data) {
    return data.map(data => {
      const [yardCode, employeeCode, clockIn, clockOut] = data

      return {
        yardCode,
        employeeCode,
        clockIn,
        clockOut,
      }
    })
  }

  _getModel() {
    return sequelize.getModel('Uploads')
  }
}

module.exports = Uploads
