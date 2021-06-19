var User = require('../models/user');
var Otp = require('../models/otp');
var Cat = require('../models/category')
var jwt = require('jsonwebtoken');
var config = require('../config/config');
 const accountSid = 'ACcc84feb1dc2970c2b8596817f7ba8d12';
const authToken = '53fd8bde122e465e11c0505c3e92c1da';
const client = require('twilio')(accountSid, authToken);
//const db = 'mongodb+srv://jishnu:jishnu5510@cluster0-80d0s.mongodb.net/chs?retryWrites=true&w=majority';



function createToken(user) {
    return jwt.sign({ id: user.id, email: user.email }, config.jwtSecret, {
        expiresIn: 200 // 86400 expires in 24 hours
      });
}

      
exports.registerUser = (req, res) => {
    
 console.log(req.body)
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
          // console.log("err")
            return res.status(400).json({ 'msg': err });
        }
 
        if (user) {
            return res.status(400).json({ 'msg': 'The user already exists' });
        }
 
        let newUser = User(req.body);
        newUser.save((err, user) => {
            if (err) {
               console.log("err")
                return res.status(400).json({ 'msg': err });
            }
          //var num=Math.floor(1000 + Math.random() * 9000);
          var num=1234
          console.log(client)
          client.messages
  .create({
     body: `Your otp ${num}`,
     from: '+18509404227',
     to: `+917994245510`
   })
  .then(message => {
            console.log(message.sid)
           
          });
           console.log(user)
        let newOtp=Otp({"otp":num,"phone":req.body.phone})
        newOtp.save((err, otp) => {
           if (err) {
               console.log("err")
                return res.status(400).json({ 'msg': err });
            }
           return res.status(201).json(user);
        });
        
           
        });
      
    });
 
  
};
//console.log("err")
exports.passwordGet = (req, res) => {
  console.log("err")
   User.findOne({ uid: req.body.uid, password: req.body.password }, (err, pass) => {
     if (err) {
           //console.log("err")
            return res.status(400).json({ 'msg': err });
        }
     
     console.log("err")
     //let newUser=User(req.body.password);
     
    User.updateOne(
      {_id: req.body.uid}, 
       { 
         $set: { password:req.body.password} 
       },
    (err, pass) =>{
      if (err) {
           console.log("err")
            return res.status(400).json({ 'msg': err });
        }
       return res.status(201).json({
                  token: createToken(pass),
                  pass
              });
      console.log(res)
    });
  });
 
  
};
exports.updateProfile = (req, res) => {
  console.log("err")
   User.findOne({ _id: req.body._id}, (err, pass) => {
     if (err) {
           //console.log("err")
            return res.status(400).json({ 'msg': err });
        }
     
     console.log("err")
     //let newUser=User(req.body.password);
     
    User.updateOne(
      {_id: req.body._id}, 
       { 
         $set: { name:req.body.name,
               date_of_birth:req.body.date_of_birth,
               gender:req.body.gender,
               phone:req.body.phone,
               bio:req.body.bio,
               profile_pic:req.body.profile_pic} 
       },
    (err, profile) =>{
      if (err) {
           console.log("err")
            return res.status(400).json({ 'msg': err });
        }
       
      console.log(res)
      return res.status(201).json(profile);
    });
  });
 
  
};
exports.viewProfile = (req, res) => {
  console.log("err")
   User.findOne({ _id: req.body._id}, (err, pass) => {
     if (err) {
           //console.log("err")
            return res.status(400).json({ 'msg': err });
        }
     
     return res.status(201).json(pass);
     
    
  });
 
  
};



 //console.log("err")
exports.loginUser = (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).send({ 'msg': 'You need to send email and password' });
    }
 
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            return res.status(400).send({ 'msg': err });
        }
 
        if (!user) {
            return res.status(400).json({ 'msg': 'The user does not exist' });
        }
 
      User.findOne( 
        { email: req.body.email, password: req.body.password}, (err, user) =>{
          if (err) {
            return res.status(400).send({ 'msg': 'Incorrect email or password' });
            console.log("err")
        }
          if (!user) {
            return res.status(400).json({ 'msg': 'Incorrect email or password' });
        }
          console.log("err")
          return res.status(201).json({
                  token: createToken(user),
                  user
                  
                    
              });
          //return res.status(201).json(user);
          
        } );
        // user.comparePassword(req.body.password, (err, isMatch) => {
        //     if (isMatch && !err) {
        //         return res.status(200).json({
        //             token: createToken(user)
        //         });
        //     } else {
        //         return res.status(400).json({ msg: 'The email and password don\'t match.' });
        //     }
        // });
    });
};

exports.checkOtp = (req, res) => {
    
 console.log(req.body)
  
  Otp.findOne({ otp: req.body.otp, phone: req.body.phone }, (err, otp) => {
    if (err) {
          // console.log("err")
            return res.status(400).json({ 'msg': err });
        }
    
    
 
        if (!otp) {
          return res.status(400).json({ 'msg': 'Incorrect OTP' });
             //return res.status(201).json(otp);
          console.log("err")
        }
    return res.status(201).json(otp);
    
    
  });
   
};
exports.updateName = (req, res) => {
    User.updateOne(
      {_id: req.body._id}, 
       { 
         $set: { name:req.body.name,
               //date_of_birth:req.body.date_of_birth,
               // gender:req.body.gender,
               // phone:req.body.phone,
               // bio:req.body.bio,
               // profile_pic:req.body.profile_pic
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
};
exports.updateDob = (req, res) => {
  console.log(req.body)
    User.updateOne(
      {_id: req.body._id}, 
       { 
         $set: { //name:req.body.name,
               date_of_birth:req.body.dob,
               // gender:req.body.gender,
               // phone:req.body.phone,
               // bio:req.body.bio,
               // profile_pic:req.body.profile_pic
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
};
exports.updateGender = (req, res) => {
    User.updateOne(
      {_id: req.body._id}, 
       { 
         $set: { //name:req.body.name,
               //date_of_birth:req.body.date_of_birth,
               gender:req.body.gender,
               // phone:req.body.phone,
               // bio:req.body.bio,
               // profile_pic:req.body.profile_pic
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
};
exports.updatePhone = (req, res) => {
    User.updateOne(
      {_id: req.body._id}, 
       { 
         $set: { //name:req.body.name,
               //date_of_birth:req.body.date_of_birth,
               // gender:req.body.gender,
               phone:req.body.phone,
               // bio:req.body.bio,
               // profile_pic:req.body.profile_pic
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
};
exports.updateEmail = (req, res) => {
   User.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
          // console.log("err")
            return res.status(400).json({ 'msg': err });
        }
 
        if (user) {
            return res.status(400).json({ 'msg': 'The email already exists' });
        }
  
    User.updateOne(
      {_id: req.body._id}, 
       { 
         $set: { //name:req.body.name,
               //date_of_birth:req.body.date_of_birth,
               // gender:req.body.gender,
               email:req.body.email,
               // bio:req.body.bio,
               // profile_pic:req.body.profile_pic
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
   });
};


exports.updateBio = (req, res) => {
    User.updateOne(
      {_id: req.body._id}, 
       { 
         $set: { //name:req.body.name,
               //date_of_birth:req.body.date_of_birth,
               // gender:req.body.gender,
               // phone:req.body.phone,
               bio:req.body.bio,
               // profile_pic:req.body.profile_pic
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
};
exports.updatePic = (req, res) => {
  console.log(req.body.profile_pic)
  if(req.body.profile_pic!=null){
    User.updateOne(
      {_id: req.body._id}, 
       { 
         $set: { //name:req.body.name,
               //date_of_birth:req.body.date_of_birth,
               // gender:req.body.gender,
               // phone:req.body.phone,
               // bio:req.body.bio,
                profile_pic:req.body.profile_pic
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
  else
    {
      return res.status(400).json({ 'msg': 'Please select an image' });
      
    }
    
};

exports.checkPass=(req,res)=>{
  console.log(req.body)
  User.findOne({ $and:[{_id:req.body.uid,password:req.body.pass}]},(err,pass)=>{
    if(err){
       return res.status(400).json({ 'msg': 'Incorrect password' });
    }
    if(pass){
       return res.status(201).json(pass);
    }
     return res.status(400).json({ 'msg': 'Incorrect password' });
   
  })
  
}
exports.updatePass=(req,res)=>{
  User.findOne({_id:req.body.uid},(err,pass)=>{
    if(err){
       return res.status(400).json({ 'msg': 'Incorrect password' });
    }
    if(pass){
      User.updateOne(
      {_id: req.body.uid}, 
       { 
         $set: { //name:req.body.name,
               //date_of_birth:req.body.date_of_birth,
               // gender:req.body.gender,
               // phone:req.body.phone,
               // bio:req.body.bio,
                password:req.body.pass
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

exports.searchCategory=(req,res)=>{
  Cat.find({category:req.body.category},(err,cat)=>{
    if(err){
      return res.status(400).json({'msg':'Category not found'})
    }
    return res.status(201).json(cat);
  })
}

exports.findEmail=(req,res)=>{
  User.findOne({"email":req.body.email},(err,email)=>{
    if(err){
       return res.status(400).json({'msg':'Email invalid'})
    }
    if(email){
      return res.status(201).json(email)
    }
    else{
      return res.status(400).json({'msg':'Invalid email id'})
    }
    
  })
}
exports.findPhone=(req,res)=>{
  User.findOne({"phone":req.body.phone,"email":req.body.email},(err,email)=>{
    if(err){
       return res.status(400).json({'msg':'Phone number invalid'})
      
    }
    if(email){
      
       //return res.status(201).json(email)
    var num=Math.floor(1000 + Math.random() * 9000);
          console.log(client)
          client.messages
  .create({
     body: `Your otp ${num}`,
     from: '+18509404227',
     to: `+917994245510`
   })
  .then(message => {
            console.log(message.sid)
           
          });
           //console.log(user)
        let newOtp=Otp({"otp":num,"phone":req.body.phone})
        newOtp.save((err, otp) => {
           if (err) {
               console.log("err")
                return res.status(400).json({ 'msg': err });
            }
           return res.status(201).json(email);
        });
      
    }
    else
      {
       return res.status(400).json({'msg':'Phone number invalid'}) 
      }
    
   
  })
}

