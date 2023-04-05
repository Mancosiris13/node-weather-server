const request = require('request');

const forecast = (location, callback) => {
  const url =
    'http://api.weatherstack.com/current?access_key=50e5d6b445c0bf6148611f4dd01bf822&query=' +
    location;

  request({ url: url, json: true }, (error, response) => {
    let current = response.body.current;

    if (error) {
      callback(
        'Unable to connect to weather services, sorry for the inconvinience',
        undefined
      );
    } else if (response.body.error) {
      callback('Unable to find location', undefined);
    } else if (response) {
      callback(undefined, {
        location: response.body.location.name,
        region: response.body.location.region,
        country: response.body.location.country,
        weather_description: current.weather_descriptions[0],
        weather_icon: current.weather_icons[0],
        is_day: current.is_day,
        temperature: current.temperature,
        feelsLike: current.feelslike,
      });
    }
  });
};
module.exports = forecast;
