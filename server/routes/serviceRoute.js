const router = require("express").Router();
const {
    addService,
    getServicePerBusiness,
    getAllServices
} = require('../controller/service')

router.post("/addService",addService);
router.post("/getServicePerBusiness",getServicePerBusiness);
router.get("/getAllServices",getAllServices);
module.exports = router;