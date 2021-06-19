var mongoose = require('mongoose');

var catSchema=new mongoose.Schema({
  category: {
    type: String,
    //required: true
    //unique: true,
    
  },
});
module.exports = mongoose.model('category', catSchema);