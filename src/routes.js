var express         = require('express'),
    routes          = express.Router();
var userController  = require('./controller/user-controller');
var adminController  = require('./controller/admin-controller');
var workerController = require('./controller/worker-controller');
var notificationController = require('./controller/notification-controller');
var locationController = require('./controller/location-controller');
var bookworkerController = require('./controller/booking-controller');
var chatController=require('./controller/chat-controller')
var feedbackController=require('./controller/feedback-controller')
var reviewController=require('./controller/review-controller')
var userreviewController=require('./controller/userreview-controller')
var passport	    = require('passport');
 
routes.get('/', (req, res) => {
    return res.send('Hello, this is the API!');
});
 
routes.post('/register', userController.registerUser);
routes.post('/login', userController.loginUser);
routes.post('/checkotp', userController.checkOtp);
routes.post('/password',userController.passwordGet);
routes.post('/category',adminController.addCategory);
routes.post('/viewjob',adminController.viewJobs);
routes.post('/addworker',workerController.addWorker);
routes.post('/viewworker',workerController.viewWorker);
routes.post('/viewworkerdetails',workerController.viewWorkerdetails);
routes.post('/updateworker',workerController.updateWorker);
routes.post('/notification',notificationController.addNotification);
routes.post('/viewnotification',notificationController.viewNotification);
routes.post('/updateprofile',userController.updateProfile);
routes.post('/viewprofile',userController.viewProfile);
routes.post('/viewmyworkers',workerController.viewMyworkers);
routes.post('/viewmyworkersdetails',workerController.viewMyworkersdetails);
routes.post('/addlocation',locationController.addLocation);
routes.post('/bookworker',bookworkerController.bookWorker);
routes.post('/viewlocation',locationController.viewLocation);
routes.post('/viewparticularnotification',notificationController.viewparticularNotification);
routes.post('/acceptworker',bookworkerController.acceptWorker);
routes.post('/viewchatlist',chatController.viewChatlist);
routes.post('/chatmsg',chatController.Chatmsg);
routes.post('/viewchat',chatController.viewChat);
routes.post('/viewbooking',bookworkerController.viewBooking);
routes.post('/viewmybooking',bookworkerController.viewmyBooking);
routes.post('/updatename', userController.updateName);
routes.post('/updatedob', userController.updateDob);
routes.post('/updategender', userController.updateGender);
routes.post('/updatephone', userController.updatePhone);
routes.post('/updateemail', userController.updateEmail);
routes.post('/updatebio', userController.updateBio);
routes.post('/updatepic', userController.updatePic);
routes.post('/checkpass',userController.checkPass);
routes.post('/updatepass',userController.updatePass);
routes.post('/addfeedback',feedbackController.addFeedback)
routes.post('/viewfeedback',feedbackController.viewFeedback)
routes.post('/viewmybookedjobs',bookworkerController.viewmyBookedjobs);
routes.post('/searchcategory',userController.searchCategory);
routes.post('/addreview',reviewController.addReview)
routes.post('/viewreview',reviewController.viewReview)
routes.post('/adduserreview',userreviewController.addUserReview)
routes.post('/viewuserreview',userreviewController.viewUserReview)
routes.post('/deletebooking',bookworkerController.deleteBooking);
routes.post('/deletechat',chatController.deleteChat);
routes.post('/viewifworker',workerController.viewifWorker);
routes.post('/rejectbooking',bookworkerController.rejectBooking);
routes.post('/deletenotification',notificationController.deleteNotification)
routes.post('/availablestatus',workerController.availableStatus)
routes.post('/countnotification',notificationController.countNotification)
routes.post('/updatenotification',notificationController.updateNotification)
routes.post('/findemail',userController.findEmail)
routes.post('/findphone',userController.findPhone)
routes.post('/deleteworkeraccount',workerController.deleteworkerAccount)
routes.post('/updatestarttime',workerController.updateStarttime)
routes.post('/updateendtime',workerController.updateEndtime)
routes.post('/updatesalary',workerController.updateSalary)
routes.post('/updatedescription',workerController.updateDescription)


routes.get('/special', passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.json({ msg: `Hey ${req.user.email}! I open at the close.` });
});
 
module.exports = routes;