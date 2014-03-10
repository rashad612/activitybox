/**
 * Configuration utility module, wraps 'nconf'.
 * @type {[type]}
 */
var nconf = require('nconf'),
    path = require('path'),
    fs = require('fs'),
    chai = require('chai'),
    expect = chai.expect;

    chai.use(require('chai-json-schema'));
    
var configUtil = {};

var configSchema = {
  "title": "Config Schema",
  "type": "object",
  "properties": {
    "server": {
      "title": "Server",
      "type": "object",
      "required": ["port"],
      "properties": {
        "name": {
          "type": "string",
          "minLength": 1
        },
        "port": {
          "type": "number",
          "minimum": 0
        }
      }
    },
    "redis": {
      "title": "Redis",
      "type": "object",
      "required": ["channel"],
      "properties": {
        "host": {
          "type": "string",
          "minLength": 1
        },
        "port": {
          "type": "number",
          "minimum": 0
        },
        "password": {
          "type": "string",
          "require": true
        },
        "channel": {
          "type": "string",
          "minLength": 1
        }
      }
    }
  }
};

configUtil.init = function(file) {
  file = path.resolve(file);
  if (fs.existsSync(file)) {
    nconf.file(path.resolve(file));
    try {
    expect(configUtil.get()).to.be.jsonSchema(configSchema);
  } catch (e) {
    throw e;
  }
  }
};

configUtil.get = function(key) {
    return nconf.get(key);
};

configUtil.set = function(key, value) {
  nconf.set(key, value);
};

module.exports = configUtil;