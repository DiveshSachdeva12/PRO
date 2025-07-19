const express = require('express');
const router = express.Router();
const { submitKiteForm } = require('../controllers/kiteController');

router.post('/', submitKiteForm);

module.exports = router;
