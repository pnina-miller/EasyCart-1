const router = require("express").Router();

const {
  createProductCategory,
  getProductCategories,
  getCategoriesByStore
} = require("../controller/productCategory");


router.get('/getProductCategories', getProductCategories)
router.post('/getCategoriesByStore',getCategoriesByStore)
router.post("/productCategory/:storeId", createProductCategory)
module.exports = router;
