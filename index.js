/**
 * Entry file for Hack the Valley SDK
 * Author: Jun Zheng
 * License: MIT
 */

import "@babel/polyfill";
import App from './app/App';

let app = App.getInstance();

// Export a App instance
module.exports = app;

// For browsers
if (typeof window !== "undefined") {
    window.HTV = app
}
