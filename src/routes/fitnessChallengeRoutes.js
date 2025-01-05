const express = require('express');
const router = express.Router();
const controller = require('../controllers/fitnessChallengeController');

router.post('/', controller.createNewChallenge);

router.put('/:challenge_id/', controller.updateChallengeById);
router.get('/', controller.readAllChallenges);
router.delete('/:challenge_id/', controller.deleteChallengeById)

module.exports = router;