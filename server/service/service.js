const Business = require("../models/business");
const Service = require("../models/service");
const Repository = require("../repository/repository");

const addService = (businessId, servicesName) => {
    return new Promise(async (resolve, reject) => {
        try {
            const business = await Repository.findOne(Business, { _id: businessId });
            if (business) {
                await servicesName.forEach(async (element) => {
                    if (element.__isNew__) {
                        const addservice = await Repository.createOne(Service, { serviceName: element.value });
                        addservice.business.push(businessId)
                        addservice.save();
                        await Repository.findByIdAndUpdate(Business, businessId, { $addToSet: { service: addservice._id } });
                    }
                    else{
                        await Repository.findByOneAndUpdate(Business,{ _id:businessId}, { $addToSet: { service: addservice._id } })
                    }
                });
                resolve(business.service);
            }
            else
                throw { message: 'business not defined' }
        } catch (error) {
            reject(error.message)
        }
    })
}

const getServicePerBusiness = (businessId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (businessId) {
                let popArr = [{ path: "service" }]
                let data = await Repository.findById(Business, businessId, popArr, "businessName")
                resolve(data)
            }
            else
                throw { message: 'business or numResults not defined' }

        } catch (error) {
            reject(error.message)
        }
    })
}

const getAllServices = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await Repository.find(Service)
            resolve([...new Set(data)])
        } catch (error) {
            reject(error.message)
        }
    })
}

module.exports = {
    addService, getServicePerBusiness, getAllServices
}