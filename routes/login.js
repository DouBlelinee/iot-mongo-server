var express = require('express')
var router = express.Router()
var login = require('../models/login')
login.methods(['get', 'put', 'post', 'delete'])
login.register(router, '/api/login')
module.exports = router
