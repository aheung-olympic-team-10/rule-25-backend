const express = require('express');
const router = express.Router();

const notificationLike = require('../controllers/notificationLike');

router.post('/', notificationLike.create);
router.delete('/:id', notificationLike.delete);

module.exports = router;
