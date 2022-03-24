const service = require("../service/productCategory")
//Retrieving all categories for a product in a catalog
const getProductCategories = async (req, res) => {
    try {
        const categories = await service.getProductCategories()
        res.status(200).json(categories )
    }
    catch (error) {
        res.status(500).json({ error: error })
    }
}
//A function that accepts storeId and returns all the categories that belong to it
const getCategoriesByStore = async (req, res) => {
    try {
        const { storeId } = req.body
        const categories = await service.getCategoriesByStore(storeId)
        res.status(200).json({  categories })
    }
    catch (error) {
        res.status(500).json({ error: error })
    }
}
//A function that creates a new category
const createProductCategory = async (req, res) => {
    try {
        const { categories } = req.body;
        const { storeId } = req.params;
        const store = await service.createProductCategory(categories,storeId)
        res.status(200).json({ message: "ok all categories", data: store })
    }
    catch (error) {
        res.status(500).json({ error: error })
    }
}

module.exports = { getProductCategories, getCategoriesByStore, createProductCategory }