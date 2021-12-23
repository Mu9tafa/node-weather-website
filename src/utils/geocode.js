const request = require("postman-request");

const geocode = (address, callback) => {
   const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      address
   )}.json?access_token=pk.eyJ1IjoibXVzdGFmYTgwNSIsImEiOiJja3gwbjFxYXYxOTVnMm51cmluemt0b3VkIn0.bmjVg5-a44kBRGkrctIeWQ&limit=1`;

   request({ url, json: true }, (error, response) => {
      if (error) {
         callback("Unable to connect to the internet", undefined);
      } else if (response.body.features.length === 0) {
         callback(
            "Unable to find the location. try another search.",
            undefined
         );
      } else {
         callback(undefined, {
            long: response.body.features[0].center[0],
            lat: response.body.features[0].center[1],
            location: response.body.features[0].place_name,
         });
      }
   });
};

module.exports = geocode;
