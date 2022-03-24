const service = require("../service/order")

////save order by userId
const saveOrder = async (req, res) => {
    try {
        const { order, userId, orderMode } = req.body;
        const data = await service.saveOrder(order, userId, orderMode)
        res.status(200).send(data);
    } catch (error) {
        console.error("erorr save order", error.message);
        res.status(500).send(error.message);
    }
};
///get business's orders by buiness's keyWord
const getOrdersByBusinessKeyWords = async (req, res) => {
    try {
        const { keyWord } = req.params;
        const orders = await service.getOrdersByBusinessKeyWords(keyWord)
        res.status(200).json({orders:orders});
    } catch (error) {
        console.error("error on getOrdersByBusinessKeyWords: ", error);
        res.status(500).send(error.message);
    }
};
//// get user's orders by userId
const getOrdersByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const orders = await service.getOrdersByUserId(userId)
        res.status(200).send(orders);
    } catch (error) {
        console.error("error on getOrdersByUserId: ", error);
        res.status(500).send(error.message);
    }
}
/// get cart of user ( products that ordered but did not buy)
const getCartUser = async (req, res) => {
    try {
        const { userId } = req.body;
        const cart = await service.getCartUser(userId)
        res.status(200).send(cart);
    } catch (error) {
        ('error on get cart',error);
        res.status(500).send(error);
    }
};
///change order's status
const updateOrderStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        const order = await service.updateOrderStatus(orderId, status);
        res.status(200).send(order);
    } catch (error) {
        res.status(500).send(error);
    }
};


module.exports = {
    saveOrder,
    getOrdersByBusinessKeyWords,
    getOrdersByUserId,
    getCartUser,
    updateOrderStatus
};
