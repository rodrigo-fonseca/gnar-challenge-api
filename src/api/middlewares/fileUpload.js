const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage })

function fileUpload(fieldName) {
  return upload.single(fieldName)
}

module.exports = fileUpload
