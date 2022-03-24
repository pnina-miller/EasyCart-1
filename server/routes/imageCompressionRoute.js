const router = require("express").Router();

const {
    
} = require("../controllers/imageCompression");

router.post("/getBusinessByText", getBusinessByText);
router.get("/getFiltersNames", getFiltersNames);
router.get("/getServicesNames", getServicesNames);
router.get("/defaultSortNames", defaultSortNames);

module.exports = router;