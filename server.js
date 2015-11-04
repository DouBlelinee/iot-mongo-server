var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var Model = require('./models/iot.js')

mongoose.connect('mongodb://localhost/db')

var app = express()
app.use(express.static('public'))

app.post('/', function (req, res) {
  var obj = new Model(req.body)
  obj.save(function (err, obj) {
    if (err) {
      res.status(500).send(err)
    } else {
      res.send(obj)
    }
  })
})
app.get('/api/iot', function (req, res, next) {
  Model.find({}).exec(function (err, results) {
    if (err) {
      res.status(500).send(err)
    } else {
      res.send(results)
    }
  })
})
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html')
})
app.use('/api', require('./routes/api'))
app.listen(3000)
console.log('run in 3000')
