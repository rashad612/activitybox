/**
 * Configuration utility module, wraps 'nconf'.
 * @type {[type]}
 */
'use strict';

var nconf = require('nconf'),
    path = require('path'),
    fs = require('fs');

var configUtil = {};

configUtil.init = function(file) {
  file = file || 'config.json';
  file = path.resolve(file);
  if (fs.existsSync(file)) {
    nconf.file(path.resolve(file));
  }
};

configUtil.get = function(key) {
    return nconf.get(key);
};

configUtil.set = function(key, value) {
  if (key) {
    nconf.set(key, value);
  }
};

module.exports = configUtil;