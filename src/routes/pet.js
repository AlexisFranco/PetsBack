const router = require('express').Router();
const petController = require('../controllers/pet.controller');
const { auth } = require('../utils/auth');

router.route('/').get(petController.list);
router.route('/').post(auth, petController.create);
router.route('/').put(auth, petController.update);
router.route('/').delete(auth, petController.destroy);

module.exports = router;
