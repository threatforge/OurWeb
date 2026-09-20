const User = require('../models/User');

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-passwordHash').populate('completedChallenges', 'title points type');
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getLeaderboard = async (req, res) => {
  try {
    const users = await User.find({ role: { $ne: 'admin' } })
      .select('name xp points level streak challengesSolved completedChallenges role')
      .sort({ xp: -1, points: -1, challengesSolved: -1, streak: -1 })
      .limit(100);
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getUserProfile,
  getLeaderboard
};
