var redis = require('../lib/redis');
module.exports = function(server, req, res, next) {
  redis.pub(req.params.channel, req.params.item);
  res.send(200, JSON.stringify(req.params));
  res.end();
  return next();
};