'use strict';

var expect = require('chai').expect,
    redis = require('redis-mock'),
    channel = require('../lib/channel');

describe('pubsub channel', function() {
  var channelName, publisher, subscriber;

  before(function() {
    channelName = 'my-channel';
  });

  after(function() {
    channelName = null;
  });
  
  beforeEach(function(done) {
    
    publisher = redis.createClient();
    
    publisher.on('ready', function() {
      subscriber = redis.createClient();
      subscriber.on('ready', function() {
        done();
      });
    });
  });

  afterEach(function() {
    
    publisher.end();
    subscriber.end();
  });

  it('should allow client to subscribe to channel', function(done) {
    var callback = function(ch) {
      expect(ch).to.equal(channelName);
      done();
    };

    channel.sub(subscriber, channelName, callback);
  });

  it('should allow client to unsubscribe from channel', function(done) {
    var callback = function(ch) {
      expect(ch).to.equal(channelName);
      done();
    };
    channel.unsub(subscriber, channelName, callback);
  });

  it('should allow subscribers to receive published messages', function(done) {
    var message = 'test';
    
    var callback = function(msg) {
      expect(msg).to.equal(message);
      done();
    };

    channel.sub(subscriber, channelName, false, callback);
    channel.pub(publisher, channelName, 'test');
  });
});