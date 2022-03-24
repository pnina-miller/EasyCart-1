const Category = require("../models/category");
const MainCategory = require("../models/mainCategory");

const createCategory = async (req, res) => {
("Creating category")
  const { mainCategories, categoryName, type } = req.body;
  let newCategory = new Category({
    categoryName,
    type,
  });
  try {
    await newCategory.save();
    Promise.all(
      mainCategories.map(async (element) => {
        const findMainCategory = await MainCategory.findOne({
          mainCategoryName: element,
        });
        await findMainCategory.categories.push(newCategory);
        await newCategory.mainCategories.push(findMainCategory);
        await newCategory.save();
        await findMainCategory.save();
      })
    ).then(async () => {
      await newCategory.save();
      res.status(200).json({ newCategory: newCategory });
    });
  } catch (error) {
    console.error('error on createCategory', error)
    res.status(400).json({ massage: "can't create new category ", error: error });
  }
};

//read by main category
const getCategoryById = async (req, res) => {
  let readCategory;
  try {
    readCategory = await Category.findById(req.params.id);
    if (readCategory == null) {
      res.send("coudnt have a category");
    } else {
      return res.json({ status: 200, myCategory: readCategory });
    }
  } catch (error) {
    console.error('error  on getCategoryById', error);
    res.status(400).json({ massage: " error.maasage", error: error });
  }
};

//readAllCategories (work and update)
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    ("enter sub");
    return res.send(categories);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

//update
const updateCategory = async (req, res) => {
  let updateCtegory = req.body;
  try {
    const newCategory = await Category.findByIdAndUpdate(
      { _id: req.params.id },
      updateCtegory
    );
    res.json({ newCategory });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

//delete
const deleteCategory = async (req, res) => {
  try {
    await Category.findOneAndDelete(req.params.id);
    res.status(200).json({ "message:": "the category is deleted!" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// const isSubCategoryExsist = async (req, res) => {
//   try {
//     const { nameCategory } = req.body
//     ("enterrrrrr", nameCategory);
//     const subCategory = await Category.findOne({ categoryName: nameCategory })
//     subCategory ? res.status(200).json({ subCategory: subCategory }) : json.status(200).send("not exsist")
//   } catch (error) {
//     ('error in isCategoryExsist function')
//   }
// }



module.exports = {
  createCategory,
  getCategoryById,
  updateCategory,
  getAllCategories,
  deleteCategory,
  // isSubCategoryExsist
};