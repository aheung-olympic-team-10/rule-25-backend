const express = require('express');
const router = express.Router();

const notification = require('../controllers/notification');

router.post('/', notification.create);

module.exports = router;
