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
      $http.get('/api/iot')
              .then(function success (response) {         
                  var data = {
                              labels: [],
                              datasets: [
                                 {
            label: "temperature",
            fillColor: "rgba(220,220,220,0.5)",
            strokeColor: "rgba(220,220,220,0.8)",
            highlightFill: "rgba(220,220,220,0.75)",
            highlightStroke: "rgba(220,220,220,1)",
            data: []
        },
        {
            label: "relative_humidity",
            fillColor: "rgba(151,187,205,0.5)",
            strokeColor: "rgba(151,187,205,0.8)",
            highlightFill: "rgba(151,187,205,0.75)",
            highlightStroke: "rgba(151,187,205,1)",
            data: []
        }
                              ]
                          }

               var ctx = document.getElementById("iot").getContext("2d")
               var myBarChart = new Chart(ctx).Bar(data)

  

               
                  for(var i = 0;i<response.data.length;i++){
                    if (response.data[i].iot_id==0){
                         myBarChart.addData([response.data[i].temperature, response.data[i].relative_humidity] ,scope.toTime(response.data[i].timestamp))
                       }
                   
                }
              }, function error (response) {
                alert(response.data.message)
                
              }) 
      
    }
})
       
