/* eslint-disable global-require */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
require('app-module-path').addPath(`${__dirname}`)
require('console-info')
require('console-error')

const express = require('express')
const bodyParser = require('body-parser')
const routes = require('api/routes')
const error = require('api/services/core/error')
const sequelize = require('api/services/core/sequelize')

const app = express()
const port = process.env.PORT || 3005
const env = process.env.NODE_ENV || 'development'

app.use(bodyParser.json())
routes.set(app)

app.listen(port, () => {
  console.info(`Listening on http://localhost:${port}`)
  console.info(`env: ${env}`)
  // sequelize.sync()
})

app.use((err, req, res, next) => {
  console.error(err)
  const mapped = error.map(err)
  res.status(mapped.status).send({ data: mapped })
})
