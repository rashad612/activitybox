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

