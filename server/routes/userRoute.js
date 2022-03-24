const express = require("express");
const {
  getUsers,
  getUser,
  getUserDetailsByUserName,
  updateUser,
  addCart,
  history,
  getUserDetailsById,
  checkPermission,
  createUser,
  deleteUser
} = require("../controller/user");

const router = express.Router();

router.get("/getAll", getUsers);
router.get("/getUser/:id", getUser);
router.get("/getDetailsByUserName/:userName", getUserDetailsByUserName);
router.get("/getDetailsById/:userId", getUserDetailsById);
router.get('/:userName/isPermission', checkPermission)
router.post("/create/:userName", createUser);

//product-user
router.patch("/addcart", addCart);
router.get("/history", history);
router.put("/update/:userId", updateUser);
router.delete("/delete/:userId", deleteUser);

module.exports = router;
