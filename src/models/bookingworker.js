var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bookingworkerSchema=new mongoose.Schema({
userid:{
  type:Schema.Types.ObjectId,
},
workerid:{
  type:Schema.Types.ObjectId,
},
worker_status:{
  type:String
}
  
});
module.exports = mongoose.model('bookingworker', bookingworkerSchema);