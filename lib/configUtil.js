/**
 * Configuration utility module, wraps 'nconf'.
 */
'use strict';

var nconf = require('nconf'),
    path = require('path'),
    fs = require('fs');

var configUtil = {};

configUtil.init = function(file) {
  if (file) {
    file = path.resolve(file);
    if (fs.existsSync(file)) {
      nconf.file('custom', path.resolve(file));
    }
  }
  nconf.file('default', path.resolve(__dirname, '../config.json'));
};

configUtil.get = function(key) {
    return nconf.get(key);
};

configUtil.set = function(key, value) {
  if (key) {
    nconf.set(key, value);
  }
};

configUtil.reset = function() {
  nconf.remove('file');
};

module.exports = configUtil;