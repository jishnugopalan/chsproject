var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var locationSchema=new mongoose.Schema({
  userid:{
  type:Schema.Types.ObjectId,
},
  latitude: {
    type: String,
    //required: true
    //unique: true,
    
  },
  longitude: {
    type: String,
    //required: true
    //unique: true,
    
  },
  
});
module.exports = mongoose.model('location', locationSchema);