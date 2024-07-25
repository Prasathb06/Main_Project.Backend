const UserModel = require("../Models/UserModels")
const bcrypt = require("bcrypt")
exports.register = [
   //  async (req, res) => {
   //       console.log(req.body)
   //       const user = new User({
   //          username: req.body.username,
   //          email: req.body.email,
   //          contact: req.body.contact,
   //          password: req.body.password
   //       })
   //       user.save()
   //          .then((a) => {
   //             res.send(a)
   //          })
   //          .catch((err) => {
   //             res.send(err)
   //          })
   // }

   async (req,res)=>{
   try {
      const { username, email, contact, password } = req.body;
      const existingUser = await UserModel.findOne({email});
      if (existingUser) {
          return res.status(400).json({ error: "Email already exists" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new UserModel({ username, email, contact, password: hashedPassword });
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
}

]

exports.list = [
   (req, res) => {
      UserModel.find()
         .then((get) => {
            res.send(get)
         })
   }
]

exports.login = [
   // (req, res) => {
   //    const username = req.body.username
   //    const password = req.body.username
   //    UserModel.find({
   //       username: username,
   //       password: password
   //    })
   //       .then((user) => {
   //          if (user.username == username && user.password == password) {
   //             res.send({ userFound: true })
   //          } else {
   //             res.sen({ userFound: false })
   //          }
   //          res.send(user)
   //       })
   //       .catch((err) => {
   //          res.send(err)
   //       })
         
   // }

   async (req, res) =>{
      try {
         const {email,password} = req.body;
      const userlogin = await UserModel.findOne({email});
      if(userlogin){
         const passwordMatch= bcrypt.compare(password, userlogin.password);
         if(passwordMatch){
            res.json("success");
         }else{
            res.status(401).json("password does not match!")
         }
      }else{
         res.status(401).json("NO records found");
      }
      } catch (error) {
         res.status(500).json({error:error.message})
      }
   }
]