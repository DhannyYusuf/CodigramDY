const { User } = require('../models');
const {genSalt, hashSync, compareSync} = require("bcrypt");
const {sign} = require("jsonwebtoken");
const fs = require("fs");
class UsersController {
    static async getUsers(req, res, next) {
        try {
            const result = await User.findAll({order: ['id']})
            res.status(200).json(result)
        } catch (e) {
            res.status(400).json(e)
        }
    }

    static async detailUsers(req, res, next) {
        try {
            const result = await User.findByPk(req.params.id)
            result ?
                res.status(200).json([result]) :
                res.status(400).json({message: `Users ID ${req.params.id} not found.`})
        } catch (e) {
            res.status(400).json(e)
        }
    }

    static async registerUsers(req, res, next) {
      try {
        const {username, email, password, image, role} = req.body
        const salt = await genSalt(10);
        const passHash = hashSync(password, salt);
        if (username && email && password) {
            const dataUsername = await User.findOne({where: {username: username}})
            const dataEmail = await User.findOne({where: {email: email}})
            if (dataUsername) {
                res.status(400).json({message: "Username not available"})
            } else if (dataEmail) {
                res.status(400).json({message: "Email already use"})
            } else {
                const result = await User.create({
                    username: username,
                    email: email,
                    password: passHash,
                })
                res.status(200).json(result)
            }
        } else {
            res.status(400).json({message: "Fill all forms please"})
        }
    } catch (e) {
        res.status(400).json(e)
    }
}

    static async loginUsers(req, res, next) {
        try {
            const {username, password} = req.body
            const data = await User.findOne({where: {username: username}})
            if (data) {
                const token = sign({data}, process.env.SECRET_KEY)
                await compareSync(password, data.password) ?
                    res.status(200).json({data: data, token: token}) :
                    res.status(400).json({message: 'Incorrect Password.'})
            } else {
                res.status(400).json({message: 'Username not found.'})
            }
        } catch (e) {
            res.status(500).json(e)
        }
    }

    static async updateUsers(req, res, next) {
        try {
            const {username, email} = req.body
            const result = await User.update({
                username: username? username: '',
                email: email? email: '',
            }, {
                where: {id: req.params.id},
                returning: true
            })
            result[0] === 1 ?
                res.status(200).json(result[1]) :
                res.status(400).json({message: `Users ID ${req.params.id} has not been updated`})
        } catch (e) {
            res.status(400).json(e)
        }
    }

    static async deleteUsers(req, res, next) {
        try {
            const result = await User.destroy({where: {id: req.params.id}})
            result === 1 ?
                res.status(200).json({message: `Users ID ${req.params.id} has been deleted.`}) :
                res.status(400).json({message: `Users ID ${req.params.id} has not been deleted.`})
        } catch (e) {
            res.status(400).json(e)
        }
    }
}

module.exports = UsersController

// const { User } = require('../models'); // Import model User
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');

// class UserController{
//     static async register(req, res){
//         try {
//           const { username, email, password } = req.body;
    
//           // Validasi apakah pengguna sudah terdaftar
//           const existingUser = await User.findOne({ where: { email } });
//           if (existingUser) {
//             return res.status(400).json({ error: 'Pengguna sudah terdaftar' });
//           }
    
//           // Hash password sebelum disimpan
//           const hashedPassword = await bcrypt.hash(password, 10);
    
//           // Buat pengguna baru
//           const user = await User.create({
//             username,
//             email,
//             password: hashedPassword,
//           });
    
//           // Buat token JWT untuk otentikasi
//           const token = jwt.sign({ id: user.id }, 'secret_key'); // Ganti dengan kunci rahasia yang sesuai
    
//           res.status(201).json({ user, token });
//         } catch (error) {
//           console.error(error);
//           res.status(500).json({ error: 'Terjadi kesalahan saat registrasi' });
//         }
//       }
    
//       // Controller untuk Login Pengguna
//       static async login(req, res){
//         try {
//           const { email, password } = req.body;
//           const user = await User.findOne({ where: { email } });
//           if (!user || !(await bcrypt.compare(password, user.password))) {
//             return res.status(401).json({ error: 'Kredensial tidak valid' });
//           }
//           const token = jwt.sign({ id: user.id }, 'secret_key'); // Ganti dengan kunci rahasia yang sesuai
    
//           res.status(200).json({ user, token });
//         } catch (error) {
//           console.error(error);
//           res.status(500).json({ error: 'Terjadi kesalahan saat login' });
//         }
//       }
    
//       // Controller untuk Mendapatkan Profil Pengguna yang Sedang Login
//       static async getProfile (req, res){
//         res.status(200).json(req.user);
//       }
    
//       // Controller untuk Logout Pengguna
//       static async logout (req, res){
//         res.status(200).json({ message: 'Logout berhasil' });
//       }
// }


// module.exports = UserController;