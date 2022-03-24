const service = require("../service/product")
//A function that receives a product and deletes it
const deleteProduct = async (req, res) => {
    try {
        const { product } = req.body;
        let deleteProduct = await service.deleteProduct(product)
        res.status(200).json({ deleteProduct })
    } catch (error) {
        res.status(500).json({ error: error })
    }
}
//A function that receives a product and updates its new details
const updteProduct = async (req, res) => {
    try {
        const { updateProduct } = req.body;
        let update = await service.updateProduct(updateProduct)
        res.status(200).json({ message: "ok update product", data: update })
    } catch (error) {
        res.status(500).json({ error: error })
    }
}
//A function that creates a new product for the store
const createProduct = async (req, res) => {
    console.log("ggg")
    try {
        const { products } = req.body
      console.log  ("productssssss", products)
        let product = await service.createProduct(products)
        console.log  ("product", product)

        res.status(200).json({ message: "ok create product", data: product })

    }
    catch (error) {
        res.status(500).json({ error: error })

    }
}
module.exports = { deleteProduct, updteProduct, createProduct }