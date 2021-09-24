const express = require('express');
const router = express.Router();

const verifyJWT = require('../middlewares/verifyJWT');

const asset = require('../controllers/asset');

router.post('/', verifyJWT, asset.create);
router.put('/:id', verifyJWT, asset.update);
router.delete('/:id', verifyJWT, asset.delete);

module.exports = router;
