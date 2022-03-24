const Business = require("../models/business");
const Categories = require("../models/category");
const MainCategory = require("../models/mainCategory");
const nodemailer = require("nodemailer");
const User = require("../models/user");

//get new business and save in DB by user  (work and update)
const createBusinessPerUser = async (req, res) => {
  try {
    const { business, citiesForAdvertising } = req.body;
    (business.opening_hours, "iuyjtr");
    const u = await User.findOne({ _id: business.owner });
    if (u != null) {
      // const id = u.id;
      u.isPrivate = true;
      // business.owner = id;
      business.check = false;
      business.galery = business.galery && business.galery.photos;
      business.citiesForAdvertising = citiesForAdvertising;
      const newBuisness = new Business(business);
      Promise.all(
        business.category && business.category.map(async (element) => {
          const findCategory = await Categories.findOne({
            _id: element,
          });
          await findCategory.business.push(newBuisness);
          await newBuisness.category.push(findCategory);
          await findCategory.save();
          ///add one to  count business in mainCategory
          findCategory.mainCategories.map(async (element) => {
            const mainCategory = await MainCategory.findOne({ _id: element });
            if (mainCategory) {
              mainCategory.countBusiness = mainCategory.countBusiness + 1;
              mainCategory.save();
            }
          });
        })
      ).then(async () => {
        u.business.push(newBuisness._id);
        await u.save();
        await newBuisness.save();
        //send email to a user who has taken ownership
        transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "leadersdashboard@gmail.com",
            pass: "dashboard012",
          },
        });
        mailOptions = {
          from: "leadersdashboard@gmail.com",
          to: business.email,
          subject: "הי,תודה שיצרת אצלנו עסק ",
          html:
            business.businessName +
            "  אנחנו נבדוק את תוכן פנייתך ונחזור אליך בהקדם ",
        };
        //הפעלת הפונקציה
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.error("cant send mail to user", error );
          } 
        });
        res.json({ massage: "create new business", business: newBuisness });
      }).catch(error => {
        console.error('error on createBusinessPerUser1 ', error);
        res.status(500).json({ message: error.message });
      })
    } else {
      console.error(`error add business user ${business.owner} is not definde`);
      return res.status(500).send(`error add business user ${business.owner} is not definde`)
    }
  } catch (err) {
    console.error('error on createBusinessPerUser ', err);
    res.status(500).json({ message: err.message });
  }
};

//read business by businessId sent (work and update)
const getBusinessById = async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);
    business ? res.status(200).json(business)
      : res.status(500).send("This business does'nt exist");

  } catch (error) {
    res.status(500).json({ message: error });
  }
};

//get business by keyWord of this business (work and update)
const getBusinessByKeyWord = async (req, res) => {
  try {
    const keyWord = req.params.keyWord;
    const business = await await Business.findOne({
      keyWords: keyWord,
    }).populate({
      path: 'userRecommendation',
      skip: 0, limit: 3,
      populate: {
        path: "UserId",
        select: "userName"
      }
    })
      .populate({
        path: "category",
      }).populate({
        path: "owner"
      });
    if (business == null) {
      res.status(404).send("This business does'nt exist");
    } else {
      business.totalClicks = business.totalClicks + 1;
      business.save();
      res.status(200).json(business);
    }
  } catch (error) {
    res.status(500).json({ message: error.massage });
  }
};

//read all business in this category according to a categoryId sent (work and update)
const getBusinessByCategory = async (req, res) => {
  let getCategory = req.params.idCategory;
  try {
    let getBusinesses = await Business.find({ category: getCategory });
    res.status(200).json(getBusinesses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//read all business per user by userId sent(work and update)
const getAllBusinessPerUser = async (req, res) => {
  try {
    const bussinesByUser = await Business.find({ owner: req.params.id });
    ("bussinesByUser ",bussinesByUser)
    res.status(200).json(bussinesByUser);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

//search business By mainCategory(work and update)
const searchBusinessByMainCategory = async (req, res) => {
  const id = req.params.id;
  try {
    const getMainCategories = await MainCategory.findById(id);
    if (getMainCategories == null) {
      res.send("can't find what you look for");
    } else {
      const getALL = await MainCategory.findById(id).populate({
        path: "categories",
        populate: {
          path: "business",
        },
      });
      res.json({ MainCategories: getALL });
    }
  } catch (error) {
    res.status(500).json({ massage: error.maasage });
  }
};

//add clicks to business by click on button (work and update)
const addClicksToBusiness = async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);
    business.totalClicks = business.totalClicks + 1;
    business.save();
    totalClick = business.totalClicks;
    res.status(200).json({ business: business });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

//delete favorite business from user favorits list according to a idBusiness sent(work and update)
const deleteFavoraitsByBusinessId = async (req, res) => {
  try {
    const business = await Business.findById(req.params.Bid);
    if (business.totalAddedToFavorites > 0) {
      business.totalAddedToFavorites = business.totalAddedToFavorites - 1;
      business.save();
    }
    const u = await User.findById(req.params.idUser);
    const user = await User.findOneAndUpdate(
      { _id: req.params.idUser },
      { $pullAll: { favorites: [req.params.Bid] } },
      { new: true },
      function (error, data) {
        if (error) console.error("err: ", error);
      }
    );
    res
      .status(200)
      .json({ massage: "the Buisness is deleted", business: business });
  } catch (err) {
    return res.status(500).json({ massage: err });
  }
};

//read all promoted Business (work and update)
const promotedBusiness = async (req, res) => {
  try {
    const Promotedbusiness = await Business.find({
      paidUp: "premium",
    }).populate("category");
    return res.status(200).json(Promotedbusiness);
  } catch (error) {
    console.error('error on promotedBusiness ', error);
    return res.status(500).json({ message: error });
  }
};

//read all favorites business per user (work and update)
const getAllFavoraitsPerUser = async (req, res) => {
  try {
    const favoriteByUser = await User.findById({
      _id: req.params.idUser,
    }).populate({
      path: "favorites",
    });
    res.status(200).json(favoriteByUser.favorites);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

//add galery of imges to business(work and update)
const addUsersGaleryOfBusiness = async (req, res) => {
  const { usersgalery, businessId } = req.body;
  try {
    const business = await Business.findById({
      _id: businessId,
    });
    if (business != undefined) {
      if (business.userGalery.length > 0) {
        await business.userGalery.forEach((element) => {
          usersgalery.push(element);
        });
        business.userGalery = usersgalery;
      } else {
        business.userGalery = usersgalery;
      }
      await business.save();
    }
    res.status(200).json(business);
  } catch (err) {
    console.error("err on addUsersGaleryOfBusiness", err);
  }
};

//add like to business by user need ro get userId and businessId(work and update)
const addFavoraitsToBusiness = async (req, res) => {
  const { businessId, idUser } = req.body;
  let flag = 0;
  let user;
  try {
    let totalAddedToFavorites;
    const u = await User.findOne({ uid: idUser });
    if (u != null) {
      user = await User.findById(u._id);
    }
    const business = await Business.findById(businessId);
    if (user != undefined) {
      if (await user.favorites.length > 0) {
        await user.favorites.forEach((element) => {
          if (element == businessId) {
            flag = 1;
          }
        });
      };
      if (flag === 0) {
        await user.favorites.push(businessId);
        await user.save();
        if (business) {
          business.totalAddedToFavorites = business.totalAddedToFavorites + 1;
          business.save();
          totalAddedToFavorites = business.totalAddedToFavorites;
        }
        res.json({
          msg: "save!",
          totalAddedToFavorites: totalAddedToFavorites,
          businessId: business._id,
        });
      } else {
        totalAddedToFavorites = business.totalAddedToFavorites;
        res.json({
          msg: "this element exist!! can't create it!",
          totalAddedToFavorites: totalAddedToFavorites,
          businessId: business._id,
        });
      }
    }
  } catch (error) {
    console.error("error on addFavoraitsToBusiness", error);
    res.status(500).json({ msg: error.message });
  }
};

//delete business by user according to a businessid and userId sent (work and update)
const deleteMyBussinessById = async (req, res) => {
  try {
    let id = req.params.Bid;
    Business.findByIdAndRemove(req.params.Bid, (err, data) => {
      if (err) return res.status(500).send(err);
      res.status(200).json({ message: "the Buisness is deleted", id: id });
    });
    await User.findOneAndUpdate(
      { _id: req.params.idUser },
      { $pullAll: { business: [req.params.Bid] } },
      { new: true }
    );
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//check by keyWords if exsist this business (work and update)
const checkKeyWords = async (req, res) => {
  const { keyWords } = req.body;
  let resultSearch;
  try {
    const business = await Business.findOne({ keyWords: keyWords });
    if (business != undefined) {
      resultSearch = false;
      res.json({ msg: "success", result: resultSearch });
    } else {
      resultSearch = true;
      res.json({ msg: "success", result: resultSearch });
    }
  } catch (error) {
    resultSearch = false;
    res.status(500).json({ msg: error.message, result: resultSearch });
  }
};
//get all  business names (work and update)
const getAllBusinessName = async (req, res) => {
  try {
    let flag = false;
    const arr = await Business.find({}).select("keyWords galery");
    const nameOfBusiness = [];
    arr.forEach((element) => {
      flag = false;
      if (nameOfBusiness.length === 0) {
        nameOfBusiness.push(element);
      }
      if (nameOfBusiness.length > 0) {
        nameOfBusiness.forEach((business) => {
          if (business.keyWords === element.keyWords) {
            flag = true;
          }
        });
      }
      if (!flag) {
        nameOfBusiness.push(element);
      }
    });
    res.json(nameOfBusiness);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

//update business
const updateBusiness = async (req, res) => {
  try {
    const { updateBusiness } = req.body;
    const u = await User.findOne({ uid: updateBusiness.owner });
    if (u != null) {
      const id = u._id;
      updateBusiness.owner = id;
    } else {
    }
    Promise.all(
      updateBusiness.category && updateBusiness.category.map(async (element) => {
        const findCategory = await Categories.findOne({
          _id: element,
        });
        Categories.findOneAndUpdate(
          { _id: element },
          { $pullAll: { business: [updateBusiness._id] } },
          { new: true },
          function (err, data) {
            if (err) console.error("err on updateBusiness", err);
          }
        );
        Business.findOneAndUpdate(
          { _id: updateBusiness._id },
          { $pullAll: { category: [element] } },
          { new: true },
          function (err, data) {
            if (err) console.error("err on updateBusiness", err);
          }
        );
        await findCategory.business.push(updateBusiness);
        await findCategory.save();
        findCategory.mainCategories.forEach(async (element) => {
          const mainCategory = await MainCategory.findOne({ _id: element });
          if (mainCategory != null) {
            mainCategory.countBusiness = mainCategory.countBusiness + 1;
            mainCategory.save();
          }
        });

      })
    ).then(async (
      ) => {
        let arrCategory = [];
        arrCategory = updateBusiness.category;
        updateBusiness.category = [];
        business = await Business.findOneAndUpdate(
          { _id: updateBusiness._id },
          updateBusiness
        );

        if (business != undefined) {

          business.category = [];
          arrCategory.forEach((element) => {
            business.category.push(element);
          });
          await business.save();
          b = await Business.findById(business._id);
          res
            .status(200)
            .json({ message: "The business is updated", business: b });
        }

      });
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addLinkToVideo = async (req, res) => {
  const { linkToVideo, businessId } = req.body;
  try {
    const business = await Business.findById({
      _id: businessId,
    });
    if (business != undefined) {
      business.linkToVideo.push(linkToVideo);
      await business.save();
      res.status(200).json({ message: "add link to vide" });
    }
    else
      res.status(500).json({ message: 'business not found on addLinkToVideo' });
  } catch (err) {
    console.error("err on addLinkToVideo ", err);
    res.status(500).json({ message: err });
  }
};
const addUsersLinkVideo = async (req, res) => {
  const { usersVideolink, businessId } = req.body;
  try {
    const business = await Business.findById({
      _id: businessId,
    });
    if (business != undefined) {
      business.usersVideolink.push(usersVideolink);
      res.status(200).json({ message: "add users link to vide0" });
      await business.save();
    } else
      res.status(500).json({ message: 'business not found on addUsersLinkVideo' });

  } catch (err) {
    console.error("err on addUsersLinkVideo ", err);
    res.status(500).json({ message: err });
  }
};
module.exports = {
  createBusinessPerUser,
  updateBusiness,
  getBusinessById,
  getBusinessByKeyWord,
  getBusinessByCategory,
  getAllBusinessPerUser,
  searchBusinessByMainCategory,
  addClicksToBusiness,
  deleteFavoraitsByBusinessId,
  promotedBusiness,
  getAllFavoraitsPerUser,
  addFavoraitsToBusiness,
  addUsersGaleryOfBusiness,
  deleteMyBussinessById,
  getAllBusinessName,
  checkKeyWords,
  addLinkToVideo,
  addUsersLinkVideo,
};
