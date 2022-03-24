const Repository = require("../repository/repository")
const Recommendation = require('../models/recommendation')
const Business = require("../models/business");
const User = require("../models/user");

const addRecommendations = (recommendationUser, businessId, userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const business = await Repository.findOne(Business, { _id: businessId });
            const user = await Repository.findOne(User, { _id: userId });
            if (user && business) {
                const recommendation = await Repository.createOne(Recommendation, { Recommendation: recommendationUser, BusinessId: businessId, UserId: userId })
                business.userRecommendation.push(recommendation._id)
                business.save()
                ("bus", business.userRecommendation);
                resolve(recommendation);
            }
            else
                throw { message: 'user or business not defined' }
        } catch (error) {
            reject(error.message)
        }
    })
}

const getRecommendationByBusiness = (businessId, numResults) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (businessId && numResults !== undefined) {
                ("businessId",businessId);
                ("numResults",numResults);
                let data = await Business.findById(businessId, "userRecommendation businessName").populate({
                    path: 'userRecommendation',
                    skip: numResults ? numResults : 0, limit: 3,
                    populate: {
                        path: "UserId",
                        select: "userName"
                    }
                })
                ("data",data);
                resolve(data.userRecommendation)
        }
            else
throw { message: 'business or numResults not defined' }

        } catch (error) {
    reject(error.message)
}
    })
}


const deleteRecommendation = (recommendationId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (recommendationId) {
                let data = await Repository.findByIdAndRemove(Recommendation, recommendationId )
                resolve(data)
            }
            else
                throw { message: 'recommendationId not defined' }

        } catch (error) {
            reject(error.message)
        }
    })
}


module.exports = {
    addRecommendations, getRecommendationByBusiness, deleteRecommendation
}
