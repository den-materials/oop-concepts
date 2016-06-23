// define globals
var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";
var $quakesList;
var map;
var template;

function Quake(lat, lng, time){
	var milisecondsToHours = 1000 * 60 * 60;

	this.position = {lat: lat, lng: lng}
	this.timeAgo = Math.floor(((new Date()) - time)/milisecondsToHours);
	this.time = time;
	this.city;
	this.magnitude;
}

function QuakeListView(quakeArray) {
	this.quakes = quakeArray;
}

QuakeListView.prototype = {
	html: function(){
		return Handlebars.compile($('#quake-list-template').html())({quakes: this.quakes});
	}
}

function MapView(mapDiv) {
	var target = $(mapDiv)[0];

	this.map = new google.maps.Map(target, {
          center: {lat: 39.76, lng: -105.01},
          zoom: 1
        }) 
}

MapView.prototype = {
	addMarker: function(position, label) {
			var markerObject = {position: position, map: this.map};
			if (label !== undefined){
				markerObject.label = label;
			}
			return new google.maps.Marker(markerObject);
		}
}

function QuakeMapView(map, quake) {
	this.map = map;
	this.quake = quake;
}

QuakeMapView.prototype = {
	create: function() {
		this.map.addMarker(this.quake.position, String(this.quake.magnitude));														   
	}
}

function UsgsQuakeImporter() {
}

UsgsQuakeImporter.prototype = {
	run: function(data){
		function createCity(title) {
			var stringArray = title.split(' ');
			var cityArray = []
			var currentWord;
			for (var i = stringArray.length - 1; i > 0; i --){
				currentWord = stringArray[i] 
				if (currentWord === '-' || currentWord === 'of'){
					break;
				}
				cityArray.unshift(currentWord)
			}
			return cityArray.join(' ')
		}

		return data.features.map(function(quake){
			var currentQuake = new Quake(quake.geometry.coordinates[1], 
										 quake.geometry.coordinates[0], 
										 quake.properties.time);
			currentQuake.city = createCity(quake.properties.title);
			currentQuake.magnitude = quake.properties.mag
			return currentQuake;
		});
	}	
}


$(document).on("ready", function() {
	var myMap = new MapView('#map')
	var importer = new UsgsQuakeImporter();

	$.get(weekly_quakes_endpoint, function(data){
		var quakeList = importer.run(data);
		var quakeViews = new QuakeListView(quakeList);
		$('#info').append(quakeViews.html()) 
		quakeList.forEach(function(quake){
			(new QuakeMapView(myMap, quake)).create()
		});
	}) 
});
