var express = require('express');
var router = express.Router();
const User = require('../controllers/user');
/* GET home page. */
router.post('/', User.login);

router.post('/register', User.register);
router.get('/findUser', User.findAll)
module.exports = router;
