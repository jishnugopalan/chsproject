var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var chatSchema=new mongoose.Schema({
myid:{
  type:Schema.Types.ObjectId,
},
friendid:{
  type:Schema.Types.ObjectId,
},
message: {
    type: String,
    //required: true
    //unique: true,
    
  },
datetime:{
  type:Date,
  
},
  
});
module.exports = mongoose.model('chat', chatSchema);