const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  productname: { type: String, required: true },
  productdis: { type: String, required: true },
  productprice: { type: Number, required: true },
  productdiscount: { type: Number, required: true },
  productimage: { type: [String], required: true },
}, { timestamps: true });

const ProductModel = mongoose.model("Product", ProductSchema);
module.exports = ProductModel;
