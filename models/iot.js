var restful = require('node-restful')
var mongoose = restful.mongoose
var iot = new mongoose.Schema({
  timestamp: {type: Date, default: Date.now},
  iot_id: Number,
  temperature: Number,
  relative_Humidity: Number
})
module.exports = restful.model('iot', iot)
