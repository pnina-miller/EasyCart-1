const Repository = require("../repository/repository");
const Order = require("../models/order");
const User = require("../models/user");
const Product = require("../models/product");
const Business = require("../models/business");

const saveOrder = async (order, userId, orderMode) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (userId) {
        let u = await Repository.findById(User, userId);
        if (order) {
          let newOrder = await Repository.createOne(Order, {
            order: order,
            userId: userId,
            orderMode: orderMode === "buy" ? 1 : 0,
          });
          if (orderMode === "buy") {
            await Repository.findByIdAndUpdate(User, userId, {
              $push: { orders: newOrder._id },
            });
            if (u.cart != undefined)
              await Repository.findByIdAndRemove(Order, u.cart);
            await Repository.findByIdAndUpdate(User, userId, {
              $unset: { cart: "" },
            });
          } else if (orderMode === "save") {
            if (u.cart != undefined)
              await Repository.findByIdAndRemove(Order, u.cart);
            await Repository.findByIdAndUpdate(User, userId, {
              cart: newOrder._id,
            });
          }
        }
        resolve("save order successfully good ");
      }
    } catch (error) {
      console.error("erorr save order", error);
      reject(error);
    }
  });
};
const getOrdersByBusinessKeyWords = async (keyWords) => {
  return new Promise(async (resolve, reject) => {
    try {
      const business = await Repository.findOne(Business, { keyWords });
      const popArr = [
        { path: "userId", select: "phone email userName" },
        { path: "order.products.productId" },
        { path: "order.businessId" },
      ];
      let orders = await Repository.find(
        Order,
        { "order.businessId": business._id, orderMode: 1 },
        popArr
      );
      orders.forEach(
        (order) =>
          (order.order = order.order.filter(
            (o) => o.businessId && o.businessId.keyWords == keyWords
          ))
      );
      resolve(orders);
    } catch (error) {
      console.error("error on getOrdersByBusinessId: ", error);
      reject(error.message);
    }
  });
};

const getOrdersByUserId = async (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const popArr = [
        { path: "order.businessId",select:'businessName galery phone email' },
        { path: "userId", select: "phone email userName" },
        { path: "order.products.productId" },
      ];
      const orders = await Repository.find(
        Order,
        { userId: userId, orderMode: 1 },
        popArr
      );
      resolve(orders);
    } catch (error) {
      console.error("error on getOrdersByUserId: ", error);
      reject(error.message);
    }
  });
};

const getCartUser = async (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let cart;
      let user = await Repository.findById(User, userId);
      const popArr = [
        {
          path: "order.products.productId",
          select: " images name price description",
        },
      ];
      cart = await Repository.findById(Order, user.cart, popArr);
      resolve(cart.order);
    } catch (error) {
      reject(error.message);
    }
  });
};
const updateOrderStatus = async (orderId, status) => {
  return new Promise(async (resolve, reject) => {
    try {
      const order = await Repository.findByIdAndUpdate(Order, orderId, {
        orderMode: status,
      });
      resolve(order);
    } catch (error) {
      reject(error.message);
    }
  });
};

module.exports = {
  saveOrder,
  getOrdersByBusinessKeyWords,
  getOrdersByUserId,
  getCartUser,
  updateOrderStatus,
};
