var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var notificationSchema=new mongoose.Schema({
  userid: {
    type: Schema.Types.ObjectId,
    //required: true
    //unique: true,
    
  },
  content:{
  type: String
},
from:{
  type:String
  
},
datetime:{
  type:Date,
  
},
bookingid:{
  type:Schema.Types.ObjectId,
},
notificationtype:{
  type: String
},
viewstatus:{
  type:String,
  default:'0'
}
// notificationtime: {
//   type: Date,
//   default: Date.now,
  
// },
                                           
  
});
module.exports = mongoose.model('notification', notificationSchema);