const mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

mongoose.connect('mongodb://localhost/toDoDb');

var UserSchema = new Schema({
  email : String,
  name : String,
  picture : String,
  phone : String
});

module.exports = mongoose.model('User', UserSchema)
