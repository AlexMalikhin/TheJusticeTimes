const {Schema, model} = require('mongoose')

const User = new Schema({
    avatar: {type: String},
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {type:String, required: true, unique: true},
    password: {type:String, required: true},
    description: {type: String}
})

module.exports = model('User', User)


