const jwt = require('jsonwebtoken')
const { secret } = require('../config/config')
const User = require('../models/User')
const Article = require('../models/Article')
module.exports.createArticle = async function (req, res) {
  try {
    // todo: диструктуризировать
    const newArticle = req.body
    const decodedData = jwt.verify(newArticle.token, secret)
    const { firstname, lastname, avatar } = await User.findOne({
      _id: decodedData.id,
    })

    const article = new Article({
      firstname,
      lastname: lastname,
      avatar: avatar,
      userId: decodedData.id,
      title: newArticle.title,
      category: newArticle.category,
      headImg: newArticle.headImg,
      monthOfCreated: newArticle.monthOfCreated,
      dayOfCreated: newArticle.dayOfCreated,
      timeOfCreated: newArticle.timeOfCreated,
      text: newArticle.text,
      views: newArticle.views,
    })
    await article.save()
    return res.json({ message: firstname })
  } catch (e) {
    // todo: более подробно разбить логику ошибок и подробно описать все ошибки
    return res.json({ message: 'New article didn t create' })
  }
}

module.exports.getAllArticles = async function (req, res) {
  try {
    const all = await Article.find()
    return res.json({ message: all })
  } catch (e) {
    return res.json({ message: 'don t get' })
  }
}

module.exports.getMyArticles = async function (req, res) {
  try {
    const { token } = req.body
    // todo: добавить throw для корректной обработки ошибок
    const decodedData = jwt.verify(token, secret)
    const currentUser = await User.findOne({ _id: decodedData.id })
    const allArticles = await Article.find()
    const myArticles = await allArticles.filter(
      (article) => article.userId === currentUser.id
    )
    return res.json({ message: myArticles })
  } catch (e) {
    return res.json({ message: 'don t get' })
  }
}

module.exports.getPopularArticle = async function (req, res) {
  try {
    const allArticles = await Article.find()
    if (!allArticles) {
      throw { code: 400, message: 'Articles not found in DataBase' }
      // return res.status(400).json({ message: 'Articles not found in DataBase' })
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
