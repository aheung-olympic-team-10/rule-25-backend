const express = require('express');
const router = express.Router();

const user = require('../controllers/user');

router.get('/:id', user.findOne);
router.get('/:id/followers', user.getFollowers);

module.exports = router;
