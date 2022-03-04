module.exports.authenticateToken = async function (req, res, next) {
  const authToken = req.headers['authorization']
  if (!authToken) {
    return res.sendStatus(401)
  }
  req.token = authToken
  next()
}
