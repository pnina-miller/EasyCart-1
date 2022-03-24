const service = require("../service/mainCategory")


//get new main-Category and save in DB
const createMainCategory = async (req, res) => {
  try {
    const { mainCategoryName } = req.body;
    const newMainCategory = await service.createMainCategory(mainCategoryName)
    res.status(200).json({
      message: "created main-category successfully", mainCategory: newMainCategory
    })
  } catch (error) {
    res.status(500).json({ error: "can't save main category", message: error.message });
  }
};

//get all main-categories from DB
const getAllMainCategories = async (req, res) => {
  try {
    mainCategory = await service.getAllMainCategories()
    res.status(200).json({ message: "get all mainCategory successfully", mainCategory: mainCategory });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//read main categories that have the most business
const getPopularCategories = async (req, res) => {
  try {
    popularCategories = await service.getPopularCategories()
    res.status(200).json({ "popularCategories": popularCategories });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

//get all business order to mainCategory that id sent
const getAllBusinessByMainCategory = async (req, res) => {
  try {
    allBusiness = await service.getAllBusinessByMainCategory()
    res.status(200).json({ "allBusiness": allBusiness });
  } catch (error) {
    console.log("error controller")

    res.status(400).json({ message: error });
  }
}

module.exports = { createMainCategory, getAllMainCategories, getPopularCategories, getAllBusinessByMainCategory }
