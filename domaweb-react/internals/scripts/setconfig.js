const development = require('../../configs/development');
const staging = require('../../configs/staging');
const production = require('../../configs/production');
const freelancer = require('../../configs/freelancer');

function checkConfig(environment) {
  let mode = undefined;
  if (environment === 'development') {
    mode = development;
  } else if (environment === 'staging') {
    mode = staging;
  } else if (environment === 'production') {
    mode = production;
  } else if (environment === 'freelancer') {
    mode = freelancer;
  }
  console.log(environment);
  return mode;
}

module.exports = checkConfig;
