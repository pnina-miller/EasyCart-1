const router = require("express").Router();

const { saveOrder,getOrdersByBusinessKeyWords, getOrdersByUserId,getCartUser,updateOrderStatus} = require("../controller/order");

router.post("/saveOrder",saveOrder);
router.get("/byBusinessKeyWord/:keyWord",getOrdersByBusinessKeyWords);
router.get("/byUserId/:userId",getOrdersByUserId);
router.post("/getCartUser",getCartUser)
router.get("/updateOrderStatus", updateOrderStatus)


module.exports = router;
