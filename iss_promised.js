const request = require('request-promise-native');

//This function should only have one line of code: fetch the IP address from the API
// using the request function, and return the promise that is returned by request.
//request when called returns a promise and we want out function to return the same promise
const fetchMyIP = function () {
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIP = function (body) {
  let ip = JSON.parse(body).ip;
  return request(`https://freegeoip.app/json/${ip}`);
}

const fetchISSFlyOverTimes = function (body) {
  const { latitude, longitude } = JSON.parse(body)
  const url = `http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`;
  return request(url);
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
};

module.exports = { nextISSTimesForMyLocation };




