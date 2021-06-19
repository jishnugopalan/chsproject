var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var feedbackSchema=new mongoose.Schema({
userid:{
  type:Schema.Types.ObjectId,
},

feedback: {
    type: String,
    //required: true
    //unique: true,
    
  },
datetime:{
  type:Date,
  
},
  
});
module.exports = mongoose.model('feedback', feedbackSchema);