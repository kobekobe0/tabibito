const multer = require('multer')
const upload = multer({ dest: '/uploads/' })

const imgUpload = upload.array('image')
