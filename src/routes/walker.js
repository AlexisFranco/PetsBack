const router = require('express').Router();
const walkerController = require('../controllers/walker.controller');
const { auth } = require('../utils/auth');
const { formData } = require('../utils/formData');

router.route('/').get(walkerController.list);
router.route('/').post(walkerController.signup);
router.route('/').put(auth, formData, walkerController.update);
router.route('/').delete(auth, walkerController.destroy);

module.exports = router;
