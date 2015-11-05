angular.module('iot', [])
      .controller('IotController', function ($http) {
        var scope = this
       scope.insert = function (value) {
        $http.post('/api/iot', value)
          .then(function success (response) {
            alert('Success')
            scope.query()
            value.iot_id = value.temperature = value.relative_Humidity = []
          }, function error (response) {
            alert(response.data.message)
            	})

      }
   	scope.query = function () {
 			$http.get('/api/iot').success(function (response) {
 				console.log(response)
 				scope.data = response
    	

    })
 		}
 		scope.toTime = function(date){
    return moment(date).format('MMMM Do YYYY , h:mm:ss a')
}

})
  