var Loc = require('../models/location')
var jwt = require('jsonwebtoken');
var config = require('../config/config');
function createToken(user) {
    return jwt.sign({ id: user.id, email: user.email }, config.jwtSecret, {
        expiresIn: 200 // 86400 expires in 24 hours
      });
}
exports.addLocation = (req, res) =>{
  Loc.findOne({ userid: req.body.userid }, (err, loc) => {
    if(err){
      return res.status(400).json({ 'msg': err });
    }
    if(loc){
//       Loc.updateOne({userid:req.body.userid},
//                     {$set:{latitude:req.body.latitude,longitude:req.body.longitude}},(err,loc)=>{
//         return res.status(201).json(loc);
        
//       })
      
       return res.status(400).json();
      
    }
    
      //return res.status(400).json({ 'msg': err });
      let newLoc = Loc(req.body);
   
    newLoc.save((err, loc) => {
      console.log("ss")
            if (err) {
               console.log("err")
                return res.status(400).json({ 'msg': err });
            }
      return res.status(201).json(loc);
    });
    
  //console.log(req.body)
  
  
});
  };
exports.viewLocation = (req,res) =>{
  Loc.findOne({ userid: req.body.userid }, (err, loc) => {
    if(err){
      return res.status(400).json({ 'msg': err });
    }
     return res.status(201).json(loc);
    
  })
  
};