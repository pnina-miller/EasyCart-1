const BusinessHistory = require("../models/businessHistory");
const Business = require("../models/business");

//get new business and save in DB by user  (work and update)
const createBusinessHistory = async (req, res) => {
  try {
    const { businessId } = req.body;
    const business = await Business.findById(businessId);
    if (business) {
      let newBusinessHistory = new BusinessHistory({
        businessId: businessId,
      });
      await newBusinessHistory.save();

      newBusinessHistory.favorite.push({total:business.totalAddedToFavorites});
      newBusinessHistory.totalClicks.push({total:business.totalClicks});
      await newBusinessHistory.save();
      res.status(200).json({ businessHistoty: newBusinessHistory });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//read businessHistory by businessId sent (work and update)
const getBusinessHistoryById = async (req, res) => {
  try {
    const { businessId } = req.body;
    const businessHistory = await BusinessHistory.findOne({businessId: businessId});
    businessHistory
      ? res.status(200).json(businessHistory)
      : res.status(500).send("This businessHistory does'nt exist");
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
//delete businessHistory by businessId
const deletebusinessHistory = async (req, res) => {
  try {
    const { businessId } = req.body;
    await BusinessHistory.findOneAndDelete({businessId: businessId});

    // delete from business table
    await Business.findOneAndUpdate({ _id: businessId }, { history: undefined });
    return res.status(200).send(`BusinessHistory of business ${businessId} deleted`);
  } catch (error) {
   return res.status(500).send(error.message);
  }
};
const updatebusinessHistory = async (req, res) => {
  try {
    const { businessId } = req.body;
    let businessHistory = await BusinessHistory.findOne({
      businessId: businessId,
    });
    let business = await Business.findById(businessId);
    if (businessHistory) {
      businessHistory.favorite.push({total:business.totalAddedToFavorites});
      businessHistory.totalClicks.push({total:business.totalClicks});
      businessHistory.save();
     return res.status(200).json({ message: "the Buisness History is updated" });
    } else {
     return res.status(500).json({ message: "the Buisness History is not found" });
    }
  } catch (error) {
    console.error("error on updatebusinessHistory: ", error.message);
   return res.status(500).send(error);
  }
};
module.exports = {
  createBusinessHistory,
  getBusinessHistoryById,
  deletebusinessHistory,
  updatebusinessHistory,
};
