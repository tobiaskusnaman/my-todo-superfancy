var express = require('express');
var router = express.Router();
const todo = require('../controllers/todo');
const authentication = require('../helpers/authentication');
/* GET users listing. */

router.post('/', authentication, todo.create)
router.put('/', authentication, todo.edit)
router.delete('/', authentication, todo.remove)
router.get('/findAll', todo.findAll)
router.get('/findIncomplete', authentication, todo.findIncomplete)
router.get('/findComplete', authentication, todo.findComplete)

router.get('/complete', authentication, todo.complete)
router.get('/incomplete', todo.incomplete)
router.get('/findBy_userId', authentication, todo.findBy_userId);



module.exports = router;
