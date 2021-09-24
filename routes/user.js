const express = require('express');
const router = express.Router();

const user = require('../controllers/user');

router.get('/:id', user.findOne);

module.exports = router;
