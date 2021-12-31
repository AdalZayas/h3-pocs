const h3 = require('h3-js')
const fs = require('fs');
const geojson2h3 = require('geojson2h3')


const h3s = ['87498c96effffff',
  '87498c963ffffff',
  '87498c945ffffff',
  '87498c96affffff',
  '87498c968ffffff',
  '87498c96cffffff',
  '87498c961ffffff',
  '87498c960ffffff',
  '87498c962ffffff',
  '87498c944ffffff',
  '87498c940ffffff',
  '87498c941ffffff',
  '87498c94cffffff',
  '87498c96bffffff',
  '87498c969ffffff',
  '87498c96dffffff',
  '8749ab593ffffff',
  '8749ab592ffffff',
  '87498c965ffffff',]

const geoJson = geojson2h3.h3SetToFeatureCollection(h3s)

console.log(geoJson)

fs.writeFileSync('./data1.json', JSON.stringify(geoJson))