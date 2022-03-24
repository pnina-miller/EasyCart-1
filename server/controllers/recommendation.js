const Recommendation = require('../models/recommendation')
const Business = require("../models/business");
const User = require("../models/user");
// const ProblematicWords = require("../models/problematicWords");
//function to add remmention
const addRecommendations = async (req, res) => {
    const { recommendationUser, businessId, userId } = req.body;
    const business = await Business.findOne({ _id: businessId });
    const user = await User.findOne({ _id: userId });
    const recommendation = new Recommendation({
        Recommendation: recommendationUser,
        BusinessId: businessId,
        UserId: userId,
    })

    const flag = false
    // await checkProblematicWordsRecommendation(recommendationUser)
    if (!flag && flag != undefined) {
        recommendation.save().then((data) => {
            if (business != undefined) {
                business.userRecommendation.push(recommendation._id)
                business.save()
            }
            res.status(200).json({
                message: "created recommendation successfully",
                recommendation: data
            })
        }).catch(error => {
            res.status(500).json({
                error,
            })
        });
    }
    else {
        res.status(500).json({
            message: "Experience in writing ProblematicWords "
        })
    }

}
//fuction to get business recommendation by Id
const getRecommendationByBusiness = async (req, res) => {
    try {
        const { businessId, numResults } = req.body;
        if (businessId && numResults) {
            let data = await Business.findById(businessId, "userRecommendation businessName").populate({
                path: 'userRecommendation',
                skip: numResults ? numResults : 0, limit: 3,
                populate: {
                    path: "UserId",
                    select: "userName"
                }
            })
            await res.status(200).json(data.userRecommendation)
        }
    }
    catch (err) {
        res.status(500).json({ error: err.message })
        console.error("error in getting recommendation", err.message);
    }
}




//function for deleting Improper responses
const deleteRecommendation = async (req, res) => {

    try {
        recommendationId = req.params.id
        let data = await Recommendation.findByIdAndRemove({ _id: recommendationId })
        res.status(200).json({ message: "deleted recommendation successfully", data: data })

    }
    catch (err) {
        res.status(500).json({ error: err })
        console.error("err in delete recommendation", err.message)
    }
}
//function for checking Improper words
// function checkProblematicWordsRecommendation(recommendUser) {
//     return new Promise((resolve, reject) => {
//         try {
//             const recommend = recommendUser
//             let flag = false
//             ProblematicWords.find().then(data => {
//                 for (let i = 0; i < data[0].problemayicWords.length; i++) {
//                     if (recommend.includes(data[0].problemayicWords[i])) {
//                         flag = true;
//                         break
//                     }
//                 }
//             })
//             resolve(flag);
//         } catch (error) {
//             reject(error);
//             res.status(500).json({ message: error });
//         }
//     })
// }

module.exports = { addRecommendations, getRecommendationByBusiness, deleteRecommendation }