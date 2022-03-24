const mongoose = require("mongoose");
const serviceSchema = mongoose.Schema({
  name: {
    type: String,
  },
  business: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
    },
  ],
});

module.exports = mongoose.model("Service", serviceSchema);
