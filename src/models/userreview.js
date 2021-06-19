var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userreviewSchema=new mongoose.Schema({
userid:{
  type:Schema.Types.ObjectId,
},
workerid:{
  type:Schema.Types.ObjectId
},
star:{
  type:String,
  default:'0'
},
commend: {
    type: String,
    //required: true
    //unique: true,
    
  },
datetime:{
  type:Date,
  
},
  
});
module.exports = mongoose.model('userreview', userreviewSchema);