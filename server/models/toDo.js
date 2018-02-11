const mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;


mongoose.connect('mongodb://localhost/toDoDb');

var toDoSchema = new Schema({
  name : String,
  dueDate : Date,
  status : Boolean,
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  assignedBy : { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('toDo', toDoSchema)
