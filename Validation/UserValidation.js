const User = require("../Models/UserModels")
const { body, validationResult } = require("express-validator")

exports.validationInsert = [
    body("username").trim().isLength({ min: 4 }).withMessage("Username must be above character"),
    body("email").trim().isEmail().withMessage("provid a valid email id"),
    body("username").trim().isLength({ min: 4 }).withMessage("Username already")
        .custom((value) => {
            return User.findOne({ username: value })
                .then((User) => {
                    if (User) {
                        return Promise.reject("Username already exist")
                    } else {
                        console.log(error)
                    }
                })
        })
]