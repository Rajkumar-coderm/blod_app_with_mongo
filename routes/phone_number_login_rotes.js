const router = require('express').Router();
const phoneNumberController = require('../controller/login_with_phone_controller');

router.post('/sendOtp',phoneNumberController.phoneNumberLogin);
router.get('/vefifyOtp',phoneNumberController.verifyOtp);


module.exports = router;