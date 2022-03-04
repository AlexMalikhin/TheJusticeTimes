const jwt = require('jsonwebtoken')
const { secret } = require('../config/config')

module.exports.authenticateToken = async function (req, res, next) {
  const authToken = req.headers['authorization']
  const decode = jwt.verify(authToken, secret)
  if (!authToken) {
    return res.sendStatus(401)
  }
  req.token = decode.id
  next()
}
