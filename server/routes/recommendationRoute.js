const express = require('express');
const router = express.Router();
const {
    addRecommendations,
    getRecommendationByBusiness,
    deleteRecommendation,
} = require('../controller/recommendation');
router.post('/addRecommendations', addRecommendations)
router.post('/getRecommendationByBusiness',getRecommendationByBusiness)
router.delete('/deleteRecommendationByBusiness/:id',deleteRecommendation)
module.exports = router;