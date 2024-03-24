const router = require('express').Router();
const { Thought, User } = require('../../models');

// GET all thoughts
router.get('/', async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// GET a single thought by id
router.get('/api/thoughts/:id', async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.id).populate('reactions');
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    res.json(thought);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// POST create a new thought
router.post('/api/thoughts', async (req, res) => {
  try {
    const thought = await Thought.create(req.body);
    await User.findByIdAndUpdate(req.body.userId, { $push: { thoughts: thought._id } });
    res.status(201).json(thought);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// PUT update a thought by id
router.put('/api/thoughts/:id', async (req, res) => {
  try {
    const thought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    res.json(thought);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// DELETE remove a thought by id
router.delete('/api/thoughts/:id', async (req, res) => {
  try {
    const thought = await Thought.findByIdAndDelete(req.params.id);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    res.json({ message: 'Thought deleted' });
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

module.exports = router;
