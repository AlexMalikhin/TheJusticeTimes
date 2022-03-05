const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { secret } = require('../config/config')
const regExpForPassword = new RegExp(
  '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$'
)
const regExpForEmail = new RegExp('^\\S+@\\S+\\.\\S+$')

const generateAccessToken = (id, firstname, lastname) => {
  const payload = {
    id,
    firstname,
    lastname,
  }
  return jwt.sign(payload, secret, { expiresIn: '3h' })
}

module.exports.registration = async function (req, res) {
  try {
    const { firstname, lastname, email, password } = req.body
    const candidate = await User.findOne({ email })
    if (candidate) {
      return res.status(400).json({ message: 'Email already has taken' })
    } else if (!regExpForEmail.test(email) || !email) {
      return res
        .status(400)
        .json({ message: "Please enter correct email 'example@example.com' " })
    } else if (!regExpForPassword.test(password)) {
      return res.status(400).json({
        message:
          'Password must have at least 6 characters and contain at least two of the' +
          'following: UPPERCASE letters, lowercase letters, numbers,' +
          'and symbols($,@,!...)',
      })
    } else if (firstname.length < 2 || lastname.length < 2) {
      return res.status(400).json({
        message:
          'username or lastname cannot be empty and must be more than 1 character',
      })
    }
    const hashPassword = bcrypt.hashSync(password, 7)
    const user = new User({
      firstname,
      lastname,
      email,
      password: hashPassword,
    })
    await user.save()
    return res.json({
      message: 'New user has been created',
      headers: 'Access-Control-Allow-Origin',
    })
  } catch (e) {
    console.log(res.status(400).json({ message: 'Registration error' }))
    res.status(400).json({ message: 'Registration error' })
  }
}

module.exports.login = async function (req, res) {
  try {
    const { email, password } = req.body
    if (!regExpForPassword.test(password) || !regExpForEmail.test(email)) {
      return res.status(400).json({
        message: 'Invalid Email or password',
      })
    }
    const user = await User.findOne({ email })
    const validPassword = bcrypt.compareSync(password, user.password)
    if (!user || !validPassword) {
      return res.status(400).json({ message: 'Invalid Email or password' })
    }
    const token = generateAccessToken(user._id, user.firstname, user.lastname)

    return res.json({ token })
  } catch (e) {
    console.log(e)
    res.status(400).json({ message: 'Log in error' })
  }
}
