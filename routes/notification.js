const express = require('express');
const router = express.Router();

const verifyJWT = require('../middlewares/verifyJWT');

const notification = require('../controllers/notification');

router.get('/:userId', verifyJWT, notification.getFromFollowings);
router.post('/', verifyJWT, notification.create);

module.exports = router;
