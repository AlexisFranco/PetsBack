const router = require('express').Router();
const serviceController = require('../controllers/service.controller');
const { auth } = require('../utils/auth');

router.route('/').get(serviceController.list);
router.route('/').post(auth, serviceController.create);
router.route('/:serviceID').put(serviceController.update);
router.route('/').delete(auth, serviceController.destroy);

module.exports = router;
