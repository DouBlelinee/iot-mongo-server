angular.module('iot', [])
      .controller('IotController', function ($http) {
        var scope = this
        scope.name = 'vvvv'
    scope.insert = function (value) {
        $http.post('/api/iot', value)
          .then(function success (response) {
            alert('Success')
            scope.query()
            value.iot_id = value.temperature = value.relative_humidity = []
          }, function error (response) {
            alert(response.data.message)
            	})

      }
    scope.regis = function (valueregis) {
      	console.log(valueregis)
        $http.post('/apires/register', valueregis)
          .then(function success (response) {
            alert('Register Success')
           window.location = 'login.html'
            valueregis.name = valueregis.surname = valueregis.username = valueregis.password = []
          }, function error (response) {
            alert(response.data.message)
            	})

      }
      scope.login = function(valuelogin){
      console.log(valuelogin)
      $http. get('/apires/register' , { username : valuelogin.username ,password : valuelogin.password})
       .then(function success (response) {
       	console.log(response)
            for(var i = 0;i < response.data.length;i++){
            if(response.data[i].username === valuelogin.username && response.data[i].password === valuelogin.password ){
              window.location = 'report.html'
         
            }else  console.log('')
            }
            
            valuelogin.username = valuelogin.password = [] 
         })

    }
   	scope.query = function () {

 			$http.get('/api/iot').success(function (response) {
 				//console.log(response)
 				scope.data = response
    	

    })

 		}
 	scope.querymember = function () {

 			$http.get('/apires/register').success(function (response) {
 				console.log(response)
 				scope.data = response
    	

    })
 			
 		}
 		scope.gologin = function () {
 			window.location = 'login.html'
 		}
 		scope.gohome = function () {
 			window.location = 'index.html'
 		}
 		scope.goregis = function () {
 			window.location = 'register.html'
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
    scope.goreport = function(){
    window.location = 'register.html'
}
    scope.graphtemp = function(){
             
      console.log("chart working") 
      $http.get('/api/iot')
              .then(function success (response) {
         
                  var data = {
                              labels: [],
                              datasets: [
                                  {
                                                                
                                        label: "max",
                                        fillColor: "rgba(220,220,220,0.5)",
                                        strokeColor: "rgba(220,220,220,0.8)",
                                        highlightFill: "rgba(220,220,220,0.75)",
                                        highlightStroke: "rgba(220,220,220,1)",
                                        data: []


                                        },

                                  {
                                                    
                                      label: "min",
                                      fillColor: "rgba(151,187,205,0.5)",
                                      strokeColor: "rgba(151,187,205,0.8)",
                                      highlightFill: "rgba(151,187,205,0.75)",
                                      highlightStroke: "rgba(151,187,205,1)",
                                      data: []

                                        },

                                  {
                                        label: "avarage",
                                      fillColor: "rgba(100,187,205,0.5)",
                                      strokeColor: "rgba(100,187,205,0.8)",
                                      highlightFill: "rgba(100,187,205,0.75)",
                                      highlightStroke: "rgba(100,187,205,1)",
                                      data: []
                                                            }
                              ]
                          }

               var ctx = document.getElementById("temp_iot").getContext("2d")
        
               var myLineChart = new Chart(ctx).Bar(data);

                for(var s = 0;s<=9;s++){
                      var max = 0;
                      var sum = 0;
                      var count = 0;
                      var avg = 0;
                      for(var i =0;i<response.data.length;i++){
                          if (response.data[i].iot_id==s){

                              if(parseInt(response.data[i].temperature)> parseInt(max)) { 

                                max = response.data[i].temperature }
                                sum = sum + parseInt(response.data[i].temperature);
                                count = count + 1;
                             }
                             if(parseInt(i) == parseInt(response.data.length)-1){
                                var min = max;
                                for(var i =0;i<response.data.length;i++){
                                    if (parseInt(response.data[i].iot_id)==s){
                                         
                                        if(parseInt(response.data[i].temperature) < parseInt(min)) { min = response.data[i].temperature }
                                        
                                       }
                                }
                                 avg = sum/count;
                                console.log(min + " " + max + " " + avg)

                                 myLineChart.addData([max,min,avg],"IOT-"+s);
                             }
                      }
                      
                  }
              }, function error (response) {
                alert(response.data.message)
              }) 
      
    }
    scope.graphrelativehumidity = function(){
             
      console.log("chart working") 
      $http.get('/api/iot')
              .then(function success (response) {
         
                  var data = {
                              labels: [],
                              datasets: [
                                  {
                                                                
                                        label: "max",
                                        fillColor: "rgba(220,220,220,0.5)",
                                        strokeColor: "rgba(220,220,220,0.8)",
                                        highlightFill: "rgba(220,220,220,0.75)",
                                        highlightStroke: "rgba(220,220,220,1)",
                                        data: []


                                        },

                                  {
                                                    
                                      label: "min",
                                      fillColor: "rgba(151,187,205,0.5)",
                                      strokeColor: "rgba(151,187,205,0.8)",
                                      highlightFill: "rgba(151,187,205,0.75)",
                                      highlightStroke: "rgba(151,187,205,1)",
                                      data: []

                                        },

                                  {
                                        label: "avarage",
                                      fillColor: "rgba(100,187,205,0.5)",
                                      strokeColor: "rgba(100,187,205,0.8)",
                                      highlightFill: "rgba(100,187,205,0.75)",
                                      highlightStroke: "rgba(100,187,205,1)",
                                      data: []
                                                            }
                              ]
                          };

               var ctx = document.getElementById("relative").getContext("2d")

               var myLineChart = new Chart(ctx).Bar(data);

                for(var s = 0;s<9;s++){
                      var max = 0;
                      var sum = 0;
                      var count = 0;
                      var avg = 0;
                      for(var i =0;i<response.data.length;i++){
                          if (response.data[i].iot_id==s){

                              if(parseInt(response.data[i].relative_humidity)> parseInt(max)) { 

                                max = response.data[i].relative_humidity }
                                sum = sum + parseInt(response.data[i].relative_humidity);
                                count = count + 1;
                             }
                             if(parseInt(i) == parseInt(response.data.length)-1){
                                var min = max;
                                for(var i =0;i<response.data.length;i++){
                                    if (parseInt(response.data[i].iot_id)==s){
                                         
                                        if(parseInt(response.data[i].relative_humidity) < parseInt(min)) { min = response.data[i].relative_humidity }
                                        
                                       }
                                }
                                 avg = sum/count;
                                console.log(min + " " + max + " " + avg)

                                 myLineChart.addData([max,min,avg],"IOT-"+s);
                             }
                      }
                      
                  }
              }, function error (response) {
                alert(response.data.message)
              }) 
      
    }
})
       
