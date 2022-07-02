const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        //unique name
        cb(
            null,
            file.fieldname + '-' + Date.now() + path.extname(file.originalname)
        )
    },
})

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/gif'
    ) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

let upload = multer({
    storage: storage,
    fileFilter: fileFilter,
})

module.exports = upload.array('imageUpload') //make this array if you want to upload multiple images
