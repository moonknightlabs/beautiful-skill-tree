
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./beautiful-skill-tree.cjs.production.min.js')
} else {
  module.exports = require('./beautiful-skill-tree.cjs.development.js')
}
