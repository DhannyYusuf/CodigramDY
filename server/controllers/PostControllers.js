const {Posts, Users} = require("../models")
const {Op} = require('sequelize')
const fs  = require('fs')

class PostsController {
    static async getPosts(req, res) {
        try {
            const posts = await Posts.findAll({where: {status: true}, order: [['id', 'DESC']], include: [Users]})
            res.status(200).json(posts)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    static async searchPosts(req, res) {
        try { //order: [['id','DESC']], include: [Users]
            const {keyword} = req.body
            const posts = await Posts.findAll({
                where: {
                    status: true,
                    caption: {
                        [Op.iLike]: `%${keyword ? keyword : ''}%`
                    }
                },
                order: [['id', 'DESC']], include: [Users]
            })
            res.status(200).json(posts)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    static async detailPosts(req, res) {
        try {
            const posts = await Posts.findOne({where: {id: req.params.id}, include: [Users]})
            posts ?
                res.status(200).json([posts]) :
                res.status(400).json({message: `Article ID ${req.params.id} not found.`})
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    static async    usersPosts(req, res, next) {
        try {
            if (req.body.profile === true){
                const result = await Posts.findAll({
                    order: [['id', 'DESC']],
                    include: {model: Users, where: {id: req.params.id}}
                })
                result ?
                    res.status(200).json(result) :
                    res.status(400).json({message: `User ID ${req.params.id} not found.`})
            } else {
                const result = await Posts.findAll({
                    where: {status: true},
                    order: [['id', 'DESC']],
                    include: {model: Users, where: {id: req.params.id}}
                })
                result ?
                    res.status(200).json(result) :
                    res.status(400).json({message: `User ID ${req.params.id} not found.`})
            }
        } catch (e) {
            res.status(400).json(e)
        }
    }

    static async createPosts(req, res) {
        try {
            let finalImageUrl = 'https://via.placeholder.com/100'
            if (req.file.filename){
                finalImageUrl = req.protocol+"://"+req.get('host')+"/uploads/"+req.file.filename;
            }
            const {title, description, userid} = req.body
            const posts = await Posts.create({
                    title: title, 
                    description: description, 
                    image: finalImageUrl, 
                    UserId: userid ? userid : 0, 
            })
            res.status(201).json(posts)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    static async updatePosts(req, res) {
      try {
          const {title, oldImage, description, userId} = req.body
          let finalImageUrl = req.file? req.file.filename: ''
          if (finalImageUrl){
              fs.unlinkSync('./public/uploads/'+oldImage.split('/').slice(-1)[0])
              finalImageUrl = req.protocol+"://"+req.get('host')+"/uploads/"+req.file.filename;
          } else {
              finalImageUrl = oldImage
          }
          const posts = await Posts.update({
                  title: title, 
                  description: description, 
                  image: finalImageUrl, 
                  userId: userId
              },
              {
                  where: {id: req.params.id}
              })
          res.status(200).json(posts)
      } catch (e) {
          res.status(500).json(e.message)
      }
  }

    static async deletePosts(req, res) {
        try {
            fs.unlinkSync('./public/uploads/'+req.body.oldImage.split('/').slice(-1)[0])
            const posts = await Posts.destroy({where: {id: req.params.id}})
            res.status(200).json(posts)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }
}

module.exports = PostsController

// const { Post } = require('../models'); // Import model Post
// const sharp = require('sharp');


// class PostController{

// static async createPost (req, res){
//   try {
//     const { title, description } = req.body;
//     const { buffer } = req.file;
//     const configsufix = Math.round(Math.random() * 1e9);
//     const imageG = `${configsufix}${req.file.originalname}`;

//     // Menggunakan Sharp untuk mengubah gambar
//     await sharp(buffer)
//       .resize({ width: 250, height: 250 })
//       .toFormat('png') // Mengonversi gambar ke format PNG
//       .toFile(`./uploads/${imageG}`, async (err) => {
//         if (err) {
//           console.error(err);
//           res.status(500).json({ error: 'Terjadi kesalahan saat menyimpan gambar' });
//         } else {
//           const userId = req.user.id; // Ambil ID pengguna dari otentikasi
//           // Buat posting baru
//           const result = await Post.create({ 
//             title: title, 
//             description: description, 
//             image: imageG, 
//             userId: userId 
//           });
  
//           res.status(201).json(result);
//         }
//       });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Terjadi kesalahan saat membuat posting' });
//   }
// }

    
//       // Controller untuk Mendapatkan Semua Posting
//       static async getAllPosts (req, res){
//         const posts = await Post.findAll();
    
//         res.status(200).json(posts);
//       }
    
//       // Controller untuk Mendapatkan Posting Berdasarkan ID
//       static async getPostById (req, res){
//         const postId = req.params.postId;
//         const post = await Post.findByPk(postId);
    
//         if (!post) {
//           return res.status(404).json({ error: 'Posting tidak ditemukan' });
//         }
    
//         res.status(200).json(post);
//       }
    
//       // Controller untuk Mengedit Posting
//    static async    editPost (req, res){
//         const postId = req.params.postId;
//         const { title, description, image } = req.body;
    
//         // Periksa apakah pengguna memiliki izin untuk mengedit posting ini
    
//         const post = await Post.findByPk(postId);
    
//         if (!post) {
//           return res.status(404).json({ error: 'Posting tidak ditemukan' });
//         }
    
//         // Perbarui data posting
    
//         res.status(200).json(post);
//       }
    
//       // Controller untuk Menghapus Posting
//      static async  deletePost (req, res){
//         const postId = req.params.postId;
    
//         // Periksa apakah pengguna memiliki izin untuk menghapus posting ini
    
//         const post = await Post.findByPk(postId);
    
//         if (!post) {
//           return res.status(404).json({ error: 'Posting tidak ditemukan' });
//         }
    
//         // Hapus posting
    
//         res.status(200).json({ message: 'Posting berhasil dihapus' });
//       }
//     };
    

// module.exports = PostController;