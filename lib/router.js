/**
 * Simple router.
 */

'use strict';

var Router = function(server) {
  this.controllerPath = process.cwd() + '/controllers';
  this.server = server;
};

Router.prototype.route = function(controller) {
  var controller = require(this.controllerPath + '/' + controller),
      that = this;
  return function(req, res, next) {
    controller(that.server, req, res, next);
  };
};

module.exports = Router;