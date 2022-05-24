const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname) //change the name in frontend for it to be unique
    },
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

let upload = multer({
    storage: storage,
    fileFilter: fileFilter,
})

console.log('success upload to server')

module.exports = upload.single('imageUpload') //make this array if you want to upload multiple images
