const router = require("express").Router();

const {
  createMainCategory,
  getPopularCategories,
  getAllMainCategories,
  getAllBusinessByMainCategory
  // enterCategoryToMain,
  // isMainCategoryExsist
} = require("../controller/mainCategory");

router.post("/createMainCategory", createMainCategory);
router.get("/getPopularCategories", getPopularCategories);
router.get("/getAllMainCategories", getAllMainCategories);
router.get("/getAllBusinessByMainCategory", getAllBusinessByMainCategory);

// router.post("/isMainCategoryExsist", isMainCategoryExsist);
// router.get("/enterCategoryToMain", enterCategoryToMain);
module.exports = router;