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
    // console.log(JSON.parse(body));
    callback(null, {
      latitude: JSON.parse(body).latitude,
      longitude: JSON.parse(body).longitude
    });

  });
};

/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */

//this is the request we need http://api.open-notify.org/iss-pass.json?lat=LAT&lon=LON
//when calling from indexjs the coords should be passed in using the same obj format our previous object returned
//it should pass back the array of obkects inside the response property
 

const fetchISSFlyOverTimes = function(coords, callback) {


  //this is request library callback not our (error, response etc)
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    // console.log('error:', error); // Print the error if one occurred
    // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    // console.log('body:', body); // Print the HTML for the Google homepage.
    if (error) { //this condition works
      return callback(error, null); //this is where we start to use the callback function
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching ISS Fly Over Times. Response: ${body}`), null);
      return;
    }

    // console.log("what the hell is going on")
    // const { latitude, longitude } = JSON.parse(body);

    // callback(null, { latitude, longitude });
    return callback(null, JSON.parse(body).response);
    

  });
};


module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes
};