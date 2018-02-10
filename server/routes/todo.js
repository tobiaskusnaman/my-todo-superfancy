var express = require('express');
var router = express.Router();
const todo = require('../controllers/todo');
/* GET users listing. */

router.post('/', todo.create)
router.get('/findAll', todo.findAll)
router.get('/findIncomplete', todo.findIncomplete)
router.get('/findComplete', todo.findComplete)


router.get('/:id', todo.findById);
router.put('/:id', todo.edit)
router.delete('/:id', todo.remove)
router.get('/:id/done', todo.complete)
router.get('/:id/incomplete', todo.incomplete)

module.exports = router;
