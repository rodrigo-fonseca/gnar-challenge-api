/* eslint max-classes-per-file: ["error", 5] */
/* eslint no-param-reassign: "error" */

class BadRequestError extends Error {
  constructor(...args) {
    super()
    this.name = 'bad request'
    this.status = 400
    this.type = ''

    _handleArgs(args, this)
  }
}

class NotFoundError extends Error {
  constructor(...args) {
    super()
    this.name = 'not found'
    this.status = 404
    this.type = ''

    _handleArgs(args, this)
  }
}

class ForbiddenError extends Error {
  constructor(...args) {
    super()
    this.name = 'forbidden'
    this.status = 403
    this.type = ''

    _handleArgs(args, this)
  }
}

class UnauthorizedError extends Error {
  constructor(...args) {
    super()
    this.name = 'unauthorized'
    this.status = 401
    this.type = ''

    _handleArgs(args, this)
  }
}

class InternalServerError extends Error {
  constructor(...args) {
    super()
    this.name = 'internal server error'
    this.status = 500
    this.type = ''

    _handleArgs(args, this)
  }
}

const map = error => ({
  status: 500,
  name: '',
  message: '',
  type: '',
  ...error,
})

const _handleArgs = (args, ref) => {
  if (!args || !args[0]) return

  const { title, name, message, type } = args[0]

  if (title) ref.title = title
  if (name) ref.name = name
  if (message) ref.message = message
  if (type) ref.type = type
}

module.exports = {
  BadRequestError,
  ForbiddenError,
  UnauthorizedError,
  InternalServerError,
  NotFoundError,
  map,
}
