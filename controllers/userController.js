const jwt = require('jsonwebtoken')
const { secret } = require('../config/config')
const User = require('../models/User')
const Article = require('../models/Article')

module.exports.getUserData = async function (req, res) {
  try {
    const { token } = req.body
    if (!token) {
      return res.status(403).json({ message: 'Пользователь не авторизован' })
    }
    const decodedData = jwt.verify(token, secret)
    const currentUser = await User.findOne({ _id: decodedData.id })
    if (!currentUser) {
      return res.status(400).json({ message: 'Пользователь не авторизован' })
    }
    const userData = {
      avatar: currentUser.avatar || '',
      firstname: currentUser.firstname,
      lastname: currentUser.lastname,
      description: currentUser.description || '',
    }
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    )
    return res.json(userData)
  } catch (e) {
    console.log(e)
  }
}

module.exports.updateUserData = async function (req, res) {
  try {
    const { firstname, lastname, description, avatar, token } = req.body
    const user = {
      firstname: firstname,
      lastname: lastname,
      description: description,
      avatar: avatar,
    }
    const articleModel = {
      firstname: firstname,
      lastname: lastname,
      avatar: avatar,
    }
    const decodedData = jwt.verify(token, secret)
    await User.findOneAndUpdate({ _id: decodedData.id }, user)
    await Article.updateMany({ userId: decodedData.id }, articleModel)
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    )
    return res.json({ message: 'dwd' })
  } catch (e) {
    return res.json({ message: "User data is didn't update" })
  }
}
