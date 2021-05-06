const router = require('express').Router();
const typeController = require('../controllers/typeMedication.controller');

router.route('/').get(typeController.list);
router.route('/').post(typeController.create);
router.route('/').put(typeController.update);
router.route('/').delete(typeController.destroy);

module.exports = router;
