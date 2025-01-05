const express = require('express');
const router = express.Router();
const controller = require('../controllers/playerController');

router.post('/', controller.createNewPlayer);

router.put('/:player_id', controller.updateNameById);
router.get('/:username', controller.readPlayersByUsername);
router.delete('/:player_id', controller.deletePlayerById)

module.exports = router;