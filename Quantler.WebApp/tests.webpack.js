Function.prototype.bind = require("function-bind")

var Polyfills = require('babel-polyfill')
var GlobalPolyfills = require('./App/Functions/Utils/GlobalPolyfills.js')

var context = require.context('./App', true, /__.*\.js(x)?$/);
context.keys().forEach(context);
