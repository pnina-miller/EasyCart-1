const Order = require("../models/order");
const User = require("../models/user");
const Product = require("../models/product");
const Business = require("../models/business");
const Mongoose = require("mongoose");

const saveOrder = async (req, res) => {
  try {
    const { order, userId, orderMode } = req.body;
    if (userId) {
      let u = await User.findById(userId);
      if (order) {
        let newOrder = new Order({
          order: order,
          userId: userId,
          orderMode: orderMode === "buy" ? 1 : 0,
        });
        await newOrder.save();

        if (orderMode === "buy") {
          await User.findByIdAndUpdate(userId, {
            $push: { orders: newOrder._id },
          });
          await Order.findByIdAndDelete(u.cart);
          await User.findByIdAndUpdate(userId, { $unset: { cart: "" } });
        } else if (orderMode === "save") {
          if (u.cart != undefined) await Order.findByIdAndDelete(u.cart);
          await User.findByIdAndUpdate(userId, { cart: newOrder._id });
        }
      }
      res.status(200).send("save order successfully");
    }
  } catch (error) {
    res.status(500).send(error.message);
    console.error("erorr save order", error.message);
  }
};
const getOrdersByBusinessKeyWords = async (req, res) => {
  try {
    const { keyWords } = req.body;
    const business=await Business.findOne({keyWords})
    let orders = await Order.find({
      "order.businessId": business._id,
      orderMode: 1,
    }).populate({ path: 'userId', select: "phone email userName" }).populate("order.products.productId").populate('order.businessId')
    orders.forEach(order => order.order = order.order.filter(o => o.businessId.keyWords == keyWords))
    // orders=orders.filter(order => order.order[0])
    /* const orders = await Order.aggregate([{
      $project: {
        order: {
          $filter: {
            input: '$order',
            as: "order",
            cond: {$eq:['$$order.businessId', '$$order.businessId'] }
          }
        }
      }
    }])*/
    res.status(200).send(orders);
  } catch (error) {
    console.error("error on getOrdersByBusinessId: ", error);
    res.status(500).send(error.message);
  }
};
const getOrdersByUserId = async (req, res) => {
  const { userId } = req.body;
  try {
    const orders = await Order.find({
      userId: userId,
      orderMode: 1,
    }).populate({ path: 'userId', select: "phone email userName" })
      .populate("order.products.productId")
    res.status(200).send(orders);
  } catch (error) {
    console.error("error on getOrdersByUserId: ", error);
    res.status(500).send(error.message);
  }
}
const getCartUser = async (req, res) => {
  try {
    const { userId } = req.body;
    let cart;
    let user = await User.findById(userId);
    if (user) {
      cart = await Order.findById(user.cart).populate({
        path: "order.products.productId",
        select: " images name price description",
      });
    }
    res.status(200).send(cart.order);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    const order = await Order.findByIdAndUpdate(orderId, { orderMode: status });
    res.status(200).send(order);
  } catch (error) {
    res.status(500).send(error.message);
  }
};


module.exports = {
  saveOrder,
  getOrdersByBusinessKeyWords,
  getOrdersByUserId,
  getCartUser,
  updateOrderStatus
};
