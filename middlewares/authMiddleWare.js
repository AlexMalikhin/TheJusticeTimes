const jwt = require('jsonwebtoken')
const { secret } = require('../config/config')

module.exports.authenticateToken = async function (req, res, next) {
  try {
    const authToken = req.headers['authorization']
    if (!authToken) {
      return res.sendStatus(401)
    }

    const decode = jwt.verify(authToken, secret)
    // if (Date.now() >= decode.exp * 1000) {
    //   th
    // }

    req.token = decode.id
    next()
  } catch (e) {
    // console.log(jwt.verify(req.headers['authorization'], secret))
  }
}
