const mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;


mongoose.connect('mongodb://localhost/toDoDb');

var toDoSchema = new Schema({
  name : String,
  dueDate : Date,
  status : Boolean,
  createdAt: { type: Date, default: Date.now },
  userId: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('toDo', toDoSchema)
