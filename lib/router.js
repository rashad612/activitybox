/**
 * Simple router.
 */

'use strict';
var path = require('path'),
    fs = require('fs');

var Router = function(server, rootDir) {
  this.server = server;
  this.rootDir = path.resolve(rootDir);
};

Router.prototype.dispatch = function(controllerName) {
  var controller,
      that = this;

  try {
    controller = require(this.rootDir + '/' + controllerName);
  } catch (e) {
    controller = function(server, req, res, next) {
      res.send(404, 'Page not found');
      res.end();
      return next();
    };
  }

  return function(req, res, next) {
    controller(that.server, req, res, next);
  };
};

module.exports = Router;