const express = require("express")
const router = express.Router()

const UserController = require("../Controller/UserController")
router.post("/user/register",UserController.register)
router.get("/user/list",UserController.list)
router.post("/user/login",UserController.login)
router.get("/user/:id", UserController.getUserById);
router.post("/user/update/:id", UserController.updateUserById);
router.delete("/user/delete/:id",UserController.delete);

module.exports = router