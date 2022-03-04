const jwt = require('jsonwebtoken')
const { secret } = require('../config/config')
const User = require('../models/User')
const Article = require('../models/Article')

module.exports.getUserData = async function (req, res) {
  try {
    const token = req.token
    if (!token) {
      return res.status(403).json({ message: 'User is not authorized' })
    }
    const { id } = jwt.verify(token, secret)
    const { firstname, lastname, description, avatar } = await User.findOne({
      _id: id,
    })
    if (!firstname || !lastname) {
      return res.status(400).json({ message: 'User is not found in database' })
    }

    const userData = {
      avatar: avatar || '',
      firstname,
      lastname,
      description: description || '',
    }
    return res.json(userData)
  } catch (e) {
    console.log(e)
  }
}

module.exports.updateUserData = async function (req, res) {
  try {
    const token = req.token
    if (!token) {
      return res.status(403).json({ message: 'User is not authorized' })
    }
    const { firstname, lastname, description, avatar } = req.body
    if (!firstname || !lastname) {
      return res
        .status(403)
        .json({ message: 'Please enter firstname and lastname' })
    }
    const user = {
      firstname,
      lastname,
      description,
      avatar,
    }
    const articleModel = {
      firstname,
      lastname,
      avatar,
    }
    const { id } = jwt.verify(token, secret)
    if (!id) {
      res.status(400).json({ message: 'Invalid token' })
    }
    await User.findOneAndUpdate({ _id: id }, user)
    await Article.updateMany({ userId: id }, articleModel)

    return res.json({ message: 'User data has been updated success' })
  } catch (e) {
    return res.json({ message: "User data is didn't update" })
  }
}
