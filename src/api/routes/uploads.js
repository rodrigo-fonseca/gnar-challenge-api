const express = require('express')

const uploadsRoutes = () => {
  const router = express.Router()

  router.get('/uploads/:id', fileController.get)
  router.post('/uploads', fileController.create)

  return router
}

module.exports = uploadsRoutes
