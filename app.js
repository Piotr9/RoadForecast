var APPID = "de8fcdc465a2cd2541042bfc41ff3b7d";
var temp;
var loc;
var icon;
var humidity;
var wind;
var direction;
var city0 = "London";

function updateByZip(city0) {
    var url = "http://api.openweathermap.org/data/2.5/forecast?" + "q=" + city0 + "&APPID=" + APPID;
    sendRequest(url);
}

function sendRequest(url) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
            var data = JSON.parse(xmlhttp.responseText);
            var weather = {};
            weather.icon = data.list[0].weather[0].id;
            weather.humidity = data.list[0].main.humidity;
            weather.wind = data.list[0].wind.speed;
            /* NEW */
            weather.direction = degreesToDirection(data.list[0].wind.deg)
            weather.loc = data.city.name;
            weather.temp = K2C(data.list[0].main.temp);
            
            update(weather);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function update(weather) {
    wind.innerHTML = weather.wind;
    direction.innerHTML = weather.direction;
    humidity.innerHTML = weather.humidity;
    loc.innerHTML = weather.loc;
    temp.innerHTML = weather.temp;
    icon.src = "img/codes/" + weather.icon + ".png";
}

window.onload = function () {
    temp = document.getElementById("temperature");
    loc = document.getElementById("location");
    icon = document.getElementById("icon");
    humidity = document.getElementById("humidity");
    wind = document.getElementById("wind");
    direction = document.getElementById("direction");

    updateByZip(city0);
}

///////////////////////// Replace function
$(document).ready(function(){
    $("#btnPlus").click(function(){
        $("#lastLabel").before("<input type='text' id='lname' name='lastname' placeholder='Choose your destination..'>");
    });
});

$(document).ready(function(){
  $('form').on('submit', function(e){
    e.preventDefault();
    $("#formDiv").css("display","none");
    $(".weatherApp").css("display","block");
      
      //Submit value from input
    var city0 = this.querySelector('#city00').value;
    var cityLast = this.querySelector('#cityLast').value;
  });
});
/*
$( "button" ).click(function() {
  $( this ).replaceWith( "<div>" + $( this ).text() + "</div>" );
});*/

function degreesToDirection(degrees){
    var range = 360/16;
    var low = 360 - range/2;
    var high = (low + range) % 360;
    var angles = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    for( i in angles ) {
	if(degrees >= low && degrees < high){
	    console.log(angles[i]);
	    return angles[i];
	    console.log("derp");
	}
	low = (low + range) % 360;
	high = (high + range) % 360;
    }
    return "N";
    
}

function K2C(k){
    return Math.round(k - 273.15);
}