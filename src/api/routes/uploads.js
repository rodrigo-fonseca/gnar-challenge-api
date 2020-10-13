const express = require('express')
const uploadsController = require('api/controllers/uploads')
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage })
// const fileUpload = require('api/middlewares/fileUpload')

const uploadsRoutes = () => {
  const router = express.Router()

  router.post('/', upload.single('file'), uploadsController.create)
  // router.get('/:id', uploadsController.get)

  return router
}

module.exports = uploadsRoutes
