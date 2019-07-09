import { key } from './mapbox-key';

export class JourneyPlanner {
  // stationInformation;

  constructor() {
    this.from = undefined;
    this.to = undefined;

    this.fromBikeStation = undefined;
    this.toBikeStation = undefined;
    this.stages = [];
  }

  static fetchStations() {
    return new Promise((resolve, reject) => {
      fetch('https://gbfs.urbansharing.com/edinburghcyclehire.com/station_information.json', {
        mode: 'cors',
      })
        .then(response => response.json())
        .then(json => resolve(json))
        .catch(err => reject(err));
    });
  }

  static fetchStationsStatus() {
    return new Promise((resolve, reject) => {
      fetch('https://gbfs.urbansharing.com/edinburghcyclehire.com/station_status.json', {
        mode: 'cors',
      })
        .then(response => response.json())
        .then(json => {
          const alteredJson = json;
          const transformedStations = {};
          alteredJson.data.stations.forEach(station => {
            const id = station.station_id;
            transformedStations[id] = station;
          });

          alteredJson.data.stations = transformedStations;

          return Promise.resolve(alteredJson);
        })
        .then(json => resolve(json))
        .catch(err => reject(err));
    });
  }

  setFrom(fromPoint) {
    if (typeof fromPoint === 'string') {
      this.from = JSON.parse(fromPoint);
    } else {
      this.from = fromPoint;
    }

    return this;
  }

  setTo(toPoint) {
    if (typeof toPoint === 'string') {
      this.to = JSON.parse(toPoint);
    } else {
      this.to = toPoint;
    }

    return this;
  }

  findFromBikeStation() {
    let closestStations = this.sortStationsByDistance(this.from);
    closestStations = this.joinStationStatus(closestStations);
    closestStations = JourneyPlanner.removeUnavailable(closestStations, 'bikes');

    const index = 0;
    this.fromBikeStation = closestStations[index];

    return this;
  }

  findToBikeStation() {
    let closestStations = this.sortStationsByDistance(this.to);
    closestStations = this.joinStationStatus(closestStations);
    closestStations = JourneyPlanner.removeUnavailable(closestStations, 'docks');

    const index = 0;
    this.toBikeStation = closestStations[index];

    return this;
  }

  async build() {
    try {
      this.stationInformation = await JourneyPlanner.fetchStations();
    } catch (error) {
      // TODO
    }

    try {
      this.stationStatus = await JourneyPlanner.fetchStationsStatus();
    } catch (error) {
      // TODO
    }

    if (!this.from || !this.from) {
      throw new Error('To and From must be set');
    }

    if (!this.stationInformation || !this.stationStatus) {
      throw new Error('Station information or status is not available');
    }

    const result = await this.findFromBikeStation()
      .findToBikeStation()
      .getDirections(this.from, this.fromBikeStation, 'walking')
      .getDirections(this.fromBikeStation, this.toBikeStation, 'cycling')
      .getDirections(this.toBikeStation, this.to, 'walking');

    return Object.freeze(result);
  }

  getDirections(from, to, mode) {
    const fromStr = this.createLongLatString(from);
    const toStr = this.createLongLatString(to);

    fetch(
      `https://api.mapbox.com/directions/v5/mapbox/${mode}/${fromStr};${toStr}.json?access_token=${key}&overview=full&steps=true&banner_instructions=true`,
    )
      .then(response => response.json())
      .then(json => this.stages.push(json))
      .catch(err => {
        throw err;
      });

    return this;
  }

  static createLongLatString(point) {
    if ('coordinates' in point) {
      return point.coordinates.join(',');
    }
    if ('lat' in point && 'lon' in point) {
      return `${point.lon},${point.lat}`;
    }
    throw new Error('Could not transform points');
  }

  sortStationsByDistance(point) {
    const closestStations = this.stationInformation.data.stations
      .map(station => {
        const newStation = station;

        const pointA = {
          latitude: point.coordinates[1],
          longitude: point.coordinates[0],
        };
        const pointB = {
          latitude: station.lat,
          longitude: station.lon,
        };

        const distance = JourneyPlanner.findDistanceBetweenTwoPoints(pointA, pointB);

        newStation.distance = distance;

        return newStation;
      })
      .sort((a, b) => a.distance - b.distance);

    return closestStations;
  }

  joinStationStatus(stations) {
    const stationsWithStatus = stations.map(station => {
      const status = this.stationStatus.data.stations[station.station_id];

      return { ...status, ...station };
    });

    return stationsWithStatus;
  }

  static findDistanceBetweenTwoPoints(pointA, pointB) {
    const earthRadius = 6371;
    const latitudeDistance = this.degreesToRadians(pointB.latitude - pointA.latitude);
    const longitudeDistance = this.degreesToRadians(pointB.longitude - pointA.longitude);

    const a =
      Math.sin(latitudeDistance / 2) * Math.sin(latitudeDistance / 2) +
      Math.cos(this.degreesToRadians(pointA.latitude)) *
        Math.cos(this.degreesToRadians(pointB.latitude)) *
        Math.sin(longitudeDistance / 2) *
        Math.sin(longitudeDistance / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = earthRadius * c;
    return d;
  }

  static removeUnavailable(stations, type) {
    return stations.filter(
      station =>
        station.is_installed &&
        station.is_renting &&
        station.is_returning &&
        station[`num_${type}_available`] > 0,
    );
  }

  static degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
  }
}
