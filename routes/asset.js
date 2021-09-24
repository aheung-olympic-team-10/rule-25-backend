const express = require('express');
const router = express.Router();

const asset = require('../controllers/asset');

router.post('/', asset.create);

module.exports = router;
