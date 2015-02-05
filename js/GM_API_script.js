var map;
var calculatedDistance;
var directionsService = new google.maps.DirectionsService();
var directionsRenderer = new google.maps.DirectionsRenderer();


function initialize() {
  var mapOptions = {
    center: new google.maps.LatLng(55.519510, 28.569209),
    zoom: 7,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  map = new google.maps.Map(document.getElementById("map-canvas"),mapOptions);
  directionsRenderer.setMap(map);
}

function displayDirection(_) {
	var start = document.getElementById("origin").value;
	var end = document.getElementById("destination").value;
	var directionsRequest = {
	origin: start,
	destination: end,
	travelMode: google.maps.TravelMode.DRIVING,
	unitSystem: google.maps.UnitSystem.METRIC
	};

	directionsService.route(directionsRequest, function(result, status) {
		if (status == google.maps.DirectionsStatus.OK) {
			 directionsRenderer.setDirections(result);
			 var route = result.routes[0];
			 var distanceDisplay = document.getElementById("calculated-distance");
			 distanceDisplay.innerHTML = " ";
			 distanceDisplay.innerHTML = route.legs[0].distance.text;
			 calculatedDistance = route.legs[0].distance.value; // значение в метрах
			 return calculatedDistance;
		}
		_(); // заработало, но как? http://jsfiddle.net/4suou1ok/3/
	});
}
// разобраться с областью видимости переменной calculatedDistance
function calculateCost() {
	var costPerKm = 1; // цена в $ за 1 км
	var cost = costPerKm * Math.round(calculatedDistance/1000);
	var costDisplay = document.getElementById("cost");
	costDisplay.innerHTML = " ";
	costDisplay.innerHTML = cost;
	console.log("test");
	console.log(calculatedDistance);
}