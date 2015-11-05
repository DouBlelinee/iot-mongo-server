angular.module('iot', [])
      .controller('IotController', function ($http) {
        var scope = this
       scope.insert = function (value) {
        $http.post('/api/iot', value)
          .then(function success (response) {
            alert('Success')
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
})