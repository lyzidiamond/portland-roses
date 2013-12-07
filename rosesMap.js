// text for attribution
var attribution = 'map tiles from <a href="http://stamen.com">Stamen</a>, rose designed by Nithin Viswanathan from the <a href="http://nounproject.com">Noun Project</a>';

// initialize map, set initial center, set initial zoom
var map = L.map('roses-map').setView([45.528479,-122.670014], 12);

// define tiles, set max zoom, apply attribution, add to map
L.tileLayer('http://{s}.tile.stamen.com/toner-lite/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: attribution
}).addTo(map);

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

// add geojson data, apply rose map markers, apply popups, add to map
$.getJSON('./geojson/rosesPDX.geojson', function(data) {
  var geojson = L.geoJson(data, {
    pointToLayer: function (feature, latlng) {
      return L.marker(latlng, {icon: roseIcon});
    },
    onEachFeature: onEachFeature
  });
  // add geojson to map
  geojson.addTo(map);
  // set map bounds to data
  map.fitBounds(geojson.getBounds());
});