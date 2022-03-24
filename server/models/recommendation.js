const mongoose = require("mongoose");

const recommendationSchema = mongoose.Schema(
  {
    BusinessId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      reqired: true,
    },
    UserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      reqired: true,
    },
    Recommendation: {
      type: String,
      reqired: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Recommendation", recommendationSchema);
