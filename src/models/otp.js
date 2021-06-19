var mongoose = require('mongoose');



var OTPSchema = new mongoose.Schema({
  otp: {
    type: String,
    //required: true
    
  },
  phone: {
    type: String,
    //required: true
    
  }
  ,
  expireAt: {
  type: Date,
  default: Date.now,
  index: { expires: '2m' },
},
  
  
});
 
// UserSchema.pre('save',  function(next) {
//     var user = this;
 
//      if (!user.isModified('password')) return next();
 
//      bcrypt.genSalt(10, function(err, salt) {
//          if (err) return next(err);
 
//          bcrypt.hash(user.password, salt, function(err, hash) {
//              if (err) return next(err);
 
//              user.password = hash;
//              next();
//          });
//      });
// });
 
module.exports = mongoose.model('Otp', OTPSchema);