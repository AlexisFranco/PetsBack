const router = require('express').Router();
const serviceController = require('../controllers/service.controller');

router.route('/').get(serviceController.list);
router.route('/:userID').post(serviceController.create);
router.route('/:serviceID').put(serviceController.update);
router.route('/:userID').delete(serviceController.destroy);

module.exports = router;
