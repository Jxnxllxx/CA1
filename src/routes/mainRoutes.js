const express = require('express');
const router = express.Router();
const fitnessChallengeRoutes = require('./fitnessChallengeRoutes');
const userCompletionRoutes = require('./userCompletionRoutes');
const userRoutes = require('./userRoutes');
const playerRoutes = require('./playerRoutes');
const inventoryRoutes = require('./inventoryRoutes');
const questRoutes = require('./questRoutes');

router.use("/challenges", fitnessChallengeRoutes);
router.use("/challenges", userCompletionRoutes);
router.use("/users", userRoutes);
router.use("/players", playerRoutes);
router.use("/inventory", inventoryRoutes);
router.use("/quests", questRoutes);

module.exports = router;