const mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var UserSchema = new Schema({
  email : String,
  name : String,
  picture : String,
  bucket : [{
    type: String
  }]
});

module.exports = mongoose.model('User', UserSchema)
