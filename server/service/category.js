const Repository = require("../repository/repository")
const Category = require("../models/category");
const MainCategory = require("../models/mainCategory");


const createCategory = (mainCategories, categoryName, type) => {
    return new Promise(async (resolve, reject) => {
        try {
            const newCategory = await Repository.createOne(Category, { categoryName, type })
            mainCategories.map(async (element) => {
                const findMainCategory = await Repository.findOne(MainCategory, { mainCategoryName: element });
                findMainCategory.categories.push(newCategory);
                newCategory.mainCategories.push(findMainCategory);
                await newCategory.save();
                await findMainCategory.save();
            })
            resolve(newCategory)
        } catch (error) {
            reject(error.message);
        };
    })
}


const getCategoryById = (params) => {
    return new Promise(async (resolve, reject) => {
        try {
            const readCategory = await Repository.findById(Category,params,null,null)
            resolve(readCategory)
        } catch (error) {
            reject(error.message);
        };
    })
}

const getAllCategories = async (req, res) => {
    return new Promise(async (resolve, reject) => {
        try {
            const categories = await Repository.find(Category)
            resolve(categories)
        } catch (error) {
            reject(error.message);
        }
    })
};

module.exports = { createCategory, getAllCategories, getCategoryById }