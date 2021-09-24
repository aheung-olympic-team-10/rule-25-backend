const express = require('express');
const router = express.Router();

const notification = require('../controllers/notification');

router.get('/:userId', notification.getFromFollowings);
router.post('/', notification.create);

module.exports = router;
