const mongoose = require("mongoose");

const problematicWordsSchema = mongoose.Schema({
  problemayicWords: [
    {type:String}
  ]
});
module.exports = mongoose.model("ProblematicWords", problematicWordsSchema);