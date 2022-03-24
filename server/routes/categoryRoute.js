const router = require("express").Router();
const {
  createCategory,
  getCategoryById,
  getAllCategories,
  // updateCategory,
  // deleteCategory,
  // isSubCategoryExsist
} = require("../controller/category");

// router.post("/isSubCategoryExsist", isSubCategoryExsist);
router.get("/getCategoryById/:id", getCategoryById);
router.get("/getAllCategories", getAllCategories);
router.post("/createCategory", createCategory);
// router.post("/updateCategory/:id", updateCategory);
// router.post("/deleteCategory/:id", deleteCategory);

module.exports = router;