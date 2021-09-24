const express = require('express');
const router = express.Router();

const accountBook = require('../controllers/accountBook');

router.post('/', accountBook.create);
router.put('/:id', accountBook.update);
router.delete('/:id', accountBook.delete);

module.exports = router;
