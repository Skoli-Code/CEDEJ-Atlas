import { multiPolygon, polygon, point } from '@turf/helpers';
import circle from '@turf/circle';
import inside from '@turf/inside';

export const filterFeatures = (data, latLng)=>{
  const pt = point([ latLng.lng, latLng.lat ]);
  const result = {};
  let i;
  for(i in data){
    const set = data[i];
    const matching = set.find((f)=>{
      return f._turfObj && inside(pt, f._turfObj);
    });
    if(matching){
      result[i] = matching;
    }
  }
  return result;
}

export const turfizeGeoJSON = (data)=>{
  data.forEach(
    (feature)=>{
      const coords = feature.geometry.coordinates;
      switch(feature.geometry.type){
        case 'Polygon':
          feature._turfObj = polygon(coords);
          break;
        case 'MultiPolygon':
          feature._turfObj = multiPolygon(coords);
          break;

        case 'Point':
          const size = parseInt(feature.properties.size_);
          const radius = size * 20;
          const center = point(coords);
          const steps = 15;
          feature._turfObj = circle(center, radius, steps);
      }
    }
  );
  return data;
};


