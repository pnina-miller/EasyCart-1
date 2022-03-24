const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
    },
    userName: {
      type: String,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    description:{
      type: String,
    },
    links:{
    youTube: {
      type: String,
    },
    instagram: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    facebook: {
      type: String,
    },
    twitter: {
      type: String,
    }
  },
    phone: {
      type: String,
      // match: /\d{10}/,
    },
    business: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Business",
      },
    ],
    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Business",
      },
    ],
    paidUp: {
      type: String,
      default: "free",
    },
    profileImg: { type: String },

    cart: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
    isPrivate: { type: Boolean,
      default:false },
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("User", userSchema);
