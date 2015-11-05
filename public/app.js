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
	scope.delete = function(id,index){
        console.log(id)
        $http.delete('/api/iot/'+id)
          .success(function(data) {
            scope.data.splice(index,1)           
          })
          .error(function(data) {
            console.log('Error: ' + data)
          })
    }

    scope.graph = function(){
    	console.log('eeeee')
      $http.get('/api/iot')
              .then(function success (response) {
         
                  var data = {
                              labels: ["January", "February", "March", "April", "May", "June", "July"],
                              datasets: [
                                  {
                                      label: "temperature",
                                      fillColor: "rgba(255,0,0,0.2)",
                                      strokeColor: "rgba(255,0,0,1)",
                                      pointColor: "rgba(255,0,0,1)",
                                      pointStrokeColor: "#fff",
                                      pointHighlightFill: "#fff",
                                      pointHighlightStroke: "rgba(220,220,220,1)",
                                      data: []
                                  },
                                  {
                                      label: "relative_humidity",
                                      fillColor: "rgba(69,187,91,0.2)",
                                      strokeColor: "rgba(69,187,91,1)",
                                      pointColor: "rgba(69,187,91,1)",
                                      pointStrokeColor: "#fff",
                                      pointHighlightFill: "#fff",
                                      pointHighlightStroke: "rgba(151,187,205,1)",
                                      data: []
                                  }
                              ]
                          };

               var ctx = document.getElementById("c").getContext("2d")
               var myLineChart = new Chart(ctx).Line(data);

               
                  for(var i = 0;i<response.data.length;i++){
                    if (response.data[i].iot_id==0){
                         myLineChart.addData([response.data[i].temperature, response.data[i].relative_humidity] ,scope.toTime(response.data[i].timestamp))
                       }
                   
                }
               

              }, function error (response) {
                alert(response.data.message)
              }) 
      
    }
})
       
