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

    const { firstname, lastname, avatar } = await User.findOne({
      _id: token,
    })
    if (!firstname || !lastname) {
      res
        .status(400)
        .json('Server cannot find user in database maybe token is not correct')
    }

    const article = new Article({
      firstname: firstname,
      lastname: lastname,
      avatar: avatar,
      userId: token,
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
    const allArticles = await Article.find()
    return res.status(200).json({ allArticles })
  } catch (e) {
    return res
      .status(400)
      .json({ message: 'Articles not found in database please create one' })
  }
}

module.exports.getMyArticles = async function (req, res) {
  try {
    const authToken = req.token
    if (!authToken) {
      return res.json({ message: 'token not found' })
    }
    // const decoded = jwt.verify(authToken, secret)
    const currentUser = await User.findOne({ _id: authToken })
    if (!currentUser) {
      return res.json({ message: 'user not found' })
    }
    const allArticles = await Article.find()

    const myArticles = await allArticles.filter(
      (article) => article.userId === currentUser.id
    )
    return res.status(200).json({ myArticles })
  } catch (e) {
    return res.status(400).json({ message: req.token })
  }
}

module.exports.getPopularArticle = async function (req, res) {
  try {
    const allArticles = await Article.find()
    if (!allArticles) {
      return res.status(400).json({ message: 'Articles not found in DataBase' })
    }
    const popularArticle = allArticles.reduce((acc, cur) =>
      acc.views > cur.views ? acc : cur
    )
    if (!popularArticle) {
      return res
        .status(200)
        .json({ message: 'Something went wrong, cannot get popular article' })
    }
    return res.json({ popularArticle })
  } catch (e) {
    res
      .status(400)
      .json({ message: 'Something went wrong, cannot get popular article' })
  }
}

module.exports.viewArticle = async function (req, res) {
  try {
    const { id } = req.body
    if (id.id) {
      return res.status(400).json({ message: 'Please send article id' })
    }
    const findArticle = await Article.findOne({ _id: id })
    if (!findArticle) {
      return res.status(400).json({ message: 'Cannot find clicked article' })
    }
    const newArticle = {
      views: findArticle.views + 1,
    }
    await Article.findOneAndUpdate({ _id: id }, newArticle)
    return res.status(200).json({ message: 'Current article has been viewed' })
  } catch (e) {
    return res.status(400).json({ message: "Article didn't viewed" })
  }
}
