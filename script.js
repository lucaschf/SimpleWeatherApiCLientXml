var latitude;
var longitude;

let openweaterApiKey = "YOUR_KEY_HERE";

function fetchData() {

  inProgress(true);

	var cityName = $( "#inputCity").val();
 	$("#inputCity").val("");
  	$("#map").html("");

	$.ajax({
      type: 'GET',
      url: "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=metric&&mode=xml&APPID=" + openweaterApiKey,
        success: function(response) {  

          	let city = response.getElementsByTagName('city')[0];  
          	let temp = response.getElementsByTagName('temperature')[0];
          	let sun = response.getElementsByTagName('sun')[0];
          	let coord = response.getElementsByTagName('coord')[0]; 
          	let weather = response.getElementsByTagName('weather')[0];

          	let rise = new Date(new Date(sun.getAttribute('rise') + "+0000"));            
          	let set = new Date(new Date(sun.getAttribute('set') + "+0000"));


			var icon = "http://openweathermap.org/img/w/" + weather.getAttribute('icon') + ".png";
			var table = $("<table class='table'><tr><th>" + city.getAttribute('name') +
        		" <img src='" +  icon + "' alt='Weather icon'></div></th></tr>");

	  		table.append("<tr><td>City:</td><td>" + city.getAttribute('name') + "</td></tr>");
	        table.append("<tr><td>Current Temperature:</td><td>" + temp.getAttribute('value') + "°C</td></tr>");
	        table.append("<tr><td>Maximum Temperature:</td><td>" + temp.getAttribute('max') + "°C</td></tr>");
	        table.append("<tr><td>Minimum Temperature:</td><td>" + temp.getAttribute('min') + "°C</td></tr>");
	        table.append("<tr><td>sunrise:</td><td>" + getTimeOfDay(rise) + "</td></tr>");
	        table.append("<tr><td>sunset:</td><td>" + getTimeOfDay(set) + "</td></tr>");
	        table.append("<tr><td>Latitude:</td><td>" + coord.getAttribute('lat') + "</td></tr>");
	        table.append("<tr><td>Longitude:</td><td>" + coord.getAttribute('lon') + "</td></tr>");
	    
	        $("#result").html(table);
	        //	        
	        inProgress(false);
      	},
      	error: function (xhr, status, error) {
      		inProgress(false);
        	alert("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText)
      }
    });
}

function inProgress(inProgress){
    if(inProgress){
      $("#result").html('');
      $("#progress").show();
      $("#btnFetch").hide();     
    }
    else{
      $("#btnFetch").show();
      $("#progress").hide();
    }
}

function getTimeOfDay(date){
	var hours = ("0" + date.getHours()).slice(-2);
	var minutes = ("0" + date.getMinutes()).slice(-2);

	return hours + ":" + minutes;
}

let map;

function initMap(latitude, longitude, city) {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: Number(latitude), lng: Number(longitude) },
    zoom: 8,
  });

  let coord = new google.maps.LatLng(latitude, longitude);
  marker = new google.maps.Marker({
    position: coord, 
    map: map,
    title: city
  });
}



      
