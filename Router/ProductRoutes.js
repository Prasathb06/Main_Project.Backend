const express = require("express")
const router = express.Router()
const ProductController = require("../Controller/ProductController")
router.post("/product/insert",ProductController.insert)
router.get("/product/list",ProductController.list)
router.delete("/product/delete/:id",ProductController.delete)
// router.get("/product/list/:id",ProductController.findProductById)
module.exports=router;