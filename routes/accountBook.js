const express = require('express');
const router = express.Router();

const verifyJWT = require('../middlewares/verifyJWT');

const accountBook = require('../controllers/accountBook');

router.post('/', verifyJWT, accountBook.create);
router.put('/:id', verifyJWT, accountBook.update);
router.delete('/:id', verifyJWT, accountBook.delete);

module.exports = router;
