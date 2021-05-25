const router = require('express').Router();
const userController = require('../controllers/user.controller');

router.route('/signin').post(userController.signin);

module.exports = router;
