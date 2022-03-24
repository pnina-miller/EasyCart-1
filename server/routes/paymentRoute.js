const router = require("express").Router();
const { getPayments, createPayment } = require("../controllers/payment");

router.route("/payment").get(getPayments).post(createPayment);

module.exports = router;
