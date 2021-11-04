
import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
import * as h3 from "h3-js";
import geojson2h3 from 'geojson2h3';
const token = 'sk.eyJ1IjoiYWRhbHpheWFzIiwiYSI6ImNrdXB6ODM4aDRxbnEyem1ueGswemVqcGsifQ.b9k_LLj5GYXh5QuIJ5ALyw'

// TO MAKE THE MAP APPEAR YOU MUST
// ADD YOUR ACCESS TOKEN FROM
// https://account.mapbox.com
mapboxgl.accessToken = token;
const map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/mapbox/streets-v11', // style URL
  center: [-74.5, 40], // starting position [lng, lat]
  zoom: 9 // starting zoom
});


function renderHexes(map, hexagons) {

  // Transform the current hexagon map into a GeoJSON object
  const geojson = geojson2h3.h3SetToFeatureCollection(
    Object.keys(hexagons),
    hex => ({ value: hexagons[hex] })
  );

  const sourceId = 'h3-hexes';
  const layerId = `${sourceId}-layer`;
  let source = map.getSource(sourceId);

  // Add the source and layer if we haven't created them yet
  if (!source) {
    map.addSource(sourceId, {
      type: 'geojson',
      data: geojson
    });
    map.addLayer({
      id: layerId,
      source: sourceId,
      type: 'fill',
      interactive: false,
      paint: {
        'fill-outline-color': 'rgba(0,0,0,0)',
      }
    });
    source = map.getSource(sourceId);
  }

  // Update the geojson data
  source.setData(geojson);

  // Update the layer paint properties, using the current config values
  map.setPaintProperty(layerId, 'fill-color', {
    property: 'value',
    stops: [
      [0, config.colorScale[0]],
      [0.5, config.colorScale[1]],
      [1, config.colorScale[2]]
    ]
  });

  map.setPaintProperty(layerId, 'fill-opacity', config.fillOpacity);
}