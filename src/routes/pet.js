const router = require('express').Router();
const petController = require('../controllers/pet.controller');

router.route('/').get(petController.list);
router.route('/:userID').post(petController.create);
router.route('/:userID').put(petController.update);
router.route('/:userID').delete(petController.destroy);

module.exports = router;
