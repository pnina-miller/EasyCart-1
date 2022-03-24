const service = require("../service/category")

//get new category and save in DB in mainCategory
const createCategory = async (req, res) => {
  try {
    const { mainCategories, categoryName, type } = req.body;
    const newCategory = await service.createCategory(mainCategories, categoryName, type)
    res.status(200).json({ message: "created category successfully", Category: newCategory });
  } catch (error) {
    res.status(500).json({ massage: "can't create new category", error: error.message });
  }
};

//read category by categoryId sent
const getCategoryById = async (req, res) => {
  try {
    const params = req.params.id;
    const readCategory = await service.getCategoryById(params)
    res.status(200).json({ message: "success", myCategory: readCategory });
  }
  catch (error) {
    res.status(500).json({ message: "can't get category", error: error.massage });
  }
};

//read all categories from DB
const getAllCategories = async (req, res) => {
  try {
    const categories = await service.getAllCategories()
    res.status(200).json({ categories: categories });
  } catch (err) {
    res.status(500).json({ message: "can't read all categories", error: err.message });
  }
};


module.exports = {
  createCategory, getAllCategories, getCategoryById
}