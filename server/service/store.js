const Repository = require("../repository/repository")
const Store = require('../models/store')
const Business = require('../models/business')

const createStore = (businessId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const business = await Repository.findById(Business, businessId, null, null);  
            if (business.storeId && business.storeId !== '') {
            console.log ("yesssssssss")
                reject({ message: "store already exist" })
            }
            else {
                console.log ("noooooooooo")

                const newStore = await Repository.createOne(Store, { buisnessId: businessId }, null)
                console.log ("newStore",newStore)

                business.storeId = newStore._id
                business.save();
                console.log ("business",business)

                resolve(business);
            }


        } catch (error) {
            reject(error.message)
        }
    })
}
const getStore = (storeId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const popArr = [{
                path: 'product',
                populate: {
                    path: "category",
                    select: "name _id "
                }
            }, { path: 'category' }]
            const store = await Repository.findById(Store, storeId , popArr)
            await getCategoriesByStore(store._id)
            resolve(store);

        } catch (error) {
            reject(error.message)
        }
    })
}
const getCategoriesByStore = async (storeId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const popArr = [{
                path: 'product',
                select: "_id",
                populate: {
                    path: "category",
                    select: "name _id "
                }
            }]
            const store = await Repository.findById(Store, storeId, popArr, 'product')
            let arrCategories = []
            store.product.forEach((element) => {
                element.category.forEach((elementCategory) => {
                    if (arrCategories.indexOf(elementCategory) < 0) {
                        arrCategories.push(elementCategory)
                    }
                })
            })
            resolve(arrCategories);
        } catch (err) {
            reject(err);
        }
    })

}
module.exports = {
    createStore, getStore
}
