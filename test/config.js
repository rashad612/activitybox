'use strict';

var path = require('path'),
	expect = require('chai').expect;

var configUtil = require('../lib/configUtil');

var config;
describe('config', function() {
  
  beforeEach(function() {
    configUtil.init('test/fixtures/config.example.json');
  });

  it('should accept new config file', function() {
    expect(configUtil.get('redis:host')).to.equal('127.0.0.2');
  });

  it('should be modified safely', function() {
    configUtil.set('server:name', 'localhost');
    configUtil.set('server:port', 3000);
    
    expect(configUtil.get('server')).to.have.property('name').and.equal('localhost');
    expect(configUtil.get('server')).to.have.property('port').and.equal(3000);
  });
});