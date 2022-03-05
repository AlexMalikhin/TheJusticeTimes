const User = require('../models/User')
const Article = require('../models/Article')

module.exports.getUserData = async function (req, res) {
  try {
    const token = req.token
    if (!token) {
      return res.status(403).json({ message: 'User is not authorized' })
    }

    const { firstname, lastname, description, avatar } = await User.findOne({
      _id: token,
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

    await User.findOneAndUpdate({ _id: token }, user)
    await Article.updateMany({ userId: token }, articleModel)

    return res
      .status(200)
      .json({ message: 'User data has been updated success' })
  } catch (e) {
    return res.status(400).json({ message: "User data is didn't update" })
  }
}
