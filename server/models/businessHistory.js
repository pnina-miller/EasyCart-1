const mongoose = require("mongoose");

const businessHistorySchema = mongoose.Schema({
  businessId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Business",
  },
  favorite: [{ total: Number,date:{type:Date,default:Date.now()}}],
  totalClicks: [{ total: Number,date:{type:Date,default:Date.now()}}],
},
);

module.exports = mongoose.model("BusinessHistory", businessHistorySchema);
