import { key } from './mapbox-key';

export class MapboxGeocoder {
  static findCoordinates(query) {
    if (query.length > 3) {
      fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${key}&country=GB&bbox=-3.3314549451,55.8874637972,-3.0552120062,55.990870191&limit=10&type=address`,
      )
        .then(res => res.json())
        .then(result => result);
    }
  }
}
