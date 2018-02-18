var express = require('express');
var router = express.Router();
const todo = require('../controllers/todo');
const authentication = require('../helpers/authentication');
/* GET users listing. */

router.post('/', authentication, todo.create)
router.get('/findAll', todo.findAll)
router.get('/findIncomplete', authentication, todo.findIncomplete)
router.get('/findComplete', authentication, todo.findComplete)

router.get('/complete', todo.complete)
router.get('/incomplete', todo.incomplete)
router.get('/findBy_userId', authentication, todo.findBy_userId);
router.put('/:id', todo.edit)
router.delete('/:id', authentication, todo.remove)

module.exports = router;
