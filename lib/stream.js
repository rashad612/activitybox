var socket = require('socket.io'),
    redis = require('./redis');

module.exports = function(server,channel) {
  var io = socket.listen(server);
  io.of('/stream/' + channel).on('connection', function(socket) {
    redis.sub(channel, function(response) {
      try {
        response = JSON.parse(response);
        socket.emit('stream', response);
      } catch (e) {
        console.log('Response parsing error:', e);
      }
    });
  });
};