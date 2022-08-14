
const multer = require('multer')
const fs = require('fs')
const path = require('path')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.fieldname === "profilePicture") {
            cb(null, path.join(__dirname, "../upload/profile_pics/"))
        } else {
            cb(null, path.join(__dirname, "../upload/uploads"))
        }
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
    }
})
const uploadProfilePicture = multer({ 
    storage: storage
 }).single('profilePicture')


module.exports = { storage,uploadProfilePicture }