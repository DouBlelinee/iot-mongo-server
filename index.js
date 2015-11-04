var unirest = require('unirest')

var addr = process.argv[2]
var port = process.argv[3]

var url = 'http://' + addr + ':' + port

for (var i = 0; i < 10; i++) {
  postIOT(i)
}

function postIOT (id) {
  var timestamp = Math.floor(Date.now() / 1000)
  for (var i = 100; i >= 0; i--) {
    post(id, timestamp)
    timestamp = timestamp - 3600
  }
}

function post (id, timestamp) {
  var data = {
    'timestamp': timestamp,
    'iot_id': id,
    'temperature': ran(0, 60),
    'relative_humidity': ran(1, 100)
  }
  console.log(data)
  unirest.post(url)
    .type('json')
    .send(data)
    .end(function (response) {
      console.log(response.body)
    })
}

function ran (start, end) {
  return Math.floor((Math.random() * end) + start)
}
