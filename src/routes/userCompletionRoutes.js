const express = require('express');
const router = express.Router();
const controller = require('../controllers/userCompletionController');

router.post('/:challenge_id', controller.createNewUserCompletion);

router.get('/:challenge_id', controller.readUserCompletionById);

module.exports = router;