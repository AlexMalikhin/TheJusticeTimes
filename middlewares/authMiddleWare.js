const jwt = require('jsonwebtoken')
const { secret } = require('../config/config')

module.exports.authenticateToken = async function (req, res, next) {
  try {
    const authToken = req.headers['authorization']
    const decode = jwt.verify(authToken, secret)
    console.log(decode)
    if (!authToken) {
      return res.sendStatus(401)
    }
    req.token = decode.id
    next()
  } catch (e) {
    console.log(jwt.verify(req.headers['authorization'], secret))
  }
}
