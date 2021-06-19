var mongoose = require('mongoose');



var UserSchema = new mongoose.Schema({
  name: {
    type: String,
    //required: true
    
  },
  email: {
        type: String,
        unique: true,
        //required: true,
        lowercase: true,
        //trim: true
    },
  phone: {
    type: String,
    //unique: true,
    //required: true
  },
  password: {
        type: String,
        
    },
  uid: {
  type: String
},
gender:{
  type: String
}, 
date_of_birth:{
  type:String
},
bio:{
  type:String
},
profile_pic:{
  type:String,
  required: true,
  default:'../../assets/img/profile.jpg'
  
}
  
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

 
module.exports = mongoose.model('User', UserSchema);