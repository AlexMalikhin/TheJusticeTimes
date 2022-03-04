const jwt = require('jsonwebtoken')
const { secret } = require('../config/config')
const User = require('../models/User')
const Article = require('../models/Article')

module.exports.createArticle = async function (req, res) {
  try {
    const token = req.token
    if (!token) {
      res.status(400).json("Can't get user token")
    }

    const { title, category, headImg, date, text, views } = req.body
    if (!title || !category || !headImg || !text) {
      res.status(400).json('Please enter correct data for a new post')
    }

    const decoded = jwt.verify(token, secret)

    const { firstname, lastname, avatar } = await User.findOne({
      _id: decoded.id,
    })
    // if (!firstname || !lastname) {
    //   res.status(400).json('Server cannot find user in database')
    // }

    const article = new Article({
      firstname: firstname,
      lastname: lastname,
      avatar: avatar,
      userId: decoded.id,
      title: title,
      category: category,
      headImg: headImg,
      date: date,
      text: text,
      views: views,
    })

    await article.save()
    return res
      .status(200)
      .json({ message: 'New article has been created successful' })
  } catch (e) {
    return res.status(400).json({ message: 'New article didn t create' })
  }
}

module.exports.getAllArticles = async function (req, res) {
  try {
    const all = await Article.find()
    return res.json({ message: all })
  } catch (e) {
    return res
      .status(200)
      .json({ message: 'Articles not found in database please create one' })
  }
}

module.exports.getMyArticles = async function (req, res) {
  try {
    const authToken = req.token
    if (!authToken) {
      return res.json({ message: 'token not found' })
    }
    const decoded = jwt.verify(authToken, secret)
    const currentUser = await User.findOne({ _id: decoded.id })
    if (!currentUser) {
      return res.json({ message: 'user not found' })
    }
    const allArticles = await Article.find()

    const myArticles = await allArticles.filter(
      (article) => article.userId === currentUser.id
    )
    return res.json({ message: myArticles })
  } catch (e) {
    return res.json({ message: "don't get" })
  }
}

module.exports.getPopularArticle = async function (req, res) {
  try {
    const allArticles = await Article.find()
    if (!allArticles) {
      // throw { code: 400, message: 'Articles not found in DataBase' }
      return res.status(400).json({ message: 'Articles not found in DataBase' })
    }
    const popularArticle = allArticles.reduce((acc, cur) =>
      acc.views > cur.views ? acc : cur
    )
    return res.json({ message: popularArticle })
  } catch (e) {
    res.status(e.code).json({ message: e.message })
  }
}
module.exports.viewArticle = async function (req, res) {
  try {
    const { id } = req.body
    const findArticle = await Article.findOne({ _id: id })
    const newArticle = {
      views: findArticle.views + 1,
    }
    await Article.findOneAndUpdate({ _id: id }, newArticle)
    return res.json({ message: 'view is increased' })
  } catch (e) {
    return res.json({ message: 'dwdwd' })
  }
}
