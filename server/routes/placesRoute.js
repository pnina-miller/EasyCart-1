const express = require('express');
const router = express.Router();

const {
    SearchForBusinessesNearby,
    searchForBusinessesByLocation,
    getDetails,
    getPlaceIdOfBusiness,
} = require('../controller/place');

router.post('/SearchForBusinessesNearby/:location/:text', SearchForBusinessesNearby);
router.post('/searchForBusinessesByLocation/:location', searchForBusinessesByLocation);
router.get('/getDetails/:placeId', getDetails)
router.post('/getPlaceIdOfBusiness', getPlaceIdOfBusiness)

module.exports = router;