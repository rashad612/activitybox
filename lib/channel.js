/**
 * Redis utility wrapper.
 * @todo: implement authentication.
 */
// var redis = require('redis');

// wrapper.sub = function(channel, callback) {
//   this.client.on('subscribe', function(channel, count) {
//      console.log("client subscribed to " + channel + ", " + count + " total subscriptions.");
//   });

//   this.client.on('message', function(channel, message) {
//     console.log('message');
//     callback(message);
//   });
//   client.on('ready', function() {
//     client.subscribe(channel);
//   });
// };

// wrapper.pub = function(channel, message) {
//   this.client.on('ready', function() {
//     client.publish(channel, typeof message == 'object' ? JSON.stringify(message) : message);
//   });
// };
var channel = {};
channel.sub = function(subscriber, channel, callback) {
  subscriber.on('message', function(channel, message) {
    callback(message);
  });
  subscriber.subscribe(channel);
};
channel.pub = function(publisher, channel, message) {
  publisher.publish(channel, typeof message == 'object' ? JSON.stringify(message) : message);
};

module.exports = channel;