const User = require("../Models/UserModels")

exports.register = [
    (req, res) => {
         console.log(req.body)
         const user = new User({
            username: req.body.username,
            email: req.body.email,
            contact: req.body.contact,
            password: req.body.password
         })
         user.save()
            .then((a) => {
               res.send(a)
            })
            .catch((err) => {
               res.send(err)
            })
   }
]

exports.list = [
   (req, res) => {
      User.find()
         .then((get) => {
            res.send(get)
         })
   }
]

exports.login = [
   (req, res) => {
      const username = req.body.username
      const password = req.body.password
      User.find({
         username: username,
         password: password
      })
         .then((user) => {
            if (user.username == username && user.password == password) {
               res.send({ userFound: true })
            } else {
               res.sen({ userFound: false })
            }
            res.send(user)
         })
         .catch((err) => {
            res.send(err)
         })
   }
]