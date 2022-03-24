const mongoose = require("mongoose");

const productCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      //   required: true,
      //   trim: true,
    },
    storeId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Store",
      },
    ],
    product: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ProductCategory", productCategorySchema);
