module.exports = function(server, req, res, next) {
  res.send(200, JSON.stringify({msg: 'test passed'}));
  res.end();
  return next();
};