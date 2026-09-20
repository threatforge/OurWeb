const express = require('express');
const router = express.Router();
const {
  submitApplication,
  getApplications,
  getApplicationById,
  updateApplicationStatus,
  deleteApplication
} = require('../controllers/applicationController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
  .post(submitApplication)
  .get(protect, admin, getApplications);

router.route('/:id')
  .get(protect, admin, getApplicationById)
  .delete(protect, admin, deleteApplication);

router.route('/:id/status')
  .put(protect, admin, updateApplicationStatus);

module.exports = router;
