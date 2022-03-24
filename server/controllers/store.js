const Business = require("../models/business");
const Store = require("../models/store");


const createStore = async (req, res) => {
    try {
        const { businessId
            // , delivery 
        } = req.body;
        if (businessId) {
            const business = await Business.findById(businessId);
            let status = ''
            if (business.storeId && business.storeId !== '') {
                console.error('store already exist')
                return res.status(422).send('store already exist')
            }
            else {
                const newStore = new Store({
                    buisnessId: business._id,
                    // delivery: delivery
                })
                newStore.save();
                business.storeId = newStore._id
                business.save();
                status = 'create first new store'
            }
            res.status(200).json({ status: status, storeId: business.storeId });
        }
        else{
            res.status(500).json({ message: 'error on create store' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.error('error on create store', err.message)

    }
}

const getCategoriesByStore = async (storeId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const store = await Store.findById(storeId, 'product').populate({
                path: 'product',
                select: "_id",
                populate: {
                    path: "category",
                    select: "name _id "
                }
            })
            let arrCategories = []
            store.product.forEach((element) => {
                element.category.forEach((elementCategory) => {
                    if (arrCategories.indexOf(elementCategory) < 0) {
                        arrCategories.push(elementCategory)
                    }
                })
            })
            resolve(arrCategories);
        } catch (err) {
            reject(err);
        }
    })

}

const getStore = async (req, res) => {
    const { businessId } = req.body;
    try {
        const store = await Store.findById(businessId).populate({
            path: 'product',
            populate: {
                path: "category",
                select: "name _id "
            }
        }).populate('category');
        const categories = await getCategoriesByStore(store._id)
        res.status(200).json({ store: store, categories: categories });
    } catch (error) {
        res.status(500).json('failed get store ' + error.message)
    }
}
const deleteStoreById = async (req, res) => {
    const { storeId } = req.body
    try {
        Store.findByIdAndDelete(storeId);
        res.status(200).json('delete store succesfully');
    }
    catch (error) {
        res.status(500).json(error.message);
    }
}
module.exports = {
    createStore,
    getStore,
    deleteStoreById,

};