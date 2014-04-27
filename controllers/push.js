'use strict';

var channel = require('../lib/channel'),
    redis = require('redis');

module.exports = function(server, req, res, next) {
  var publisher = redis.createClient();
  channel.pub(publisher, req.params.channel, req.params.item);
  res.send(200, 'Data pushed successfully.');
  res.end();
  return next();
};