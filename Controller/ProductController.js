const productData = require('../Models/ProductModels');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './Uploads/'); // Ensuring it's a relative path
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const Uploads = multer({
  storage,
  limits: {
    fileSize: 30 * 1024 * 1024, // 30 MB file size limit
  }
})
.fields([
  { name: 'productimage', maxCount: 3 }
]);

module.exports.insert = [
  Uploads,
  (req, res) => {
    const product = new productData({
      productname: req.body.productname,
      productdis: req.body.productdis,
      productprice: req.body.productprice,
      productdiscount: req.body.productdiscount,
      productimage: req.files['productimage'] ? req.files['productimage'].map(file => file.path) : []
    });

    product.save()
      .then((ele) => {
        res.status(201).send(ele); // Status code for successful creation
      })
      .catch((err) => {
        res.status(500).send({ message: 'Error saving product', error: err }); // Improved error response
      });
  }
];

module.exports.list = [
  (req, res) => {
    productData.find()
      .then((list) => {
        res.status(200).send(list); // Status code for successful retrieval
      })
      .catch((err) => {
        res.status(500).send({ message: 'Error fetching products', error: err }); // Improved error response
      });
  }
];

exports.delete = async (req, res) => {
  try {
    const deletedProduct = await productData.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting product', error });
  }
};




// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'Uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

// const Uploads = multer({
//   storage,
//   limits: {
//     fileSize: 30 * 1024 * 1024
//   }
// }).
// fields([
//   {name: 'productImage', maxCount: 3},
//   {name: 'productSubImages', maxCount: 3}
// ]);
