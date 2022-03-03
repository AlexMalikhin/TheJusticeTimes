const { Schema, model } = require('mongoose')

const Article = new Schema({
  userId: { type: String, require: true },
  title: { type: String, require: true },
  category: { type: String, require: true },
  headImg: { type: String, require: true },
  date: { type: String, require: true },
  text: { type: String, require: true },
  views: { type: Number, require: true },
  firstname: { type: String, require: true },
  lastname: { type: String, require: true },
  avatar: { type: String, require: true },
})

module.exports = model('Article', Article)
