const router = require("express").Router();

const {
    getBusinessByText,
    moreFilters, getFiltersNames,
    getSortedBusinessesByRating,
    getSortedBusinessByMostVisited,
    defaultSortNames,
    getServicesNames
} = require("../controllers/search");

router.post("/getBusinessByText", getBusinessByText);
router.post("/moreFilters", moreFilters);
router.get("/getFiltersNames", getFiltersNames);
router.get("/getServicesNames", getServicesNames);
router.get("/getSortedBusinessesByRating", getSortedBusinessesByRating);
router.get("/getSortedBusinessByMostVisited", getSortedBusinessByMostVisited);
router.get("/defaultSortNames", defaultSortNames);
module.exports = router;
