var Worker=require('../models/worker')
var User = require('../models/user');
var jwt = require('jsonwebtoken');
var config = require('../config/config');
var mongoose = require('mongoose');
function createToken(user) {
    return jwt.sign({ id: user.id, email: user.email }, config.jwtSecret, {
        expiresIn: 200 // 86400 expires in 24 hours
      });
}
exports.addWorker = (req, res) => {
    // if (!req.body.email || !req.body.password) {
    //     return res.status(400).json({ 'msg': 'You need to send email and password' });
    // }
 console.log(req.body)
  
  Worker.findOne({ userid:req.body.userid}, (err, worker) => {
    if (err) {
          // console.log("err")
            return res.status(400).json({ 'msg': 'The category already exists' });
        }
    if (worker) {
            return res.status(400).json({ 'msg': 'You are already a worker' });
        }
    let newWorker = Worker(req.body);
    
    newWorker.save((err, worker) => {
      console.log("ss")
            if (err) {
               console.log("err")
                return res.status(400).json({ 'msg': err });
            }
      return res.status(201).json(worker);
    });
  })
  
  };
exports.viewWorker = (req, res) => {
  User.aggregate([
    { 
      $lookup:
       {
         from: 'workers',
         localField: '_id',
         foreignField: 'userid',
         as: 'workersdetails'
         
       }
     },
    {
      $match:{
        "workersdetails.admin_status":'0',
        //"type":req.body.type,
        //"admin_status":'0',
        
      }
    },
    
    ]).exec( 
    function(err,data) {
       if (err) throw err;
      return res.status(201).json(data);
    })
    
 console.log(req.body)
  

   
};
exports.viewWorkerdetails = (req, res) => {
  console.log(req.body)
  Worker.findOne({ userid:req.body.userid,admin_status:'0'}, (err, worker) => {
    if (err) {
          // console.log("err")
            return res.status(400).json({ 'msg': '' });
        }
   
      
            return res.status(201).json(worker);
           
  })  
 console.log(req.body)
  

   
};
exports.updateWorker = (req, res) => {
  console.log("inn")
  console.log(req.body)
  Worker.updateOne({ userid:req.body.userid,admin_status:'0'},
  {
    $set:  {admin_status:'1'}
  },(err, worker) => {
    if (err) {
          // console.log("err")
            return res.status(400).json({ 'msg': 'The category already exists' });
        }
    if (worker) {
      
            return res.status(201).json(worker);
        }
   
  })  
 console.log(req.body)
  

   
};
exports.viewMyworkers = (req ,res) => {
  console.log(req.body);
  User.aggregate([
    { 
      $lookup:
       {
         from: 'workers',
         localField: '_id',
         foreignField: 'userid',
         as: 'workersdetails'
         
       }
     },
    {
      $match:{
        // "type":req.body.type,
        "workersdetails.admin_status":'1',
        "workersdetails.job_category":req.body.category,
        
      }
    },
    
    ]).exec( 
    function(err,data) {
       if (err) throw err;
      return res.status(201).json(data);
    })
  
};
exports.viewMyworkersdetails = (req ,res) => {
  console.log(req.body);
  //console.log("err")
  User.aggregate([
    { 
      $lookup:
       {
         from: 'workers',
         localField: '_id',
         foreignField: 'userid',
         as: 'workersdetails'
         
       }
     },
    {
      $match:{
        
        //"workersdetails.userid":req.body._id,
        //"_id":req.body._id,
        
        "workersdetails.userid":mongoose.mongo.ObjectId(req.body._id),
        "_id":mongoose.mongo.ObjectId(req.body._id)
        
       // "workersdetails.job_category":'cleaning',
      }
    },
    
    ]).exec( 
    function(err,data) {
       if (err) throw err;
      return res.status(201).json(data);
    })
  
};

exports.viewifWorker = (req, res) => {
   
 console.log(req.body)
  
  Worker.findOne({ userid:req.body.userid,admin_status:'1'}, (err, worker) => {
    if (err) {
          // console.log("err")
            return res.status(400).json({ 'msg': 'The category already exists' });
        }
    if (worker) {
            return res.status(201).json(worker);
        }
    return res.status(400).json();
   
  })
  
  };

exports.availableStatus=(req,res)=>{
  console.log(req.body)
  Worker.findOne({userid:req.body.userid},(err,pass)=>{
    if(err){
       return res.status(400).json({ 'msg': '' });
    }
    if(pass){
      Worker.updateOne(
      {userid: req.body.userid}, 
       { 
         $set: { 
                available_status:req.body.s
               } 
       },
    (err, profile) =>{
      if (err) {
           console.log("err")
            return res.status(400).json({ 'msg': err });
        }  
      console.log(res)
      return res.status(201).json(profile);
    });
      
    }
  })
  
}
exports.deleteworkerAccount=(req,res)=>{
  Worker.deleteOne({"userid":req.body.userid},(err,del)=>{
    if(err){
      return res.status(400).json({ 'msg': err }); 
    }
    else
      {
         return res.status(201).json(del);
      }
  })
}

exports.updateStarttime=(req,res)=>{
  console.log("entered")
  Worker.updateOne(
      {userid: req.body.userid}, 
       { 
         $set: { 
              job_start_time:req.body.job_start_time,
               } 
       },
    (err, profile) =>{
      if (err) {
           console.log("err")
            return res.status(400).json({ 'msg': "err" });
        }  
      console.log(res)
      return res.status(201).json(profile);
    });
  
}
exports.updateEndtime=(req,res)=>{
  Worker.updateOne(
      {userid: req.body.userid}, 
       { 
         $set: { 
               job_end_time:req.body.job_end_time,
               } 
       },
    (err, profile) =>{
      if (err) {
           console.log("err")
            return res.status(400).json({ 'msg': err });
        }  
      console.log(res)
      return res.status(201).json(profile);
    });
  
}
exports.updateSalary=(req,res)=>{
  Worker.updateOne(
      {userid: req.body.userid}, 
       { 
         $set: { 
               job_salary:req.body.job_salary,
               } 
       },
    (err, profile) =>{
      if (err) {
           console.log("err")
            return res.status(400).json({ 'msg': err });
        }  
      console.log(res)
      return res.status(201).json(profile);
    });
  
}
exports.updateDescription=(req,res)=>{
  Worker.updateOne(
      {userid: req.body.userid}, 
       { 
         $set: { 
               job_description:req.body.job_description,
               } 
       },
    (err, profile) =>{
      if (err) {
           console.log("err")
            return res.status(400).json({ 'msg': err });
        }  
      console.log(res)
      return res.status(201).json(profile);
    });
  
}




   