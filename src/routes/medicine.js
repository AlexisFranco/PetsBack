const router = require('express').Router();
const medicineController = require('../controllers/medicine.controller');

router.route('/').get(medicineController.list);
router.route('/:userID').post(medicineController.create);
router.route('/').put(medicineController.update);
router.route('/').delete(medicineController.destroy);

module.exports = router;
