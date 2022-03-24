const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      // trim: true,
    },
    name: {
      type: String,
      // trim: true,
      required: true,
    },
    price: {
      type: Number,
      // trim: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    //need
    // content: {
    //   type: String,
    //   required: true,
    // },
    images: {
      type: String,
    },
    // checked: {
    //   //checkYael
    //   type: Boolean,
    //   default: false,
    // },
    sold: {
      type: Number,
      default: 0,
    },
    storeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
      // reqired: true,
    },
    //need
    category: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProductCategory",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
