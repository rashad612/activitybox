'use strict';

var path = require('path'),
	expect = require('chai').expect;

var configUtil = require('../lib/configUtil');

describe('config', function() {
  
  afterEach(function() {
    configUtil.reset();
  });

  it('should accept new config file', function() {
    configUtil.init('test/fixtures/config.example.json');
    expect(configUtil.get('redis:host')).to.equal('127.0.0.2');
  });

  it('should be modified safely', function() {
    configUtil.init();
    configUtil.set('server:name', 'localhost');
    configUtil.set('server:port', 3000);
    
    expect(configUtil.get('server')).to.have.property('name').and.equal('localhost');
    expect(configUtil.get('server')).to.have.property('port').and.equal(3000);
  });
});