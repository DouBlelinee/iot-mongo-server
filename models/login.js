var restful = require('node-restful')
var mongoose = restful.mongoose
var login = new mongoose.Schema({
  name: String,
  surname: String,
  username: String,
  password: String
})
module.exports = restful.model('login', login)
