const express = require("express")
const router = express.Router()

const UserController = require("../Controller/UserController")
router.post("/user/register",UserController.register)
router.get("/user/list",UserController.list)
router.post("/user/login",UserController.login)

module.exports = router