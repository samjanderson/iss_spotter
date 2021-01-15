// iss.js
const request = require('request');

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    // console.log('error:', error); // Print the error if one occurred
    // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    // console.log('body:', body); // Print the HTML for the Google homepage.

    if (error) { //this condition works
      return callback(error, null);
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    } else {
      return callback(null, JSON.parse(body).ip);
    }
  });
};


//take in IP address return latitude and longitude
//https://freegeoip.app/json/
//In the function, make the request to the API
//and have it pass back the relevant (lat/lng) data as an object via callback.
const fetchCoordsByIP = function(ip, callback) { //we really dont need an ip here
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
    // console.log('error:', error); // Print the error if one occurred
    // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    // console.log('body:', body); // Print the HTML for the Google homepage.

    if (error) { //this condition works
      return callback(error, null);
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching Coordinates for IP. Response: ${body}`), null);
      return;
    }

    // const { latitude, longitude } = JSON.parse(body);

    // callback(null, { latitude, longitude });
    console.log(JSON.parse(body));
    callback(null, {
      latitude: JSON.parse(body).latitude,
      longitude: JSON.parse(body).longitude
    });

  });
};


module.exports = {
  fetchMyIP,
  fetchCoordsByIP
};