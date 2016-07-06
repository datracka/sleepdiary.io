// Angular-CLI server configuration
// Unrelated to environment.dev|prod.ts

/* jshint node: true */

/* more: http://stackoverflow.com/questions/30030031/passing-environment-dependent-variables-in-webpack */

module.exports = function() {
  return {
    environment: 'dev',
    baseUrl: 'http://localhost:8080',
    fakeBaseUrl : 'http://localhost:8081',
    apiPath: '',
    locationType: 'auto'
  };
};