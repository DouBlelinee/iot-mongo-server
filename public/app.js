angular.module('iot', [])
      .controller('IotController', function ($http) {
        var scope = this
       scope.insert = function(value){
       	console.log(value)
        $http.post('/api/iot', value)
          .then(function success (response) {
            alert('Success')
          }, function error (response) {
            alert(response.data.message)
        })
      }
      })

