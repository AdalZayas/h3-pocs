const h3 = require('h3-js')
const fs = require('fs');
const geojson2h3 = require('geojson2h3')
const geoJSON = require('./data.json')
const point = geoJSON

const h3index = h3.geoToH3(point.geometry.coordinates[1], point.geometry.coordinates[0], 9)

const centroid = h3.h3ToGeo(h3index)
console.log(centroid)


const boundry = h3.h3ToGeoBoundary(h3index, true)

var data = [{
  type: 'Feature',
  properties: {
    "stroke": "#00ff11",
    "stroke-width": 2,
    "stroke-opacity": 1,
    "fill": "#00ff2a",
    "fill-opacity": 0.5
  },
  geometry: {
    type: 'Polygon',
    coordinates: [boundry]
  }
},
{
  "type": "Feature",
  "properties": {
    "marker-color": "#f500ed",
    "marker-size": "large",
    "marker-symbol": "circle"
  },
  "geometry": {
    "type": "Point",
    "coordinates": centroid.reverse()
  }
}
]



let json = JSON.stringify(data)
fs.writeFileSync('./data5.json', json)



