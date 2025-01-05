const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');

router.post('/', controller.createNewUser);

router.put('/:user_id', controller.updateUserById);
router.get('/', controller.readAllUser);

module.exports = router;