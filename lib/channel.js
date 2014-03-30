/**
 * Redis utility wrapper.
 * @todo: implement authentication.
 */
var channel = {};

channel.sub = function(subscriber, channel, onSubscribe, onMesage) {
  if (typeof onSubscribe == 'function') {
    subscriber.on('subscribe', function(channel) {
      onSubscribe(channel);
    });
  }
  if (typeof onMesage == 'function') {
    subscriber.on('message', function(channel, message) {
      onMesage(message);
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