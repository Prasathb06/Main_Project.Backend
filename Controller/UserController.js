const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const UserModel = require('../Models/UserModels');

exports.register = [
  body('username').trim().isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
  body('email').isEmail().withMessage('Enter a valid email'),
  body('contact').trim().isLength({ min: 10 }).withMessage('Contact must be at least 10 characters long'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { username, email, contact, password, cPassword } = req.body;
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'Email already exists' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new UserModel({ username, email, contact, password: hashedPassword, cPassword });
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
];


exports.login = [
   async (req, res) => {
      
         const { email, password } = req.body;
        UserModel.findOne({ email:email,})
         .then(async (user)=>{
         if (user) {
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (passwordMatch) {
               res.send({userFound :true,
                  message : "Login Success"
               });
            } else {
               res.send({userFund : false,
                  message : "password does not match"
               });
            }
         } else {
            res.send({userFound : false,
               message :"NO records found"
            });
         }
      }) 
      .catch((error) => {
         res.send(error)
      })
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



exports.getUserById = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.updateUserById = async (req, res) => {
  const { username, email, contact, password } = req.body;

  let updateData = { username, email, contact };

  if (password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    updateData.password = hashedPassword;
  }

  try {
    const result = await UserModel.updateOne(
      { _id: req.params.id },
      { $set: updateData }
    );

    if (result.nModified === 0) {
      return res.status(404).json({ error: 'User not found or no changes detected' });
    }

    res.json({ message: 'User updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update user' });
  }
};


exports.delete = (req, res) => {
  UserModel.deleteOne({ _id: req.params.id })
    .then((result) => {
      if (result.deletedCount > 0) {
        res.json({ success: true, message: 'User deleted successfully' });
      } else {
        res.json({ success: false, message: 'User not found' });
      }
    })
    .catch((err) => {
      res.status(500).json({ success: false, message: 'An error occurred', error: err });
    });
};
