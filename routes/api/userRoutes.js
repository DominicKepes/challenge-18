const router = require('express').Router();
const { User } = require('../../models');

// GET all users
router.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// GET a single user by id
router.get('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('thoughts').populate('friends');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// POST create a new user
router.post('/api/users', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// PUT update a user by id
router.put('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// DELETE remove a user by id
router.delete('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // BONUS: Remove associated thoughts
    // await Thought.deleteMany({ _id: { $in: user.thoughts } });
    res.json({ message: 'User deleted' });
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

module.exports = router;
