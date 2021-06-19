var Book = require('../models/bookingworker')
var User=require('../models/user')
var jwt = require('jsonwebtoken');
var config = require('../config/config');
var mongoose = require('mongoose');
function createToken(user) {
    return jwt.sign({ id: user.id, email: user.email }, config.jwtSecret, {
        expiresIn: 200 // 86400 expires in 24 hours
      });
}
exports.bookWorker=(req,res)=>{
  Book.findOne({userid:req.body.userid,workerid:req.body.workerid},(err,book)=>{
    if(err){
       return res.status(400).json({ 'msg': 'You are already booked this worker' });
    }
    if(book){
       return res.status(400).json({ 'msg': 'You are already booked this worker' });
    }
    let newBook = Book(req.body);
   
    newBook.save((err, book) => {
      console.log("ss")
            if (err) {
               console.log("err")
                return res.status(400).json({ 'msg': err });
            }
      return res.status(201).json(book);
    });
    
  })
 
}
exports.acceptWorker=(req,res)=>{
  Book.findOne({_id:req.body._id,worker_status:'1'},(err,book)=>{
    if(err){
       return res.status(400).json({ 'msg': 'You are already booked this worker' });
    }
    if(book){
       return res.status(400).json({ 'msg': 'You are already accepted this worker' });
    }
   Book.updateOne({_id:req.body._id},{ 
         $set: { worker_status:'1'} 
       },(err,book)=>{
     if(err){
       
     }
     
     return res.status(201).json(book);
   })
   
   
    
  })
 
}
exports.viewBooking=(req,res)=>{
  Book.findOne({_id:req.body._id},(err,book)=>{
     if(err){
       return res.status(400).json({ 'msg': 'You are already booked this worker' });
    }
    return res.status(201).json(book);
  })
}

// exports.viewmyBooking=(req,res)=>{
//   console.log(req.body)
  
//   Book.find({userid:mongoose.mongo.ObjectId(req.body.userid)},(err,book)=>{
//      if(err){
//        return res.status(400).json({ 'msg': 'You are already booked this worker' });
//     }
//     return res.status(201).json(book);
//   })
// }

exports.viewmyBooking = (req, res) => {
  console.log(req.body)
  console.log("enetred")
  Book.aggregate([
    { 
      $lookup:
       {
         from: 'users',
         localField: 'workerid',
         foreignField: '_id',
         as: 'workerdetails'
         
       }
     },
    {
      $match:{
        "worker_status":'1',
        userid:mongoose.mongo.ObjectId(req.body.userid),
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
exports.viewmyBookedjobs = (req, res) => {
  console.log(req.body)
  console.log("enetred")
  Book.aggregate([
    { 
      $lookup:
       {
         from: 'users',
         localField: 'userid',
         foreignField: '_id',
         as: 'workerdetails'
         
       }
     },
    {
      $match:{
        worker_status:'1',
        workerid:mongoose.mongo.ObjectId(req.body.workerid),
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
exports.deleteBooking=(req,res)=>{
  console.log(req.body)
  Book.deleteMany({"userid":req.body.userid,"workerid":req.body.workerid},(err,book)=>{
    if(err){
       return res.status(400).json(book);
      
    }
     return res.status(201).json(book);
              
              })
}
exports.rejectBooking=(req,res)=>{
  console.log(req.body)
  
  Book.findOne({"_id":req.body.bookingid,"worker_status":'1'},(err,b)=>{
    if(err){
      
    }
    if(b){
       return res.status(400).json({ 'msg': 'Sorry you cannot reject this work,you are already accepted' });
    }
    else{
      Book.deleteMany({"_id":req.body.bookingid,},(err,book)=>{
    if(err){
       return res.status(400).json(book);
      
    }
     return res.status(201).json(book);
              
              })
      
    }
  })
  
}

