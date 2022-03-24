const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    buisnessId: [{
      type: mongoose.Schema.Types.ObjectId, ref: "Buisness"
    }],
    delivery: {
      type: String,
      // required: true
      
    },
    product: [{
      type: mongoose.Schema.Types.ObjectId, ref: "Product"
    }],
    category: [{
      type: mongoose.Schema.Types.ObjectId, ref: "ProductCategory"
    }],
  }
);

module.exports = mongoose.model("Store", productSchema);
