/* eslint-disable */

const locations = JSON.parse(document.getElementById('map').dataset.locations);
console.log(locations);

mapboxgl.accessToken =
  'pk.eyJ1IjoiYnJpYW5tdWpqdW5pIiwiYSI6ImNsbXZzMWN5OTBxbjYybHZ6eWx6MnJqZTcifQ.WMCkca6iYkEhKm7uPsl0Cw';

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
});
