const express = require('express');
const router = express.Router();
const controller = require('../controllers/inventoryController');

router.post('/', controller.createNewWeapon);

router.get('/:player_id', controller.readWeaponsByPlayerId);
router.delete('/:weapon_id', controller.deleteWeaponById)

module.exports = router;