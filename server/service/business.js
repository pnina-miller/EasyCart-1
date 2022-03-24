const nodemailer = require("nodemailer");
const Category = require("../models/category");
const User = require("../models/user");
const MainCategory = require("../models/mainCategory");
const Business = require("../models/business");
const Repository = require("../repository/repository");
const Order = require("../models/order");
const Recommendation = require("../models/recommendation");
const Store = require("../models/store");
const Service = require("../models/service");

const createBusiness = async (business, citiesForAdvertising) => {
  try {
    const newBuisness = await Repository.createOne(
      Business,
      {
        ...business,
        category: [],
        galery: business.galery ? business.galery.photos : [],
        citiesForAdvertising: citiesForAdvertising,
      },
      { keyWords: business.keyWords }
    );
    const user = await Repository.findByIdAndUpdate(User, newBuisness.owner, {
      $push: { business: newBuisness },
    });
    await Promise.all(
      business.category &&
      business.category.map(async (element) => {
        await Repository.findByIdAndUpdate(Category, element, {
          $push: { business: newBuisness },
        });
        newBuisness.category.push(element);
        await Repository.updateMany(
          MainCategory,
          { categories: element },
          { $inc: { countBusiness: 1 } }
        );
      })
    );
    await newBuisness.save();

    //send email to a user who has taken ownership
    sendEmail(user.email, newBuisness.businessName);
    return { massage: "create new business", business: newBuisness };
  } catch (err) {
    console.error("error on createBusiness ", err);
    throw { message: err.message };
  }
};

const getBusinessById = async (businessId) => {
  try {
    return await Repository.findById(Business, businessId);
  } catch (error) {
    throw { message: error };
  }
};

const getBusinessDetailsByKeyWord = async (keyWord) => {
  try {
    const popArr = [
      { path: "category" },
      { path: "owner" },
      { path: "service" },
      {
        path: "userRecommendation",
        skip: 0,
        limit: 3,
        populate: { path: "UserId", select: "userName" },
      },
    ];
    let business = await Repository.findOneAndUpdate(
      Business,
      { keyWords: keyWord },
      { $inc: { totalClicks: 1 } },
      popArr
    );
    if (!business)
      throw { message: "This business does'nt exist", status: 400 };
    return business;
  } catch (error) {
    throw error;
  }
};

const getBusinessByCategory = async (getCategory) => {
  try {
    let businesses = await Repository.find(Business, { category: getCategory });
    return businesses;
  } catch (err) {
    throw { message: err.message || err };
  }
};

const getAllBusinessPerUser = async (userId) => {
  try {
    return await Repository.find(Business, { owner: userId });

  } catch (err) {
    throw { message: err.message || err };
  }
};

const getBusinessByMainCategory = async (categoryId) => {
  try {
    const popArr = [{ path: "categories", populate: { path: "business" } }];
    return await Repository.findById(MainCategory, id, popArr);
  } catch (error) {
    throw { massage: error.maasage, status: error.status };
  }
};

const addClicksToBusiness = async (businessId) => {
  try {
    return await Repository.findByIdAndUpdate(Business, businessId, {
      $inc: { totalClicks: 1 },
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const deleteFavoraitsByBusinessId = async (userId, businessId) => {
  try {
    await Repository.findByIdAndUpdate(
      User,
      userId,
      { $pullAll: { favorites: [businessId] } },
      { new: true }
    );
    return await Repository.findByIdAndUpdate(Business, businessId, {
      $inc: { totalAddedToFavorites: -1 },
    });
  } catch (err) {
    throw err;
  }
};

const getPromotedBusiness = async () => {
  try {
    const popArr = [{ path: "category" }];
    return Repository.find(Business, { paidUp: "premium" });
  } catch (error) {
    throw error;
  }
};

//check move to user service
const getAllFavoraitsPerUser = async (userId) => {
  try {
    const popArr = [{ path: "favorites" }];
    const selectStr = "favorites";
    return await Repository.findById(User, userId, popArr, selectStr);
  } catch (err) {
    throw err;
  }
};

const addUsersGaleryOfBusiness = async (galery, businessId) => {
  try {
    return await Repository.findByIdAndUpdate(Business, businessId, {
      $push: { userGalery: galery },
    });
  } catch (err) {
    throw err;
  }
};

const addFavoraitsToBusiness = async (businessId, userId) => {
  try {
    if (await Business.findById(businessId)) {
      if (!(await Repository.findOne(User,
        { $and: [{ _id: userId }, { favorites: { $in: [businessId] } }] }))) {
        await Repository.findByIdAndUpdate(User, userId, {
          $addToSet: { favorites: businessId }
        });
        return await Repository.findByIdAndUpdate(Business, businessId, {
          $inc: { totalAddedToFavorites: 1 }
        });
      }
      else return null
    }
    else
      throw {
        message: `business ${businessId} doc not exist`,
        status: 400,
      };
  } catch (error) {
    throw error;
  }
};

const deleteMyBussinessById = async (businessId) => {
  try {
    await Repository.findByIdAndRemove(Business, businessId);
    let user = await Repository.updateMany(User, null, {
      $pullAll: [{ business: [businessId] }, { favorites: [businessId] }],
    });
    await Repository.updateMany(Category, null, {
      $pullAll: { business: [businessId] },
    });
    //check move to order service
    await Repository.deleteMany(Order, { businessId });
    //check move to Recommendation service
    await Repository.deleteMany(Recommendation, { businessId });
    //check move to Store service
    await Repository.deleteMany(Store, { businessId });
    return businessId;
  } catch (error) {
    throw error;
  }
};
const checkKeyWords = async (keyWords) => {
  try {
    return !!(await Repository.findOne(Business, { keyWords }));
  } catch (error) {
    if (error.status === 400) return false;
    throw error;
  }
};
//check gili
const getAllBusinessName = async () => {
  try {
    const selectStr = "keyWords galery";
    return await Repository.find(Business, null, null, selectStr);
  } catch (err) {
    throw err;
  }
};
//check check check
const updateBusiness = (updateBusiness) => {
  return new Promise(async (resolve, reject) => {
    try {
      const u = await User.findById(updateBusiness.owner);

      if (u != null) {
        const id = u._id;
        updateBusiness.owner = id;
      } else {

      }
      let updateService = []
      if (updateBusiness && updateBusiness.service) {
        for (const element of updateBusiness.service) {
          if (element.__isNew__) {
            const addservice = await Repository.createOne(Service, { name: element.value });
            addservice.business.push(updateBusiness._id)
            addservice.save();
            updateService.push(addservice._id)
          }
          else {
            const service = await Repository.findOneAndUpdate(Service, { name: element.value }, { $addToSet: { business: updateBusiness._id } })
            updateService.push(service._id)
          }
        }
      }
      updateBusiness.service = []
      await Promise.all(
        updateBusiness.category && updateBusiness.category.map(async (element) => {
          const findCategory = await Category.findOne({
            _id: element,
          });
          await Category.findByIdAndUpdate(element,
            { $pullAll: { business: [updateBusiness._id] } },
            { new: true });
          Business.findByIdAndUpdate(updateBusiness._id,
            { $pullAll: { category: [element] } },
            { new: true });
          await findCategory.business.push(updateBusiness);
          await findCategory.save();
          findCategory.mainCategories.forEach(async (element) => {
            const mainCategory = await MainCategory.findOne({ _id: element });
            if (mainCategory) {
              mainCategory.countBusiness = mainCategory.countBusiness + 1;
              mainCategory.save();
            }
          });

        })
      )
      let arrCategory = [];
      arrCategory = updateBusiness.category;
      updateBusiness.category = [];
      business = await Business.findByIdAndUpdate(updateBusiness._id,
        { ...updateBusiness, service: updateService }
      );

      if (business) {
        business.category = [];
        arrCategory.forEach((element) => {
          business.category.push(element);
        });
        await business.save();
        b = await Business.findById(business._id);
        resolve(b)
      }

    }
    catch (error) {
      reject(error)
    }
  })

};

const addLinkToVideo = async (linkToVideo, businessId) => {
  try {
    return await Repository.findByIdAndUpdate(Business, businessId, {
      $push: { linkToVideo: linkToVideo },
    });
  } catch (err) {
    throw err;
  }
};


const addUsersLinkVideo = async (usersVideolink, businessId) => {
  try {
    return await Repository.findByIdAndUpdate(Business, businessId, {
      $push: { usersVideolink: usersVideolink },
    });
  } catch (err) {
    throw err;
  }

};

module.exports = {
  createBusiness,
  getBusinessById,
  getBusinessDetailsByKeyWord,
  getBusinessByCategory,
  getAllBusinessPerUser,
  getBusinessByMainCategory,
  addClicksToBusiness,
  deleteFavoraitsByBusinessId,
  getPromotedBusiness,
  getAllFavoraitsPerUser,
  addUsersGaleryOfBusiness,
  addFavoraitsToBusiness,
  deleteMyBussinessById,
  checkKeyWords,
  getAllBusinessName,
  updateBusiness,
  addLinkToVideo,
  addUsersLinkVideo
};

//check move to contact service
const sendEmail = (email, businessName) => {
  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "leadersdashboard@gmail.com",
      pass: "dashboard012",
    },
  });
  mailOptions = {
    from: "leadersdashboard@gmail.com",
    to: email,
    subject: "הי,תודה שיצרת אצלנו עסק ",
    html: businessName + "  אנחנו נבדוק את תוכן פנייתך ונחזור אליך בהקדם ",
  };
  //הפעלת הפונקציה
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error("cant send mail to user", error);
    }
  });
};
