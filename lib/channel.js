/**
 * Redis utility wrapper.
 * @todo: implement authentication.
 */
'use strict';

var channel = {};

channel.sub = function(subscriber, channel, onSubscribe, onMessage) {
  if (typeof onSubscribe == 'function') {
    subscriber.on('subscribe', function(channel) {
      onSubscribe(channel);
    });
  }
  if (typeof onMessage == 'function') {
    subscriber.on('message', function(channel, message) {
      onMessage(message);
    });
  }
  subscriber.subscribe(channel);
};

channel.unsub = function(subscriber, channel, onUnsubscribe) {
  if (typeof onUnsubscribe == 'function') {
    subscriber.on('unsubscribe', function(channel) {
      onUnsubscribe(channel);
    });
  }
  subscriber.unsubscribe(channel);
};

channel.pub = function(publisher, channel, message) {
  publisher.publish(channel, typeof message == 'object' ? JSON.stringify(message) : message);
};

module.exports = channel;