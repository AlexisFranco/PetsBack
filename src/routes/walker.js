const router = require('express').Router();
const walkerController = require('../controllers/walker.controller');
const { auth } = require('../utils/auth');

router.route('/').get(walkerController.list);
router.route('/').post(walkerController.signup);
router.route('/').put(auth, walkerController.update);
router.route('/').delete(auth, walkerController.destroy);

module.exports = router;
