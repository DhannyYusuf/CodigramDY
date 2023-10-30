const usersRouter = require('express').Router()
const UserController = require("../controllers/UserControllers")
const multer = require('multer')
const path = require("path");
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./public/uploads")
    },
    filename: function (req, file, callback) {
        callback(null, Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({storage})
usersRouter.get('/', UserController.getUsers)
usersRouter.get('/:id', UserController.detailUsers)
usersRouter.post('/reg', UserController.registerUsers)
usersRouter.put('/:id', UserController.updateUsers)
usersRouter.delete('/:id', UserController.deleteUsers)
usersRouter.post('/login', UserController.loginUsers)
module.exports = usersRouter