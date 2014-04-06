var socket = require('socket.io');
//     redis = require('./redis');

// module.exports = function(server,channel) {
//   var io = socket.listen(server);
//   io.of('/stream/' + channel).on('connection', function(socket) {
//     redis.sub(channel, function(response) {
//       try {
//         response = JSON.parse(response);
//         socket.emit('stream', response);
//       } catch (e) {
//         console.log('Response parsing error:', e);
//       }
//     });
//   });
// };
var stream = {};

stream.start = function(server, route, channel, emitter) {
  var io = socket.listen(server);
  io.of('/' + route + '/' + channel).on('connection', function(socket) {
    // @todo: a Promise maybe ?
    emitter(function(data) {
      try {
        data = JSON.parse(data);
        
      } catch (e) {
        console.log('Response parsing error, expected JSON format:', e);
      }
      socket.emit(route, data);
    });
  });
};
module.exports = stream;