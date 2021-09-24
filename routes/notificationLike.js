const express = require('express');
const router = express.Router();

const verifyJWT = require('../middlewares/verifyJWT');

const notificationLike = require('../controllers/notificationLike');

router.post('/', verifyJWT, notificationLike.create);
router.delete('/:id', verifyJWT, notificationLike.delete);

module.exports = router;
