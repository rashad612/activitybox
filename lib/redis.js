/**
 * Redis utility wrapper.
 * @todo: implement authentication.
 */
var redis = require('redis');

var wrapper = {};

wrapper.sub = function(channel, callback) {
  var client = redis.createClient();
  
  client.on('subscribe', function(channel, count) {
     console.log("client subscribed to " + channel + ", " + count + " total subscriptions.");
  });

  client.on('message', function(channel, message) {
    console.log('message');
    callback(message);
  });
  client.on('ready', function() {
    client.subscribe(channel);
  });
};

wrapper.pub = function(channel, message) {
  var client = redis.createClient();
  client.on('ready', function() {
    client.publish(channel, typeof message == 'object' ? JSON.stringify(message) : message);
  });
};

module.exports = wrapper;