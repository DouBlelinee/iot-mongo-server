var restful = require('node-restful')
var mongoose = restful.mongoose
var regis = new mongoose.Schema({
  name: String,
  surname: String,
  username: String,
  password: String
})
module.exports = restful.model('regis', regis)
