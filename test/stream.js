var expect = require('chai').expect,
    restify = require('restify'),
    io = require('socket.io-client'),
    stream = require('../lib/stream');

describe('stream', function() {
  var channelName = 'my-channel',
    route = 'test',
    port = 9000,
    socketURL = 'http://localhost:' + port + '/' + route + '/' + channelName,
    fakeServer,
    client;
    // emitter,
  
  before(function() {
    fakeServer = restify.createServer();
    fakeServer.listen(port);
    client = io.connect(socketURL);
  });
  
  after(function() {
    fakeServer.close();
    client.disconnect();
  });

  it('should broadcast updates to clients', function(done) {
    var fakeData = '{"title": "t1", "image": "t1.png", "link": "/t1"}';
     client.on(route, function(data) {
      expect(data).to.have.property('title').that.equal('t1');
      expect(data).to.have.property('image').that.equal('t1.png');
      expect(data).to.have.property('link').that.equal('/t1');
      done();
    });

    stream.start(fakeServer, route, channelName);
    stream.emit(fakeData);
   
  });
});
