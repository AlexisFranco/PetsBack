const router = require('express').Router();
const walkerController = require('../controllers/walker.controller');

router.route('/').get(walkerController.list);
router.route('/').post(walkerController.signup);
router.route('/:userID').put(walkerController.update);
router.route('/:userID').delete(walkerController.destroy);

module.exports = router;
