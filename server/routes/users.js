var express = require('express');
var router = express.Router();
const User = require('../controllers/user');
const authentication = require('../helpers/authentication');
/* GET users listing. */
router.post('/bucket', authentication, User.addBucket)
router.post('/', authentication, User.getInfo);

module.exports = router;
