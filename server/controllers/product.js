const Product = require("../models/product");
const Store = require("../models/store");
const ProductCategory = require("../models/productCategory");


const getProductsByStore = async (req, res) => {
  try {
    const { storeId } = req.params;
    const products = await Product.find({ storeId: storeId }).populate('category')
    res.status(200).send(products)
  } catch (error) {
    res.status(500).send(error)
  }
}
const getProductsByCategory = async (req, res) => {
  try {
    const { product_id, title, price, description, content, images, business, stockAmount } = req.body;
    if (!images) return res.status(400).json({ msg: "No image upload" });
    const product = await Product.findOne({ product_id });
    if (product)
      return res.status(400).json({ msg: "This product already exists." });
    const findBusiness = await Business.findById({ _id: business });
    if (findBusiness != null) {
      const newProduct = new Product({ product_id, title: title.toLowerCase(), price, description, content, images, business: findBusiness._id, category: [], });
      await newProduct.save();
      res.status(200).json({ msg: "create product succesfully", newProduct: newProduct });
    }
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
}
const createProduct = async (req, res) => {
  const { products } = req.body
  ("prppp", products)
  products && products.forEach(async ({ code, name, price, description, images, sold, store, productCategory }) => {
    try {
      // (images)
      const newProduct = new Product({ code, name, price, description, images, sold })
      ("new", newProduct)
      newProduct.category = []
      productCategory &&
        productCategory.forEach(async (category) => {
          const cat = await ProductCategory.findOne({ name: category })
          ("cat", cat)
          if (cat) {
            newProduct.category.push(cat._id)
            cat.product ? cat.product.push(newProduct._id) : cat.product = [newProduct._id]
            cat.storeId.push(store)
            await cat.save();
            await newProduct.save();
            ("cat1", cat)
            ("canewProductt", newProduct)
          }
          else {
            let productCategory = new ProductCategory({ name: category, product: newProduct._id, storeId: newProduct.store })
            productCategory.storeId.push(store)
            productCategory.save()
            newProduct.category.push(productCategory._id)
            // ('category', category, 'not found');

          }
        })
      const store2 = await Store.findById(store);
      ("store2222222222", store2);
      if (store2) {
        ("store2", store2)
        newProduct.storeId = await store2._id
        await newProduct.save();
        ("newProductnewProduct", newProduct)
        store2.product ? store2.product.push(newProduct._id) : store2.product = [newProduct._id]
      }
      else
        throw 'store ' + store + ' not found'
      // await newProduct.save();
      await store2.save();
      res.status(200).send('ok')
    } catch (error) {
      console.error('failed to create product ', error);
      res.status(500).send('failed to create product ' + error)
    }
  })
}

const getProductsByStoreAndCategory = async (req, res) => {
  try {
    const { storeId, categoryId } = req.params;
    const products = await Product.find({ storeId: storeId, category: categoryId }).populate('category')
    res.status(200).send(products)

  } catch (error) {
    res.status(500).send(error)
  }
}
const updteProduct = async (req, res) => {
  try {
    const { updateProduct } = req.body;
    await Product.findOneAndUpdate({ _id: updateProduct._id }, updateProduct)
    res.status(200).send('ok update product')
  } catch (error) {
    res.status(500).send(error)
  }
}

const deleteProduct = async (req, res) => {
  try {
    const product = req.body;
    ("product", product)
    (await Product.findOneAndDelete({ _id: product.product._id }));
    res.status(200).send('ok delete product')
  } catch (error) {
    res.status(500).send(error)
  }
  //   const products = req.body
  //   products.forEach(async (idProduct) => {
  //     const product = await Product.findOne({ _id: idProduct })
  //     if (product) {
  //       product.category.forEach(async(idCategory)=>{
  //       await ProductCategory.findByIdAndUpdate(idCategory,{ $pull: { "product": idProduct } })
  //       })
  //       await Store.findByIdAndUpdate(product.storeId, { $pull: { "product":idProduct} })
  //       await Product.deleteOne({ _id: idProduct })
  //     }
  //     else {
  //       res.status(500).send(error)
  //     }
  //   })
  //   res.status(200).send("ok delete product")
  // } 
  // catch (error) {
  //   res.status(500).send(error)
  // }
}

module.exports = {
  createProduct,
  getProductsByStore,
  getProductsByStoreAndCategory,
  getProductsByCategory,
  updteProduct,
  deleteProduct
}





















// // Filter, sorting and paginating

// class APIfeatures {
//   constructor(query, queryString) {
//     this.query = query;
//     this.queryString = queryString;
//   }
//   filtering() {
//     const queryObj = { ...this.queryString }; //queryString = req.query

//     const excludedFields = ["page", "sort", "limit"];
//     excludedFields.forEach((el) => delete queryObj[el]);

//     let queryStr = JSON.stringify(queryObj);
//     queryStr = queryStr.replace(
//       /\b(gte|gt|lt|lte|regex)\b/g,
//       (match) => "$" + match
//     );

//     //    gte = greater than or equal
//     //    lte = lesser than or equal
//     //    lt = lesser than
//     //    gt = greater than
//     this.query.find(JSON.parse(queryStr));

//     return this;
//   }

//   sorting() {
//     if (this.queryString.sort) {
//       const sortBy = this.queryString.sort.split(",").join(" ");
//       this.query = this.query.sort(sortBy);
//     } else {
//       this.query = this.query.sort("-createdAt");
//     }

//     return this;
//   }

//   paginating() {
//     const page = this.queryString.page * 1 || 1;
//     const limit = this.queryString.limit * 1 || 9;
//     const skip = (page - 1) * limit;
//     this.query = this.query.skip(skip).limit(limit);
//     return this;
//   }
// }
// const getProducts = async (req, res) => {
//   try {
//     const features = new APIfeatures(Product.find(), req.query)
//       .filtering()
//       .sorting()
//       .paginating();

//     const products = await features.query;

//     res.json({
//       status: "success",
//       result: products.length,
//       products: products,
//     });
//   } catch (err) {
//     return res.status(500).json({ msg: err.message });
//   }
// };

// const createProduct = async (req, res) => {
//   try {
//     const {
//       product_id,
//       title,
//       price,
//       description,
//       content,
//       images,
//       business,
//     } = req.body;

//     if (!images) return res.status(400).json({ msg: "No image upload" });

//     const product = await Product.findOne({ product_id });
//     if (product)
//       return res.status(400).json({ msg: "This product already exists." });

//     const findBusiness = await Business.findById({
//       _id: business,
//     });
//     if (findBusiness != null) {
//       ("hello find");
//       const newProduct = new Product({
//         product_id,
//         title: title.toLowerCase(),
//         price,
//         description,
//         content,
//         images,
//         business: findBusiness._id,
//         category: [],
//       });
//       ("before:", newProduct);
//       await newProduct.save();
//       ("new:", newProduct);
//       // Promise.all(
//       //   category.map(async (element) => {
//       //     ("enter", newProduct);
//       //     const findCategory = await ProductCategory.findOne({
//       //       name: element,
//       //     });
//       //     if (findCategory != null) {
//       //       ("c", findCategory);
//       //       await newProduct.category.push(findCategory._id);
//       //       ("newProduct:", newProduct);
//       //     } else {
//       //       ("didnt find category");
//       //     }
//       //   })
//       // ).then(async () => {
//       //   await newProduct.category.save();
//       //   await findBusiness.product.push(newProduct);
//       //   await findBusiness.save();
//       // });

//       res.status(200).json({ msg: "create product", newProduct: newProduct });
//     }
//   } catch (err) {
//     return res.status(500).json({ msg: err.message });
//   }
// };

// const deleteProduct = async (req, res) => {
//   try {
//     await Product.findByIdAndDelete(req.params.id);
//     res.json({ msg: "Deleted a Product" });
//   } catch (err) {
//     return res.status(500).json({ msg: err.message });
//   }
// };

// const updateProduct = async (req, res) => {
//   try {
//     const { title, price, description, content, images, category } = req.body;
//     if (!images) return res.status(400).json({ msg: "No image upload" });

//     await Product.findOneAndUpdate(
//       { _id: req.params.id },
//       {
//         title: title.toLowerCase(),
//         price,
//         description,
//         content,
//         images,
//         category,
//       }
//     );

//     res.json({ msg: "Updated a Product" });
//   } catch (err) {
//     return res.status(500).json({ msg: err.message });
//   }
// };

// module.exports = {
//   getProducts,
//   createProduct,
//   deleteProduct,
//   updateProduct,
// };
