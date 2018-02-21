const mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;


mongoose.connect('mongodb://localhost/toDoDb');

var bucketSchema = new Schema({
  name : String,
  dueDate : Date,
  status : Boolean,
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('toDo', toDoSchema)
