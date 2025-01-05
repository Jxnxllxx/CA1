const express = require('express');
const router = express.Router();
const controller = require('../controllers/questController');

router.post('/', controller.createNewQuest);

router.put('/:quest_id', controller.updateQuestById);
router.delete('/:quest_id', controller.deleteQuestById)

module.exports = router;