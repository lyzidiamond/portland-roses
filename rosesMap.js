// text for attribution
var attribution = '<a href="http://leafletjs.com/">Leaflet</a>, <a href="http://stamen.com">Stamen</a>, rose designed by Nithin Viswanathan from the <a href="http://nounproject.com">Noun Project</a>';

// initialize map, set initial center, set initial zoom
var map = L.map('roses-map').setView([45.528479,-122.670014], 12);

// define tiles, set max zoom, apply attribution, add to map
L.tileLayer('http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: attribution
}).addTo(map);

// create rose map marker
var roseIcon = L.icon({
  iconUrl: 'rose.png',
  iconSize: [45, 45]
});

// define popup text, add to each layer
function onEachFeature(feature, layer) {
  var popupContent = "<a href='" + feature.properties.tumblrUrl + "'>" + feature.properties.name + "</a>";
  layer.bindPopup(popupContent);
};

// add geojson data, apply rose map markers, apply popups, add to map
$.getJSON('./roses.geojson', function(data) {
  var geojson = L.geoJson(data, {
    pointToLayer: function (feature, latlng) {
      return L.marker(latlng, {icon: roseIcon});
    },
    onEachFeature: onEachFeature
  });
  geojson.addTo(map);
  map.fitBounds(geojson.getBounds());
});

/*

var roseTiles = L.TileLayer('http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: 'rose icon from Creative Commons - Attribution (CC BY 3.0); rose designed by Nithin Viswanathan from the Noun Project'
});

var roseIcon = L.icon({
  iconUrl: 'rose.png',
  iconSize: [90, 90]
})

var attribution = L.control.attribution({position: 'bottomright', prefix: '<a href="http://leafletjs.com/">Leaflet</a>, <a href="http://stamen.com">Stamen</a>, rose designed by Nithin Viswanathan from the <a href="http://nounproject.com">Noun Project</a>'});

$.getJSON('./roses.geojson', function(data) {
  var geojson = L.geoJson(data, {
    onEachFeature: function(feature, layer) {
      var popupText = "<a href='" + feature.properties.tumblrUrl + "'>" + feature.properties.name + "</a>";
      layer.bindPopup(popupText);
    },
    pointToLayer: function(feature, latlng) {
      return roseIcon;
    }
  });
  var map = L.map('roses-map').fitBounds(geojson.getBounds());
  roseTiles.addTo(map);
  geojson.addTo(map);
  attribution.addTo(map);
});

*/