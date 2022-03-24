const businessService = require("../service/business");

//get new business and save in DB by user  (work and update)
const createBusiness = async (req, res) => {
  try {
    const { business, citiesForAdvertising } = req.body;
    res
      .status(201)
      .json(
        await businessService.createBusiness(business, citiesForAdvertising)
      );
  } catch (error) {
    res.status(error.status || 500)
      .json({ message: error.message, condition: error.condition });
  }
};

//read business by businessId sent (work and update)
const getBusinessById = async (req, res) => {
  try {
    const { id } = req.params;
    const business = await businessService.getBusinessById(id);
    res.status(200).json(business);
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error.message, condition: error.condition });
  }
};
//get business by keyWord of this business (work and update)
const getBusinessDetailsByKeyWord = async (req, res) => {
  try {
    const keyWord = req.params.keyWord;
    const business = await businessService.getBusinessDetailsByKeyWord(keyWord);

    res.status(200).json(business);
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error.message || error, condition: error.condition });
  }
};

//read all business in this category according to a categoryId sent (work and update)
const getBusinessByCategory = async (req, res) => {
  let getCategory = req.params.idCategory;
  try {
    let getBusinesses = await Business.find({ category: getCategory });
    res.status(200).json(getBusinesses);
  } catch (err) {
    res
      .status(error.status || 500)
      .json({ message: error.message, condition: error.condition });
  }
};

//read all business per user by userId sent(work and update)
const getAllBusinessPerUser = async (req, res) => {
  try {
    const bussinesByUser = await Business.find({ owner: req.params.id });
    ("bussinesByUser ", bussinesByUser);
    res.status(200).json(bussinesByUser);
  } catch (err) {
    res
      .status(error.status || 500)
      .json({ message: error.message, condition: error.condition });
  }
};

//search business By mainCategory(work and update)
const getBusinessByMainCategory = async (req, res) => {
  try {
    const id = req.params.id;
    res.json(businessService.getBusinessByMainCategory(id));
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error.message, condition: error.condition });
  }
};

//add clicks to business by click on button (work and update)
const addClicksToBusiness = async (req, res) => {
  try {
    const { businessId } = req.params;
    res.json(await businessService.addClicksToBusiness(businessId));
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error.message, condition: error.condition });
  }
};

//delete favorite business from user favorits list according to a idBusiness sent(work and update)
//check move to user controller
const deleteFavoraitsByBusinessId = async (req, res) => {
  try {
    const { Bid, idUser } = req.params
    const business = await businessService.deleteFavoraitsByBusinessId(idUser, Bid);
    console.log("gggg");
    res.json({ massage: "the Buisness is deleted", business: business });
  } catch (error) {
    console.log("llll");
    res
      .status(error.status || 500)
      .json({ message: error.message, condition: error.condition });
  }
};

//from here
//read all promoted Business (work and update)
const getPromotedBusiness = async (req, res) => {
  try {
    return res.status(200).json(await businessService.getPromotedBusiness());
  } catch (error) {
    console.error("error on promotedBusiness ", error);
    res
      .status(error.status || 500)
      .json({ message: error.message, condition: error.condition });
  }
};

//check move to user controller
//read all favorites business per user (work and update)
const getAllFavoraitsPerUser = async (req, res) => {
  try {
    const { userId } = req.params;
    res.json(await businessService.getAllFavoraitsPerUser(userId));
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

//add galery of imges to business(work and update)
const addUsersGaleryOfBusiness = async (req, res) => {
  const { usersgalery, businessId } = req.body;
  try {
    res
      .status(200)
      .json(
        await businessService.addUsersGaleryOfBusiness(usersgalery, businessId)
      );
  } catch (err) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

//add like to business by user need ro get userId and businessId(work and update)
const addFavoraitsToBusiness = async (req, res) => {
  const { businessId, idUser } = req.body;
  let business = await businessService.addFavoraitsToBusiness(businessId, idUser)
  try {
    if (business) {
      console.log("tttt");
      res.json({ message: "add favorites", business: business });
    } else {
    console.log("yyyyyyyyyyy");
      res.json({ message: "This business already exists" });
    }
  } catch (error) {
    console.log("errrrrrrrrr");
    res.status(error.status || 500).json({ message: error.message });
  }
};

//delete business by user according to a businessid and userId sent (work and update)
const deleteMyBussinessById = async (req, res) => {
  try {
    let id = req.params.Bid;
    res.json(await businessService.deleteMyBussinessById(id));
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

//check by keyWords if exsist this business (work and update)
const checkKeyWords = async (req, res) => {
  const { keyWords } = req.body;
  try {
    res.json({ result: await businessService.checkKeyWords(keyWords) });
  } catch (error) {
    res.status(500).json({ msg: error.message, result: false });
  }
};
//check gili why all names
//get all  business names (work and update)
const getAllBusinessName = async (req, res) => {
  try {
    const arr = await businessService.getAllBusinessName();
    res.json(arr);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};
//check uvi
//update business
const updateBusiness = async (req, res) => {
  try {
    const { updateBusiness } = req.body;
    (updateBusiness.storeId && updateBusiness.storeId, "update");

    const business = await businessService.updateBusiness(updateBusiness);
    res.status(200).json({
      message: "The business is updated",
      business: business,
    });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message || error });
  }
};

const addLinkToVideo = async (req, res) => {
  try {
    const { linkToVideo, businessId } = req.body;
    res.status(200).json(await businessService.addLinkToVideo(linkToVideo, businessId));
  } catch (err) {
    res.status(error.status || 500)
      .json({ message: error.message, condition: error.condition });
  }
};

const addUsersLinkVideo = async (req, res) => {
  const { usersVideolink, businessId } = req.body;
  try {
    res.status(200).json(await businessService.addUsersLinkVideo(usersVideolink, businessId));
  } catch (err) {
    res.status(error.status || 500)
      .json({ message: error.message, condition: error.condition });
  }
};
module.exports = {
  createBusiness,
  updateBusiness,
  getBusinessById,
  getBusinessDetailsByKeyWord,
  getBusinessByCategory,
  getAllBusinessPerUser,
  getBusinessByMainCategory,
  addClicksToBusiness,
  deleteFavoraitsByBusinessId,
  getPromotedBusiness,
  getAllFavoraitsPerUser,
  addFavoraitsToBusiness,
  addUsersGaleryOfBusiness,
  deleteMyBussinessById,
  getAllBusinessName,
  checkKeyWords,
  addLinkToVideo,
  addUsersLinkVideo,
};
