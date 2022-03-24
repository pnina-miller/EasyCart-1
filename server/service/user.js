const Repository = require("../repository/repository");
const User = require("../models/user");
const businessService = require("../service/business");
const Store = require("../models/store");
const Order = require("../models/order");

const getAll = async () => {
  try {
    return await Repository.find(User);
  } catch (error) {
    throw error;
  }
};

const getById = async (id) => {
  try {
    return await Repository.findById(User, id);
  } catch (error) {
    throw error;
  }
};

const getDetailsById = async (userId) => {
  const popArr = [{ path: "business" }];
  try {
    return await Repository.findById(User, userId, popArr);
  } catch (error) {
    throw error;
  }
};

const getDetailsByUserName = async (userName) => {
  try {
    const popArr = [
      { path: "cart" },
      {
        path: "business",
        //check why needed?
        populate: {
          path: "userRecommendation",
        },
        populate: {
          path: "category",
        },
      },
    ];
    return await Repository.findOne(User, { userName }, popArr);
  } catch (error) {
    throw error;
  }
};

const updateById = async (userId,user) => {
  try {
    return await Repository.findByIdAndUpdate(User,userId, user);
  } catch (error) {
    throw error;
  }
};

const addCart = async (userId, cart) => {
  try {
    return await Repository.findByIdAndUpdate(User, userId, { cart });
  } catch (error) {
    throw error;
  }
};

const createOne = async (userName) => {
    try {
       return await Repository.createOne(User,{userName},{userName})
    } catch (error) {
        if(error.status===400)
        return error.doc
     throw error
    }
  };

  const deleteById = async (userId) => {
    try {
       const businesses= await businessService.getAllBusinessPerUser(userId)
       businesses.forEach(async business=>{await businessService.deleteMyBussinessById(business._id) })
       //check delete orders and cart with order service
       Repository.deleteMany(Order,{userId})
       return await Repository.findByIdAndRemove(User,userId)

    } catch (error) {
        if(error.status===400)
        return error.doc
     throw error
    }
  };

module.exports = {
  getAll,
  getById,
  getDetailsById,
  getDetailsByUserName,
  updateById,
  addCart,
  createOne,
  deleteById
};
