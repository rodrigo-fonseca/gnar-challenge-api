const Sequelize = require('sequelize')
const config = require('config')

let sequelize
let models

function sync() {
  return get().sync()
}

function get() {
  if (sequelize) return sequelize

  sequelize = _initSequelize()
  return sequelize
}

function getOp() {
  return Sequelize.Op
}

function getSequelize() {
  return Sequelize
}

function getModel(name) {
  return models && name && models[name]
}

function _initSequelize() {
  const conf = config.get()

  sequelize = new Sequelize(
    conf.sequelize.database,
    conf.sequelize.username,
    conf.sequelize.password,
    conf.sequelize.params
  )

  _initModels()
  return sequelize
}

const _initModels = () => {
  const createdAt = {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  }
  const updatedAt = {
    type: Sequelize.DATE,
    onUpdate: Sequelize.NOW,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  }

  const Uploads = sequelize.define(
    'uploads',
    {
      yard_code: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      employee_code: {
        type: Sequelize.STRING,
      },
      clock_in: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      clock_out: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      filename: {
        type: Sequelize.STRING,
      },
      createdAt,
      updatedAt,
    },
    {
      paranoid: true,
    }
  )

  _setModels({
    Uploads,
  })
}

const _setModels = data => {
  models = data
}

module.exports = {
  sync,
  get,
  getOp,
  getModel,
  getSequelize,
}
