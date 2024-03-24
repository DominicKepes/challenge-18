const router = require('express').Router();
const { Thought } = require('../../models');

// POST create a reaction for a thought
router.post('/api/thoughts/:thoughtId/reactions', async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    thought.reactions.push(req.body);
    await thought.save();
    res.status(201).json(thought);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// DELETE remove a reaction from a thought
router.delete('/api/thoughts/:thoughtId/reactions/:reactionId', async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    const reaction = thought.reactions.id(req.params.reactionId);
    if (!reaction) {
      return res.status(404).json({ message: 'Reaction not found' });
    }
    reaction.remove();
    await thought.save();
    res.json({ message: 'Reaction deleted' });
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

module.exports = router;
