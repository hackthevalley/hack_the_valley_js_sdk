/**
 * Entry file for Hack the Valley SDK
 * Author: Jun Zheng
 * License: MIT
 */

const App = require('./app/App');

let app = new App();
// Export a App instance
module.exports = app;

// For browsers
if(typeof window !== "undefined"){
    window.HTV = app
}
