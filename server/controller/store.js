const service = require("../service/store")
//A function that receives an id for a business and creates a store for it
const createStore = async (req, res) => {
    try {
        const { businessId } = req.body;
       const business= await service.createStore(businessId)
        res.status(200).json({ business: business})
    }
    catch (error) {
        res.status(500).json({ error: error })
    }
}
//A function that receives an id for a business and returns its store
const getStore = async (req, res) => {
    try {
        const { storeId } = req.body;
        const store = await service.getStore(storeId)
        res.status(200).json({store:store})

    }
    catch (error) {
        res.status(500).json({ error: error })
    }
}
module.exports = { createStore, getStore }