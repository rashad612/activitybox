var restify = require('restify'),
    request = require('supertest'),
    Router = require('../lib/router');
    
describe('router', function() {
  var fakeServer,
      router,
      port = 9000;

  beforeEach(function() {
    fakeServer = restify.createServer();
    router = new Router(fakeServer, 'test/fixtures');
    fakeServer.listen(port);
  });

  afterEach(function() {
    fakeServer.close();
    route = null;
    port = null;
  });

  it('should dispatch route controller', function(done) {
    var testPath = '/test-controller';
    var controller = router.dispatch(testPath);
    
    fakeServer.get(testPath, controller);

    request(fakeServer)
      .get(testPath)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('should return "page not found" for non-existed controllers', function(done) {
    var testPath = '/non-existed';
    var controller = router.dispatch(testPath);

    fakeServer.get(testPath, controller);

    request(fakeServer)
      .get(testPath)
      .expect(404, done);
  });
});