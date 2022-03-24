const mongoose = require("mongoose");
const mainCategorySchema = mongoose.Schema({
  mainCategoryName: {
    type: String,
    required: true,
  },
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categories",
    },
  ],
  icons: {
    type: String,
  },
  type: {
    type: String,
  },
  keyword: {
    type: String,
  }
});

module.exports = mongoose.model("mainCategory", mainCategorySchema);
