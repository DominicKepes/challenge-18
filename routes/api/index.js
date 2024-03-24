const express = require('express');
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');
const reactionRoutes = require('./reactionRoutes');

const router = express.Router();

// Mount user routes
router.use('/api/users', userRoutes);

// Mount thought routes
router.use('/api/thoughts', thoughtRoutes);

// Mount reaction routes
router.use('/api/thoughts/:thoughtId/reactions', reactionRoutes);

module.exports = router;