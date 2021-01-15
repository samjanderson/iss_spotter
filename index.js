// index.js

// const { fetchMyIP } = require('./iss');
// const { fetchCoordsByIP } = require('./iss');

// // fetchMyIP((error, ip) => {
// //   if (error) {
// //     console.log("It didn't work!" , error);
// //     return;
// //   }

// //   console.log('It worked! Returned IP:' , ip);
// // });

// // let ip = "24.86.139.122"


// fetchCoordsByIP('162.245.144.188', (error, coordinates) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log('It worked! Returned coordinates:', coordinates);
// });


// fetchCoordsByIP('162.245.144.188', (error, coordinates) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log('It worked! Returned coordinates:', coordinates);
// });

// const { fetchISSFlyOverTimes } = require('./iss');
// //at this point getting the function in 79 but its just sitting there
// const exampleCoords = { latitude: '49.27670', longitude: '-123.13000' };

// //this is where we first call the function, just something being save in memory
// fetchISSFlyOverTimes(exampleCoords, (error, passTimes) => {
//   // console.log(error) here it starts looking over to line 80
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log('It worked! Returned pass over times:', passTimes);
// });

//it is in memory in line 42, computer already knows its there

//fetchISSFlyOverTimes(a, b)

//so we wrote the function in iss.js but we call it index after requiring it
//so we have our anonymous callback function as an argument
//function runs goes through when a condition matches bam it calls the callback
//the callback needs two paramets so we pass it the two parameters to be able to finish

const { nextISSTimesForMyLocation } = require('./iss');

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes);
});