const h3 = require('h3-js')
const fs = require('fs');
const geojson2h3 = require('geojson2h3')
const geoJSON = require('./data.json')
const agebs = geoJSON
const indexedPolygon = geojson2h3.featureToH3Set(agebs, 9)


const boundry = indexedPolygon.map((h) => {
  return h3.h3ToGeoBoundary(h, true)
})

var data = boundry.map(array => {
  return {
    type: 'Feature',
    properties: { ...agebs.features[0].properties },
    geometry: {
      type: 'Polygon',
      coordinates: [coord]
    }
  }
})

let json = JSON.stringify({
  "type": "FeatureCollection",
  "features": data
}
)
fs.writeFileSync('./data5.json', json)



