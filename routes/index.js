const express = require('express');
const router = express.Router();
const thoughtRoutes = require('./api/thoughtRoutes');

// Mount thought routes
router.use('/api/thoughts', thoughtRoutes);

module.exports = router;