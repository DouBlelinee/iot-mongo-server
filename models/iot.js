var restful = require('node-restful')
var mongoose = restful.mongoose

var iot = new mongoose.Schema({
  timestamp: Number,
  iot_id: Number,
  temperature: Number,
  relative_humidity: Number

})
module.exports = restful.model('iot', iot)
