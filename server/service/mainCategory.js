const Repository = require("../repository/repository")
const MainCategory = require("../models/mainCategory");

const createMainCategory = (mainCategoryName) => {
  return new Promise(async (resolve, reject) => {
    try {
      const mainCategory = await Repository.createOne(MainCategory, { mainCategoryName })
      resolve(mainCategory)
    } catch (error) {
      reject(error.message)
    }
  })
}

//read 
const getAllMainCategories = async (req, res) => {
  const popArr = [
    { path: "categories", populate:{path:'business', select:'_id businessName description galery owner keyWords'} }
  ];
  return new Promise(async (resolve, reject) => {
    try {
      const categories = await Repository.find(MainCategory, null, popArr)
      resolve(categories)
    } catch (error) {
      reject(error.message)
    }
  })
};


const getPopularCategories = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      let categories = await Repository.findMany(MainCategory)
      let max = 0
      let popularCategories = []
      await categories.forEach((element) => {
        if (element.countBusiness > max) {
          popularCategories.push(element)
          if (categories.length) {
            max = 0
            categories = categories.filter(e => element)
          }
        }
        resolve(categories)
      })
    } catch (error) {
      reject(error.message)
    }
  })
};


const getAllBusinessByMainCategory = () => {
  const popArr = [{
    path: "categories", populate: {
      path: "business"
      // , select: "businessName _id  keyWord" 
    }
  }];
  return new Promise(async (resolve, reject) => {
    try {
      const business = await Repository.find(MainCategory, null, popArr)
      resolve(business)

    } catch (error) {
      console.log("error", error)
      reject(error)
    }
  })
}

module.exports = {
  createMainCategory, getAllMainCategories, getPopularCategories, getAllBusinessByMainCategory
}