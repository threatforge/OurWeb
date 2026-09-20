const Achievement = require('../models/Achievement');

const getAchievements = async (req, res) => {
  try {
    const achievements = await Achievement.find({}).sort({ date: -1 });
    res.json(achievements);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const createAchievement = async (req, res) => {
  try {
    const achievement = await Achievement.create(req.body);
    res.status(201).json(achievement);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data', error: error.message });
  }
};

module.exports = {
  getAchievements,
  createAchievement
};
