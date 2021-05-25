const router = require('express').Router();
const medicineController = require('../controllers/medicine.controller');
const { auth } = require('../utils/auth');

router.route('/').get(medicineController.list);
router.route('/').post(auth, medicineController.create);
router.route('/').put(medicineController.update);
router.route('/').delete(medicineController.destroy);

module.exports = router;
