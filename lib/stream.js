var socket = require('socket.io');

var stream = {};

stream.start = function(server, route, channel, emitter) {
  var io = socket.listen(server);
  io.of('/' + route + '/' + channel).on('connection', function(socket) {
    if (typeof emitter == 'function') {
      // @todo: a Promise maybe ?
      emitter(function(data) {
        try {
          data = JSON.parse(data);
        } catch (e) {
          console.log('Response parsing error, expected JSON format:', e);
        }
        socket.emit(route, data);
      });
    }
  });
};
module.exports = stream;
