// text for attribution
var attribution = 'map tiles from <a href="http://stamen.com">MapBox</a>, rose designed by Nithin Viswanathan from the <a href="http://nounproject.com">Noun Project</a>';

// initialize map, set initial center, set initial zoom
// var map = L.map('roses-map').setView([45.528479,-122.670014], 12);

var map = L.mapbox.map('roses-map', 'lyzidiamond.ggi4654c').setView([45.528479,-122.670014], 12);

// define tiles, set max zoom, apply attribution, add to map
/* L.tileLayer('http://{s}.tiles.stamen.com/toner/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: attribution
}).addTo(map); */

// create rose map marker
var roseIcon = L.icon({
  iconUrl: './images/rose.png',
  iconSize: [25, 25]
});

// define popup text, add to each layer
function onEachFeature(feature, layer) {
  var popupContent = "<a href='" + feature.properties.tumblrUrl + "' target='_blank'>" + feature.properties.name + "</a>";
  layer.bindPopup(popupContent);
};

// define callback function for getJSON

/* function addDataToMap(result) {
  var geojson = L.geoJson(result, {
    pointToLayer: function (feature, latlng) {
      return L.marker(latlng, {icon: roseIcon});
    },
    onEachFeature: onEachFeature
  });
  console.log(geojson);
  geojson.addTo(map);
  map.fitBounds(geojson.getBounds());
}; */

// add geojson data, apply rose map markers, apply popups, add to map
/* $.getJSON('./geojson/rosesPDX.geojson', function(data) {
  var geojson = L.geoJson(data, {
    pointToLayer: function (feature, latlng) {
      return L.marker(latlng, {icon: roseIcon});
    },
    onEachFeature: onEachFeature
  });
  console.log(geojson);
  // add geojson to map
  geojson.addTo(map);
  // set map bounds to data
  map.fitBounds(geojson.getBounds());
});
*/

var markers = L.markerClusterGroup();

// default clustering
$.getJSON('./geojson/rosesPDX.geojson', function(data) {
  var features = data.features;
  console.log(features);

  for (var i = 0; i < features.length; i++) {
    var a = features[i];
    var popupContent = "<a href='" + features[i].properties.tumblrUrl + "' target='_blank'>" + features[i].properties.name + "</a>";
    var coordinates = new L.LatLng(features[i].geometry.coordinates[0], features[i].geometry.coordinates[1]);
    var marker = L.marker(coordinates, { title: popupContent });
    marker.bindPopup(popupContent);
    markers.addLayer(marker);

  }

  map.addLayer(markers);
  map.fitBounds(markers.getBounds());

});