const router = require('express').Router();
const zoneController = require('../controllers/zone.controller');

router.route('/').get(zoneController.list);
router.route('/').post(zoneController.create);
router.route('/').put(zoneController.update);
router.route('/').delete(zoneController.destroy);

module.exports = router;
