const router = require('express').Router();
const userController = require('../controller/user_controller');
const userLoging = require('../controller/user_loging_controller');
const {authenticationToken} = require('../auth/jwt_auth')

router.get('/',authenticationToken,userController.getAllUsers);
router.post('/',userController.postUserData);
router.patch('/:id',userController.updateUserData);
router.delete('/:id',userController.deleteUserData);
router.post('/login',userLoging.userLoging);
// router.post('/logout',authenticationToken,userLoging.logout);


module.exports = router;



