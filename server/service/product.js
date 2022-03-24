const Repository = require("../repository/repository")
const Product = require('../models/product')
const ProductCategory = require('../models/productCategory')
const Store = require('../models/store')

const deleteProduct = (product) => {
    return new Promise(async (resolve, reject) => {
        try {

            if (product) {
                let removeProduct = await Repository.findByIdAndRemove(Product, product._id)
                resolve(removeProduct);
            }
            else
                throw { message: 'Failed to delete business' }

        } catch (error) {
            reject(error.message)
        }
    })
}
const updateProduct = (product) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (product) {
                let updateProduct = await Repository.findByIdAndUpdate(Product, product, product, null, null)
                resolve(updateProduct);
            }
            else
                throw { message: 'Failed to update business' }
        } catch (error) {
            reject(error)
        }
    })
}
const createProduct = (products) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log("producttttttttttttttttttt", products)
            if (products) {
                products && products.forEach(async ({ code, name, price, description, images, sold, store, productCategory }) => {
                    const newProduct = await Repository.createOne(Product, { code, name, price, description, images, sold }, null)
                    newProduct.category = []
                    console.log("newProduct", newProduct)
                    productCategory &&
                        productCategory.forEach(async (category) => {
                            try {
                                console.log("category", category)
                                const cat = await Repository.findOne(ProductCategory, { name: category.label }, null, null);
                                if (cat) {
                                    console.log("cat", cat)
                                    newProduct.category.push(cat._id)
                                    newProduct.save();
                                    console.log("newProduct", newProduct)
                                    cat.product ? cat.product.push(newProduct._id) : cat.product = [newProduct._id]
                                    cat.storeId.push(store)
                                    cat.save();
                                    console.log("cat", cat)

                                }
                                else {
                                    console.log("elseeeeee")
                                    let productCategory = await Repository.createOne(ProductCategory, { name: category, product: newProduct._id, storeId: newProduct.store }, null)
                                    productCategory.storeId.push(store)
                                    productCategory.save()

                                    newProduct.category.push(productCategory._id)
                                    console.log("elseeeeeenewProduct", newProduct)
                                }
                            } catch (error) {

                            }
                        })
                    const store2 = await Repository.findById(Store, store, null, null)
                    if (store2) {
                        console.log("store2", store2)
                        newProduct.storeId = await store2._id
                        store2.product ? store2.product.push(newProduct._id) : store2.product = [newProduct._id]
                    }
                    else
                        throw 'store ' + store + ' not found'
                    store2.save();
                    await newProduct.save();

                })
                resolve({ message: 'ok' });
            }
            else
                throw { message: 'Failed to update business' }

        } catch (error) {
            reject(error.message)
        }
    })
}
module.exports = {
    deleteProduct, updateProduct, createProduct
}
