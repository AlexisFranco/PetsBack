const router = require('express').Router();
const clientController = require('../controllers/client.controller');

router.route('/').get(clientController.list);
router.route('/').post(clientController.signup);
router.route('/:userID').put(clientController.update);
router.route('/:userID').delete(clientController.destroy);

module.exports = router;
