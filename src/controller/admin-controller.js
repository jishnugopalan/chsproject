var Cat = require('../models/category')
var jwt = require('jsonwebtoken');
var config = require('../config/config');
function createToken(user) {
    return jwt.sign({ id: user.id, email: user.email }, config.jwtSecret, {
        expiresIn: 200 // 86400 expires in 24 hours
      });
}
exports.addCategory = (req, res) => {
  
 console.log(req.body)
  
  Cat.findOne({ category:req.body.category}, (err, cat) => {
    if (err) {
          // console.log("err")
            return res.status(400).json({ 'msg': 'The category already exists' });
        }
    if (cat) {
            return res.status(400).json({ 'msg': 'The category already exists' });
        }
    
    
    let newCat = Cat(req.body);
    
    newCat.save((err, cat) => {
      console.log("ss")
            if (err) {
               console.log("err")
                return res.status(400).json({ 'msg': err });
            }
      return res.status(201).json({'msg':'category added'});
    });
    
    
    
    
    
  });
   
};

exports.viewJobs = (req, res) => {
   
 console.log(req.body)
  
  Cat.find({}, (err, job) => {
    if (err) {
          // console.log("err")
            return res.status(400).json({ 'msg': err });
        }
   
    
    return res.status(201).json(job);
    
 
     
  });
   
};