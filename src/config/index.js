const production = require('config/production')
const development = require('config/development')

function get() {
  return process.env.NODE_ENV === 'production' ? production : development
}

module.exports = { get }
