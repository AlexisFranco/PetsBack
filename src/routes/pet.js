const router = require('express').Router();
const petController = require('../controllers/pet.controller');
const { auth } = require('../utils/auth');
const { formData } = require('../utils/formData');

router.route('/').get(auth, petController.list);
router.route('/:petID').get(auth, petController.show);
router.route('/').post(auth, petController.create);
router.route('/').put(auth, formData, petController.update);
router.route('/').delete(auth, petController.destroy);

module.exports = router;
