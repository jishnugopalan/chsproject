var Not=require('../models/notification')
//var User = require('../models/user');
var jwt = require('jsonwebtoken');
var config = require('../config/config');
function createToken(user) {
    return jwt.sign({ id: user.id, email: user.email }, config.jwtSecret, {
        expiresIn: 200 // 86400 expires in 24 hours
      });
}
exports.addNotification = (req, res) => {
   
   let newNot = Not(req.body);
   
    newNot.save((err, notification) => {
      console.log("ss")
            if (err) {
               console.log("err")
                return res.status(400).json({ 'msg': err });
            }
      return res.status(201).json(notification);
    });
  
  };
exports.viewNotification = (req,res) =>{
   console.log(req.body)
  Not.find({userid:req.body.userid},(err,not) => {
    if(err){
      return res.status(400).json({'msg':'No notification'});
    }
    return res.status(201).json(not);
  }).sort({"datetime":-1})
  
};
exports.viewparticularNotification = (req,res) =>{
   console.log(req.body)
  Not.find({_id:req.body._id},(err,not) => {
    if(err){
      return res.status(400).json({'msg':'No notification'});
    }
    return res.status(201).json(not);
  })
  
};
exports.deleteNotification=(req,res)=>{
  
  Not.deleteOne({"bookingid":req.body.bookingid,"notificationtype":"booked"},(err,book)=>{
    if(err){
       return res.status(400).json(book);
      
    }
    if(book){
       return res.status(201).json(book);
    }
    
              
              })
}

exports.countNotification=(req,res)=>{
  Not.count({"userid":req.body.userid,"viewstatus":'0'},(err,not)=>{
    if(err){
      return res.status(400).json(not)
    }
    return res.status(201).json(not);
  })
}
exports.updateNotification=(req,res)=>{
   Not.updateMany(
      {"userid":req.body.userid,"viewstatus":'0'}, 
       { 
         $set: { 
                viewstatus:'1'
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