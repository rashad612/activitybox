'use strict';

var expect = require('chai').expect,
    redis = require('redis-mock'),
    channel = require('../lib/channel');

describe('pubsub channel', function() {
  var channel, publisher, subscriber;
  before(function(done) {
    channel = 'my-channel';
    publisher = redis.createClient();
    
    publisher.on('ready', function() {
      subscriber = redis.createClient();
      subscriber.on('ready', function() {
        done();
      });
    });
  });

  after(function() {
    channel = null;
    publisher.end();
    subscriber.end();
  });

  it('should allow client to subscribe to channel', function(done) {
    subscriber.on('subscribe', function(channelName) {
      console.log('subscribe');
      expect('').to.equal(channel);
      done();
    });
    channel.sub(subscriber, channel);
  });

  // it('should allow subscribers to receive published messages', function(done) {
  //   var message = 'test';
  //   var spy = sinon.spy();

  //   channel.sub(subscriber, 'my-channel', spy);
  //   channel.pub(publisher, 'my-channel', 'test');
  //   console.log(spy.calledWith(message));
  //   // expect(spy.calledWith(message)).to.be.ok();
  // });
});