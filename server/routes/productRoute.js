const router = require("express").Router();

const {
  createProduct,
  updteProduct,
  deleteProduct
} = require("../controller/product");

router.post('/createproduct',createProduct)
router.post('/updateProduct',updteProduct)
router.delete('/deleteProduct',deleteProduct)

  


module.exports = router;
