'use strict';

var socket = require('socket.io');

var stream = {};

stream.vars = {
  io: null,
  path: null
};

stream.start = function(server, route, channel) {
  var io = stream.vars.io = socket.listen(server);
  stream.vars.path = route + '/' + channel;

  io.of('/' + stream.vars.path).on('connection', function(socket))
  // io.of('/' + route + '/' + channel).on('connection', function(socket) {
  //   if (typeof emitter == 'function') {
  //     // @todo: a Promise maybe ?
  //     emitter(function(data) {
  //       try {
  //         data = JSON.parse(data);
  //       } catch (e) {
  //         console.log('Response parsing error, expected JSON format:', e);
  //       }
  //       socket.emit(route, data);
  //     });
  //   }
  // });
};

stream.emit = function(data) {
  try {
    data = JSON.parse(data);
  } catch (e) {
    console.log('Response parsing error, expected JSON format:', e);
  }
  stream.vars.io.of('/' + stream.vars.path).emit(data);
};

module.exports = stream;
