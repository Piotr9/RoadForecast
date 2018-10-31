var APPID = "de8fcdc465a2cd2541042bfc41ff3b7d";
var temp;
var loc;
var icon;
var humidity;
var wind;
var direction;
var city0, city1, city2, city3, city4, city5, city6 = "London";
var n = 2;
var i = 0;
var f6 = true;
var f1, f2, f3, f4, f5 = false;

function updateByName(city0) {
    var url = "http://api.openweathermap.org/data/2.5/forecast?" + "q=" + city0 + "&APPID=" + APPID;
    sendRequest(url);
}                               //Update forecast data

function sendRequest(url) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
            var data = JSON.parse(xmlhttp.responseText);
            var weather = {};
            weather.icon = data.list[0].weather[0].id;
            weather.humidity = data.list[0].main.humidity;
            weather.wind = milesToKilometers(data.list[0].wind.speed);
            /* NEW */
            weather.direction = degreesToDirection(data.list[0].wind.deg)
            weather.loc = data.city.name;
            weather.temp = kelvinToCelsius(data.list[0].main.temp);
            
            update(weather);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}                                                                   //Send AJAX request

function update(weather) {
    wind.innerHTML = weather.wind;
    direction.innerHTML = weather.direction;
    humidity.innerHTML = weather.humidity;
    loc.innerHTML = weather.loc;
    temp.innerHTML = weather.temp;
    icon.src = "img/codes/" + weather.icon + ".png";
    
    if(f6==true){
        f6=false;
        start6(city6);
        f1=true;
    }
    else if(f1==true){
        f1=false;
        start1(city1);
        f2=true;
    }
    else if(f2==true){
        f2=false;
        start2(city2);
        f3=true;
    }
    else if(f3==true){
        f3=false;
        start3(city3);
        f4=true;
    }
    else if(f4==true){
        f4=false;
        start4(city4);
        f5=true;
    }
    else if(f5==true){
        f5=false;
        start5(city5);
        f6=true;
    }
}                                    //Update data on website. Take element and replace to data from request.

function start(city0) {
    temp = document.getElementById("temperature");
    loc = document.getElementById("location");
    icon = document.getElementById("icon");
    humidity = document.getElementById("humidity");
    wind = document.getElementById("wind");
    direction = document.getElementById("direction");

    updateByName(city0);
}
function start1(city0) {
    temp = document.getElementById("temperature1");
    loc = document.getElementById("location1");
    icon = document.getElementById("icon1");
    humidity = document.getElementById("humidity1");
    wind = document.getElementById("wind1");
    direction = document.getElementById("direction1");

    updateByName(city0);
}
function start2(city0) {
    temp = document.getElementById("temperature2");
    loc = document.getElementById("location2");
    icon = document.getElementById("icon2");
    humidity = document.getElementById("humidity2");
    wind = document.getElementById("wind2");
    direction = document.getElementById("direction2");

    updateByName(city0);
}
function start3(city0) {
    temp = document.getElementById("temperature3");
    loc = document.getElementById("location3");
    icon = document.getElementById("icon3");
    humidity = document.getElementById("humidity3");
    wind = document.getElementById("wind3");
    direction = document.getElementById("direction3");

    updateByName(city0);
}
function start4(city0) {
    temp = document.getElementById("temperature4");
    loc = document.getElementById("location4");
    icon = document.getElementById("icon4");
    humidity = document.getElementById("humidity4");
    wind = document.getElementById("wind4");
    direction = document.getElementById("direction4");

    updateByName(city0);
}
function start5(city0) {
    temp = document.getElementById("temperature5");
    loc = document.getElementById("location5");
    icon = document.getElementById("icon5");
    humidity = document.getElementById("humidity5");
    wind = document.getElementById("wind5");
    direction = document.getElementById("direction5");

    updateByName(city0);
}
function start6(city0) {
    temp = document.getElementById("temperature6");
    loc = document.getElementById("location6");
    icon = document.getElementById("icon6");
    humidity = document.getElementById("humidity6");
    wind = document.getElementById("wind6");
    direction = document.getElementById("direction6");

    updateByName(city0);
}

///////////////////////// Replace function
$(document).ready(function(){
  $('form').on('submit', function(e){
    e.preventDefault();
    $("#formDiv").css("display","none");
    $("#wApp0, #wApp6").css("display","inline-block");
      
      //Submit value from input
    city0 = this.querySelector('#city0').value;
    city6 = this.querySelector('#city6').value;
    if(n>2){
        city1 = this.querySelector('#city1').value;
        $("#wApp1").css("display","inline-block");
        if(n>3){  
            city2 = this.querySelector('#city2').value;
            $("#wApp2").css("display","inline-block");
            if(n>4){
                city3 = this.querySelector('#city3').value;
                $("#wApp3").css("display","inline-block");
                if(n>5){
                    city4 = this.querySelector('#city4').value;
                    $("#wApp4").css("display","inline-block");
                    if(n>6){
                        city5 = this.querySelector('#city5').value;                $("#wApp5").css("display","inline-block");
                    }
                }
            }
        }
    }
    start(city0);
  });
});

$(document).ready(function(){
    $("#btnPlus").click(function(){
        var correctCityName = "city"+(n-1);
        $("#lastLabel").before("<input type='text' id='"+correctCityName+"' name='lastname' placeholder='Choose your destination..'>"); 
        n++;
        if (n>6){
            $("#btnPlus").css("display","none");
        }                       //if it's 7 inputs on the screen -> plus button disappears
    });
});

function degreesToDirection(degrees){
    var range = 360/16;
    var low = 360 - range/2;
    var high = (low + range) % 360;
    var angles = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    for( i in angles ) {
	if(degrees >= low && degrees < high){
	    return angles[i];
	    console.log("derp");
	}
	low = (low + range) % 360;
	high = (high + range) % 360;
    }
    return "N";
    
}           //Change degrees to direction shortcut (eg."NNW")

function kelvinToCelsius(k){
    return Math.round(k - 273.15);
}                                //Change kelvin to celsius
function milesToKilometers(m){
    return Math.round(m/1.609344*10)/10;
}                               //Change mile to km
