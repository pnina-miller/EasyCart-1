const router = require("express").Router();

const {
    getBusinessByText,
    getFiltersNames,
    getServicesNames,
    defaultSortNames
} = require("../controller/search");

router.post("/getBusinessByText", getBusinessByText);
router.get("/getFiltersNames", getFiltersNames);
router.get("/getServicesNames", getServicesNames);
router.get("/defaultSortNames", defaultSortNames);

module.exports = router;
