const User = require('../models/User');
const Application = require('../models/Application');
const TeamMember = require('../models/TeamMember');
const Project = require('../models/Project');
const Event = require('../models/Event');
const Achievement = require('../models/Achievement');

// @desc    Get dashboard statistics
// @route   GET /api/stats
// @access  Private/Admin
const getStats = async (req, res) => {
  try {
    const totalMembers = await TeamMember.countDocuments();
    const totalApplications = await Application.countDocuments();
    const totalProjects = await Project.countDocuments();
    const totalEvents = await Event.countDocuments();
    const totalAchievements = await Achievement.countDocuments();

    res.json({
      totalMembers,
      totalApplications,
      totalProjects,
      totalEvents,
      totalAchievements
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getPublicStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProjects = await Project.countDocuments();
    const totalEvents = await Event.countDocuments();

    res.json({
      totalUsers,
      totalProjects,
      totalEvents
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getStats,
  getPublicStats
};
