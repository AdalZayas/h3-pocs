
import * as h3 from "h3-js";
import locations from "./geoJSON.json";

const h3IndexInicial = h3.geoToH3(25.835510, -97.467725, 9);
const res = 9;

const lookupMap = locations.features.reduce((map, feature) => {
  // Make a map like {[hexagon]: [id, id, ...]}
  const [lon, lat] = feature.geometry.coordinates;
  const h3Index = h3.geoToH3(lat, lon, res);
  if (!map[h3Index]) map[h3Index] = [];
  map[h3Index].push(feature);
  return map;
}, {})



function kRingResults(h3IndexInicial) {
  const lookupIndexes = GetRaidusForSearching(h3IndexInicial);
  // Find all points of interest in the k-ring
  // console.log(lookupIndexes);
  return lookupIndexes.reduce((output, h3Index) => [...output, ...(lookupMap[h3Index] || [])], []);
}

function GetRaidusForSearching(h3IndexInicial, pad = 0) {
  // Transform the radius from km to grid distance
  // //const radius = Math.floor(searchRadiusInKm / (h3.edgeLength(resolution, h3.UNITS.km) * 2)) + pad;
  const radius = Math.floor(1 / (h3.edgeLength(res, h3.UNIST.km) * 2)) + pad;
  return h3.kRing(h3IndexInicial, radius);
}

const result = kRingResults(h3IndexInicial)
console.log(result)


// console.log(result)



// -> '87283472bffffff'
// console.log('index', h3Index);

// // Get the center of the hexagon
// const hexCenterCoordinates = h3.h3ToGeo(h3Index);
// // -> [37.35171820183272, -122.05032565263946]
// // console.log('coor', hexCenterCoordinates);
// // Get the vertices of the hexagon
// const hexBoundary = h3.h3ToGeoBoundary(h3Index);
// // -> [ [37.341099093235684, -122.04156135164334 ],
//  ...]
// // console.log('bpndri', hexBoundary);

// // Transform the radius from km to grid distance

// const radius = Math.floor(5 / (h3.edgeLength(7, h3.UNITS.km) * 2)) + 0;
// const hexes = h3.kRing(h3Index, radius);

// console.log(radius);
// console.table(hexes);
// const array = Object.values(hexes)

// var dataArrr = []
// array.forEach(element => {
//   data = h3.h3ToGeo(element)
//   dataArrr.push(data)
// });

// console.log('dataArrr', dataArrr);