const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
  },
  mainCategories: [
    { type: mongoose.Schema.Types.ObjectId, ref: "mainCategory" },
  ],
  business: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Business" }
  ],
  type: {
    type: String,
  },
  keyword: {
    type: String,
  }

});

module.exports = mongoose.model("Categories", categorySchema);
