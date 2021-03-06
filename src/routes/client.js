const router = require('express').Router();
const clientController = require('../controllers/client.controller');
const { auth } = require('../utils/auth');
const { formData } = require('../utils/formData');

router.route('/').get(auth, clientController.show);
router.route('/').post(clientController.signup);
router.route('/').put(auth, formData, clientController.update);
router.route('/').delete(auth, clientController.destroy);

module.exports = router;
