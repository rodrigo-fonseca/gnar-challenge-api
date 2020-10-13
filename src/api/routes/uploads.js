const express = require('express')
const uploadsController = require('api/controllers/uploads')
const fileUpload = require('api/middlewares/fileUpload')

const uploadsRoutes = () => {
  const router = express.Router()

  router.post('/', fileUpload('file'), uploadsController.create)
  // router.get('/:id', uploadsController.get)

  return router
}

module.exports = uploadsRoutes
