const router = require("express").Router();
const {
  createBusiness,
  getBusinessById,
  getBusinessDetailsByKeyWord,
  getBusinessByCategory,
  getBusinessByMainCategory,
  getPromotedBusiness,
  getAllFavoraitsPerUser,
  addUsersGaleryOfBusiness,
  addFavoraitsToBusiness,
  deleteMyBussinessById,
  checkKeyWords,
  getAllBusinessName,
  updateBusiness,
  getAllBusinessPerUser,
  deleteFavoraitsByBusinessId,
  addClicksToBusiness,
  addLinkToVideo,
  addUsersLinkVideo
} = require("../controller/business");

//check one update function
router.post("/linkToVideo", addLinkToVideo);
router.post("/userLinkVideo", addUsersLinkVideo);
router.get("/getBusinessByMainCategory/:id", getBusinessByMainCategory);
router.get("/getBusinessById/:id", getBusinessById);
router.get("/getBusinessByKeyWord/:keyWord", getBusinessDetailsByKeyWord);
router.get("/addClicksToBusiness/:id", addClicksToBusiness);
router.post("/updateBusiness", updateBusiness);
router.get("/getBusinessByCategory/:idCategory", getBusinessByCategory);
router.post("/createBusinessPerUser", createBusiness);
router.get("/getAllBusinessPerUser/:id", getAllBusinessPerUser);
router.get("/getAllFavoraitsPerUser/:userId", getAllFavoraitsPerUser);
router.post(
  "/deleteFavoraitsByBusinessId/:idUser/:Bid",
  deleteFavoraitsByBusinessId
);
router.delete("/deleteBussinessById/:Bid", deleteMyBussinessById);
router.get("/promotedBusiness", getPromotedBusiness);
router.post("/addFavoraitsToBusiness", addFavoraitsToBusiness);
router.post("/addUsersGaleryOfBusiness", addUsersGaleryOfBusiness);
router.get("/getAllBusinessName", getAllBusinessName);
router.post("/checkKeyWords", checkKeyWords);
module.exports = router;
