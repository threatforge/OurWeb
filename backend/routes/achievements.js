const express = require('express');
const router = express.Router();
const { getAchievements, createAchievement } = require('../controllers/achievementController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
  .get(getAchievements)
  .post(protect, admin, createAchievement);

module.exports = router;
