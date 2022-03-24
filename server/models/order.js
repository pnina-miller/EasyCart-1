const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    order: [{
      businessId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Business",
        reqired: true,
      },
      products: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", reqired: true },
        count: { type: Number, required: true },
        note: { type: String }
      }],
      status: { type: Number, }
    }],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      reqired: true,
    },
    orderMode: { type: Number, required: true, default: 0 }
  },
  { timestamps: true }
);
module.exports = mongoose.model("Order", orderSchema);

