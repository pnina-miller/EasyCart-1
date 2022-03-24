const Product = require("../models/product");
const ProductCategory = require("../models/productCategory");
const Store = require("../models/store");

//not work
const getProductCategories = async (req, res) => {
  try {
    const categories = await ProductCategory.find({}, "_id name");
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
const getCategoriesByStore = async (req, res) => {
  try {
    const { storeId } = req.body
    let categories = [];
    if (storeId!==undefined)
      categories = await ProductCategory.find({ storeId: storeId }, "_id name");
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ msg: err.message });
    console.error("error in getCategoriesByStore");
  }
};
const createProductCategory = async (req, res) => {
  try {
    const { categories } = req.body;
    const { storeId } = req.params;
    // const Productcategory = await ProductCategory.findOne({ name: name });
    // if (Productcategory) {
    //   return res.status(400).json({ msg: "This category already exists." });
    // } else {
      ("hrlooooo")
    const store = await Store.findById({ _id: storeId });
    if (store != null) {
      
      await categories.forEach(async (element) => {
        let addCategory
        if (element.__isNew__) {

          addCategory = await new ProductCategory({ name: element.value });
        }
        else {
          addCategory = await ProductCategory.findOne({ name: element.value });
        }
        let flag = false
        if (addCategory.storeId) {
          await addCategory.storeId.forEach(async (element) => {
            if (element === storeId) {
              flag = true
            }
          })
          if (!flag) {
            addCategory.storeId.push(store._id)
            await Store.findByIdAndUpdate(storeId, { $push: { category: addCategory._id }, });
          }
        }
        else {
          addCategory.storeId = [store._id]
          await Store.findByIdAndUpdate(storeId, { $push: { category: addCategory._id }, });
        }
        await addCategory.save();
      });
      await store.save();

      res.json({ msg: "Created a category", store });
    } else {
      res.json({ msg: "the store didn't find" });
    }
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
}

const deleteProductCategory = async (req, res) => {
  try {
    //need it?

    // const products = await Product.findOne({ category: req.params.id });
    // if (products)
    //   return res.status(400).json({
    //     msg: "Please delete all products with a relationship.",
    //   });

    //try this code
    // await Store.findByIdAndUpdate(store_id, {
    //   $pull: { category: },
    // });

    await ProductCategory.findByIdAndDelete(req.params.id);
    res.json({ msg: "Deleted a Category" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
const updateProductCategory = async (req, res) => {
  try {
    const { name } = req.body;
    await ProductCategory.findOneAndUpdate({ _id: req.params.id }, { name });

    res.json({ msg: "Updated a category" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

module.exports = {
  getProductCategories,
  createProductCategory,
  deleteProductCategory,
  updateProductCategory,
  getCategoriesByStore
};
