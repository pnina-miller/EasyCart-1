const router = require("express").Router();
const {
    createBusinessHistory,
    getBusinessHistoryById,
    deletebusinessHistory,
    updatebusinessHistory,
} = require("../controllers/businessHistory");

router.post("/createBusinessHistory", createBusinessHistory);
router.post("/getBusinessHistoryById", getBusinessHistoryById);
router.post("/deletebusinessHistory", deletebusinessHistory);
router.post("/updatebusinessHistory", updatebusinessHistory);

module.exports = router;
