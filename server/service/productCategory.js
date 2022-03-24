const Repository = require("../repository/repository")
const productCategory = require("../models/productCategory")
const Store = require("../models/store")

const getProductCategories = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const categories = await Repository.find(productCategory, {}, null, "_id name")
            resolve(categories);
        } catch (error) {
            reject(error.message)
        }
    })
}
const getCategoriesByStore = (storeId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let categories = [];
            if (storeId !== undefined)

                categories = await Repository.find(productCategory, { storeId: storeId }, null, "_id name")
            resolve(categories);
        } catch (error) {
            reject(error.message)
        }
    })
}
const createProductCategory = (categories, storeId) => {
    return new Promise(async (resolve, reject) => {
        try {
            await categories.forEach(async (element) => {
                if (element.__isNew__)
                    addCategory = await Repository.createOne(productCategory, { name: element.value, storeId: [storeId] });
                else {
                    await Repository.findByOneAndUpdate(productCategory, { name: element.value }, { $addToSet: { storeId: storeId } })
                }
                await Repository.findByIdAndUpdate(Store, storeId, { $addToSet: { category: addCategory._id } });

            });
            resolve();
        } catch (error) {
            reject(error.message)
        }
    })
}
module.exports = {
    getProductCategories, getCategoriesByStore, createProductCategory
}
