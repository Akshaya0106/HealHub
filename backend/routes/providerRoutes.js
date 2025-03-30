const express = require('express');
const { getProviders, getProviderById } = require('../controllers/providerController');
const router = express.Router();

// Route to get all providers
router.get('/', getProviders);

// Route to get a specific provider by ID
router.get('/:id', getProviderById);

module.exports = router;
