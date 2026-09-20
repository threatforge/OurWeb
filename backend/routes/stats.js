const express = require('express');
const router = express.Router();
const { getStats, getPublicStats } = require('../controllers/statsController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/public').get(getPublicStats);
router.route('/').get(protect, admin, getStats);

module.exports = router;
