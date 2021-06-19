var Book = require('../models/bookingworker')
var Chat=require('../models/chat')
var jwt = require('jsonwebtoken');
var config = require('../config/config');
exports.viewChatlist=(req,res)=>{
  console.log(req.body)
  Book.find({$or:[{userid:req.body.userid},{workerid:req.body.workerid},{worker_status:'1'}]},(err,book)=>{
    if(err){
       return res.status(400).json({ 'msg': 'err' });
    }
    if(book){
      console.log(book)
    }
    
   return res.status(201).json(book);
    
  })
 
}
exports.Chatmsg=(req,res)=>{
  console.log(req.body)
   let newChat = Chat(req.body);
   
    newChat.save((err, chat) => {
      console.log("ss")
            if (err) {
               console.log("err")
                return res.status(400).json({ 'msg': err });
            }
      return res.status(201).json(chat);
    });
}
exports.viewChat=(req,res)=>{
   console.log(req.body)
  Chat.find({$or:[{
    $and:[
    {myid:req.body.userid},{friendid:req.body.friendid},
    ]
  
    },{$and:[{myid:req.body.myid1},{friendid:req.body.friendid1}
  ]}],
  $or:[{
    $and:[
    {myid:req.body.myid1},{friendid:req.body.friendid1},
    ]
  
    },{$and:[{myid:req.body.myid},{friendid:req.body.friendid}
  ]}]
  
            }
  
            ,(err,chat)=>{
    if(err){
      return res.status(400).json({ 'msg': 'error' });
    }
    
return res.status(201).json(chat);
  });
}
exports.deleteChat=(req,res)=>{
  console.log(req.body)
   Chat.deleteMany({$or:[{"myid":req.body.myid},{"friendid":req.body.friendid},{"myid":req.body.myid1},{"friendid":req.body.friendid1}]},(err,book)=>{
    if(err){
       return res.status(400).json(book);
      
    }
     return res.status(201).json(book);
              
              })
}