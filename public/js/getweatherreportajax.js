


$(document).ready(()=>{
    var long="";
    var lat ="";

    function getlocation(){
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(((position)=>{
                $.ajax({
                    url:"/home/getweather",
                    type:"GET",
                    data: {
                        lat:position.coords.latitude,
                        long:position.coords.longitude
                    },
                    success:function(response){
                        console.log("response received is");
                        $("#area").html(response.name);
                        $("#temperature").html(response.main.temp);
                        $("#humidity").html(response.main.humidity);
                        $("#pressure").html(response.main.pressure);
                    }
                })
            }));
            
        }else{
            console.log("geolocation cannot be tracked");
        }
    }

    $("#getweatherreport").click(function(){
        getlocation();
    });

});