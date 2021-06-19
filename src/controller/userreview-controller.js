//var Review = require('../models/review')
var UserReview=require('../models/userreview')
var User = require('../models/user');
//var User=require('../models/user')
//var Chat=require('../models/chat')
var jwt = require('jsonwebtoken');
var config = require('../config/config');
var mongoose = require('mongoose');
// exports.addReview = (req, res) => {
//   Review.findOne({userid:req.body.userid,workerid:req.body.workerid},(err,rev)=>{
//     if(err){
      
//     }
//     if(rev){
//       return res.status(400).json({ 'msg': 'You are already commented a review' });
//     }
//      let newReview = Review(req.body);
   
//     newReview.save((err, rev) => {
//       console.log("ss")
//             if (err) {
//                console.log("err")
//                 return res.status(400).json({ 'msg': err });
//             }
//       return res.status(201).json(rev);
//     });
//   })
   
  
  
//   };
exports.addUserReview = (req, res) => {
  console.log(req.body)
  console.log("enetrd")
  
     let newUserReview = UserReview(req.body);
   
    newUserReview.save((err, rev) => {
      console.log("ss")
            if (err) {
               console.log("err")
                return res.status(400).json({ 'msg': err });
            }
      return res.status(201).json(rev);
    });
  
   
  
  
  };
// exports.viewReview=(req,res)=>{
// //   Review.find({workerid:req.body.workerid},(err,rev)=>{
// //     if(rev){
// //        return res.status(201).json(rev);
      
// //     }
// //   })
  
//    Review.aggregate([
//     { 
//       $lookup:
//        {
//          from: 'users',
//          localField: 'userid',
//          foreignField: '_id',
//          as: 'userdetails'
         
//        }
//      },
//     {
//       $match:{
        
//         workerid:mongoose.mongo.ObjectId(req.body.workerid),
//         //"userdetails._id":mongoose.mongo.ObjectId(req.body._id),
//         //"workersdetails.admin_status":'0',
//         //"type":req.body.type,
//         //"admin_status":'0',
        
//       }
//     },
    
//     ]).exec( 
//     function(err,data) {
//        if (err) throw err;
//       return res.status(201).json(data);
//     })
    
//  console.log(req.body)
// }
exports.viewUserReview=(req,res)=>{
  console.log(req.body.userid)
//   Review.find({workerid:req.body.workerid},(err,rev)=>{
//     if(rev){
//        return res.status(201).json(rev);
      
//     }
//   })
  
   UserReview.aggregate([
    { 
      $lookup:
       {
         from: 'users',
         localField: 'workerid',
         foreignField: '_id',
         as: 'userdetails'
         
       }
     },
    {
      $match:{
        
        userid:mongoose.mongo.ObjectId(req.body.userid),
        //"userdetails._id":mongoose.mongo.ObjectId(req.body._id),
        //"workersdetails.admin_status":'0',
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
}