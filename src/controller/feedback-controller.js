var Feed = require('../models/feedbacks')
var User=require('../models/user')
//var Chat=require('../models/chat')
var jwt = require('jsonwebtoken');
var config = require('../config/config');
exports.addFeedback = (req, res) =>{
  
    
      //return res.status(400).json({ 'msg': err });
      let newFeed = Feed(req.body);
   
    newFeed.save((err, loc) => {
      console.log("ss")
            if (err) {
               console.log("err")
                return res.status(400).json({ 'msg': err });
            }
      return res.status(201).json(loc);
    });
    
  //console.log(req.body)
  
  

  };
exports.viewFeedback = (req, res) => {
  console.log("enetred")
  Feed.aggregate([
    { 
      $lookup:
       {
         from: 'users',
         localField: 'userid',
         foreignField: '_id',
         as: 'feedbacks'
         
       }
     },
    {
      $match:{
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
    
};