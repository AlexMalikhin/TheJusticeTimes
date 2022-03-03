module.exports = function (err, req, res, next) {
  if (!req.headers['authorization']) {
    return res.status(400).json()
  } else {
    next()
  }
}
