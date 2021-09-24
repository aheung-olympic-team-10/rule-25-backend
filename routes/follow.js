const express = require('express');
const router = express.Router();

const verifyJWT = require('../middlewares/verifyJWT');

const follow = require('../controllers/follow');

router.post('/', verifyJWT, follow.create);
router.delete('/:id', verifyJWT, follow.delete);

module.exports = router;
