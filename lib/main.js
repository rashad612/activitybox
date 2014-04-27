// var restify = require('restify'),
//     config = require('./config'),
//     Router = require('./lib/router'),
//     stream = require('./lib/stream');

// // Configure REST server.
// var server = restify.createServer({name: config.server.name});
// server.use(restify.bodyParser({ mapParams: true }));
// // server.use(
// //   function crossOrigin(req,res,next){
// //     res.header("Access-Control-Allow-Origin", "*");
// //     res.header("Access-Control-Allow-Headers", "X-Requested-With");
// //     return next();
// //   }
// // );

// // socket.io stream
// stream(server, config.redis.channel);

// // Route API calls.
// var router = new Router(server);
// server.post('/push', router.route('push'));

// // Listen!
// server.listen(process.env.PORT || config.server.port, function() {
//   console.log('%s listening at %s', server.name, server.url);
// });

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
  var subscriber = redis.createClient();

  channel.sub(subscriber, config.get('redis:channel'), false, function(message) {
    console.log(message);
    var emitter = function(cb) {
      cb(message);
    };
    stream.start(server, config.get('server:streamURI'), config.get('redis:channel'), emitter);
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
  // delete main.vars.server;
};
module.exports = main;