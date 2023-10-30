const postsRouter = require('express').Router()
const PostController = require("../controllers/PostControllers")
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
postsRouter.get('/', PostController.getPosts)
postsRouter.get('/:id', PostController.detailPosts)
postsRouter.post('/users/:id', PostController.usersPosts)
postsRouter.post('/', upload.single('image'), PostController.createPosts)
postsRouter.put('/:id', upload.single('image'), PostController.updatePosts)
postsRouter.delete('/:id', PostController.deletePosts)
postsRouter.post('/search', PostController.searchPosts)
module.exports = postsRouter