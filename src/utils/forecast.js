const request = require("postman-request");

const forecast = (lat, long, callback) => {
   const url = `http://api.weatherstack.com/current?access_key=1a24c9d6ccb8e110dddacaef16af96ea&query=${lat},${long}&units=f`;
   request({ url, json: true }, (error, response, body) => {
      if (error) {
         callback("Unable to connect to the internet", undefined);
      } else if (body.error) {
         callback(body.error.info, undefined);
      } else {
         callback(undefined, body);
      }
   });
};
module.exports = forecast;
