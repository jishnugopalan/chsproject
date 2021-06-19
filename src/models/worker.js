var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var workerSchema=new mongoose.Schema({
  job_category: {
    type: String,
    //required: true
    //unique: true,
    
  },
  job_start_time: {
    type: String,
    //required: true
    //unique: true,
    
  },
  job_end_time: {
    type: String,
    //required: true
    //unique: true,
    
  },
  job_salary: {
    type: String,
    //required: true
    //unique: true,
    
  },
  job_verification: {
    type: String,
    //required: true
    //unique: true,
    
  },
  job_description: {
    type: String,
    //required: true
    //unique: true,
    
  },
  userid: {
    type: Schema.Types.ObjectId,
    //required: true
    //unique: true,
    
  },
  job_document: {
    type: String,
    //required: true
    //unique: true,
    
  },
  admin_status: {
    type:String
  },
  available_status:{
    type:String,
    default:"Available"
  }
  
});
module.exports = mongoose.model('worker', workerSchema);