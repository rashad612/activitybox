'use strict';

var restify = require('restify'),
    redis = require('redis'),
    config = require('./configUtil'),
    Router = require('./router'),
    channel = require('./channel'),
    stream = require('./stream');

var main = {};

main.vars = {};

main.run = function(configFile) {
  configFile = configFile || 'config.json';
  config.init(configFile);

  // Configure server.
  var server = main.vars.server = restify.createServer({name: config.get('server:name')});
  server.use(restify.bodyParser({mapParams: true}));

  // Bind subscription to stream.
  stream(server, config.get('server:streamURI'), config.get('redis:channel'), function(next) {
    var subscriber = redis.createClient();
    channel.sub(subscriber, config.get('redis:channel'), false, function(message) {
      next(message);
    });
  });
  
  // Route API calls.
  var router = main.vars.router = new Router(server, 'controllers');
  server.post('/push', router.dispatch('push'));

  // Listen!
  server.listen(process.env.PORT || config.get('server:port'), function() {
    console.log('%s listening at %s', server.name, server.url);
  });
};

main.stop = function() {
  main.vars.server.close();
  delete main.vars.server;
};
module.exports = main;