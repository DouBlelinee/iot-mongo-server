var express = require('express')
var router = express.Router()

var Grade = require('../models/iot')

Grade.methods(['get', 'put', 'post', 'delete'])
Grade.register(router, '/iot')

module.exports = router
