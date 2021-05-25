const router = require('express').Router();
const typeMedicationController = require('../controllers/typeMedication.controller');

router.route('/').get(typeMedicationController.list);
router.route('/').post(typeMedicationController.create);
router.route('/').put(typeMedicationController.update);
router.route('/').delete(typeMedicationController.destroy);

module.exports = router;
