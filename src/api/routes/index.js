const corsMiddleware = require('api/middlewares/cors')

// routes
// const uploadsRoutes = require('api/routes/uploads')

function set(app) {
  app.use(corsMiddleware)
  // app.use('/uploads', uploadsRoutes())
}

module.exports = { set }
