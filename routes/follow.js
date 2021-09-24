const express = require('express');
const router = express.Router();

const follow = require('../controllers/follow');

router.post('/', follow.create);
router.delete('/:id', follow.delete);

module.exports = router;
