var express = require('express')
var router = express.Router()
var login = require('../models/register')
login.methods(['get', 'put', 'post', 'delete'])
login.register(router, '/register')
module.exports = router
