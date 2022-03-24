const service = require("../service/recommendation")

//// add user recommendation per business
const addRecommendations = async (req, res) => {
    try {
        const { recommendationUser, businessId, userId } = req.body;

        const newRecommendation = await service.addRecommendations(recommendationUser, businessId, userId)
        res.status(200).json({
            message: "created recommendation successfully", recommendation: newRecommendation
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const getRecommendationByBusiness = async (req, res) => {
    try {
        const { businessId, numResults } = req.body;
        ("body",req.body);
        const data = await service.getRecommendationByBusiness(businessId, numResults)
        res.status(200).json(data)
    }
    catch (err) {
        res.status(500).json({ error: err.message })
        console.error("error in getting recommendation", err.message);
    }
}

//function for deleting Improper responses
const deleteRecommendation = async (req, res) => {
    try {
        let recommendationId = req.params.id
        const data = await service.deleteRecommendation(recommendationId)
        res.status(200).json({ message: "deleted recommendation successfully", data: data })

    }
    catch (err) {
        res.status(500).json({ error: err })
        console.error("err in delete recommendation", err.message)
    }
}

module.exports = {
    addRecommendations, getRecommendationByBusiness, deleteRecommendation
}
