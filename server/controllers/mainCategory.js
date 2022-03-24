const MainCategory = require("../models/mainCategory");
const Category = require("../models/category");
// //createMainCategory

const createMainCategory = async (req, res) => {
  const { mainCategoryName } = req.body;
  const newMainCategory = new MainCategory({
    mainCategoryName
  });
  try {
    await newMainCategory.save();
    await newBuisness.save();
    return res.status(200).json(newMainCategory);
  } catch (error) {
    return res
      .status(400)
      .json({ error: "can't save main category", massage: error.maasage });
  }
  const getMain = await MainCategory.findById(
    "5fbba4cb8102fc20b0b632d6"
  ).populate("mainCategory");

};

///return the 3 Popular categories  (use)
const getPopularCategories = async (req, res) => {
  let categories = await MainCategory.find()
  let max = 0
  let popularCategories = []
  ////בהמשך שיהיה נתונים לשנות את זה ליותר גדול מ2
  try {
    // while (popularCategories.length !== 2) {
    categories.forEach((element) => {
      if (element.countBusiness > max) {
        popularCategories.push(element)
        if (categories.length) {
          max = 0
          categories = categories.filter(e => element)
        }
      }
    }
    )
    // popularCategories.forEach((element) => {
    // })
    res.json(popularCategories);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

//use
const getAllMainCategories = async (req, res) => {
  try {
    const categories = await MainCategory.find().populate(
      {
        path: "categories",
        select: "categoryName"
      }
    )
    return res.json(categories);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

const getAllBusinessByMainCategory = async (req, res) => {
  try {
    const business = await MainCategory.find()
      .populate({
        path: "categories",
        populate: {
          path: "business"
        }
      }).then(res.json(business))
  } catch (error) {
    res.json(error)
  }
}
const enterCategoryToMain = async (req, res) => {
  ("enter herrrrrrrrrrreeeeeee");
  const category = await Category.find()
  category.forEach(c => {
    c.mainCategories.forEach(async id => {
      const mainCategory = await MainCategory.findById(id)
      if (mainCategory) {
        ("enter mainnnnn");
        mainCategory.categories && mainCategories.categories.push(c._id)
        mainCategory.categories = [...new Set(mainCategory.categories)]
        mainCategory.save()
      }
    })
  })
}
// const isMainCategoryExsist = async (req, res) => {
//   try {
//     const { nameCategory } = req.body
//     ("enterrrrrr,mainnnn", nameCategory);
//     const mainCategory = await MainCategory.findOne({ mainCategoryName: nameCategory })
//     ("maincatgory", mainCategory);
//     if (mainCategory != null)
//       res.status(200).json({ mainCategory: mainCategory });
//     else
//       res.status(400).json({ message: err.message });
//   } catch (error) {
//     ('error in isCategoryExsist function')
//   }
// }

  const enterCategoryToMain = async (req, res) => {
    console.log("enter herrrrrrrrrrreeeeeee");
    const category = await Category.find()
    category.forEach(c => {
      c.mainCategories.forEach(async id => {
        const mainCategory = await MainCategory.findById(id)
        if (mainCategory) {
          console.log("enter mainnnnn");
          mainCategory.categories && mainCategories.categories.push(c._id)
          mainCategory.categories = [...new Set(mainCategory.categories)]
          mainCategory.save()
        }
      })
    })
  }
  // const isMainCategoryExsist = async (req, res) => {
  //   try {
  //     const { nameCategory } = req.body
  //     console.log("enterrrrrr,mainnnn", nameCategory);
  //     const mainCategory = await MainCategory.findOne({ mainCategoryName: nameCategory })
  //     console.log("maincatgory", mainCategory);
  //     if (mainCategory != null)
  //       res.status(200).json({ mainCategory: mainCategory });
  //     else
  //       res.status(400).json({ message: err.message });
  //   } catch (error) {
  //     console.log('error in isCategoryExsist function')
  //   }
  // }

  module.exports = {
    createMainCategory,
    getAllMainCategories,
    getPopularCategories,
    enterCategoryToMain,
    getAllBusinessByMainCategory
    // isMainCategoryExsist
  };