const User = require('../models/User');
const Article = require('../models/Article');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {secret} = require('../config/config');
const Cookie = require('js-cookie');
const regExpForPassword = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$");
const regExpForEmail = new RegExp('^\\S+@\\S+\\.\\S+$');

const generateAccessToken = (id, firstname, lastname) =>{
    const payload = {
        id,
        firstname,
        lastname
    }
    return jwt.sign(payload, secret, {expiresIn: "3h"})
}

module.exports.registration = async function(req, res){
    try{
        const {firstname, lastname, email, password} = req.body;
        const candidate = await User.findOne({email});
        if(candidate){
            return res.status(400).json({message: 'Email already has taken'})
        }
        else if(!regExpForEmail.test(email) || !email){
            return res.status(400).json({message: "Please enter correct email \'example@example.com\' "})
        }
        else if(!regExpForPassword.test(password)){
            return res.status(400).json(
                {
                    message:
                        "Password must have at least 6 characters and contain at least two of the" +
                        "following: UPPERCASE letters, lowercase letters, numbers," +
                        "and symbols($,@,!...)"
                })
        }
        else if(firstname.length < 2 || lastname.length < 2){
            return res.status(400).json({message: "username or lastname cannot be empty and must be more than 1 character"})
        }
        const hashPassword = bcrypt.hashSync(password, 7);
        const user = new User({
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: hashPassword
        })
        await user.save()
        return res.json({message: 'New user has been created', headers: 'Access-Control-Allow-Origin'})
    }catch (e) {
        console.log(res.status(400).json({message: 'Registration error'}))
        res.status(400).json({message: 'Registration error'});
    }
}

module.exports.login = async function(req, res){
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return
        }
        const user = await User.findOne({email});
        const validPassword = bcrypt.compareSync(password, user.password);
        if(!user || !validPassword){
            return res.status(400).json({message: 'Invalid Email or password'});
        }
        const token = generateAccessToken(user._id, user.firstname, user.lastname);

        return res.json({token, user})
    }catch (e) {
        console.log(e)
        res.status(400).json({message: 'Log in error'})
    }
}

module.exports.getUserData = async function(req, res){
    try {
        const {token} = req.body;
        if(!token){
            return res.status(403).json({message: 'Пользователь не авторизован'})
        }
        const decodedData = jwt.verify(token, secret);
        const currentUser = await User.findOne({_id: decodedData.id});
        if(!currentUser){
            return res.status(400).json({message: 'Пользователь не авторизован'})
        }
        const userData = {
            avatar: currentUser.avatar || '',
            firstname: currentUser.firstname,
            lastname: currentUser.lastname,
            description: currentUser.description || '',
        }

        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        return res.json(userData)
    }catch (e) {
        console.log(e)
    }
}

module.exports.updateUserData = async function(req, res){
    try{
        const {firstname, lastname, description, avatar, token} = req.body;
        const user = {
            firstname: firstname,
            lastname: lastname,
            description: description,
            avatar: avatar
        }
        const articleModel = {
            firstname: firstname,
            lastname: lastname,
            avatar: avatar
        }
        const decodedData = jwt.verify(token, secret);
        await User.findOneAndUpdate({_id: decodedData.id}, user);
        // const allArticles = await Article.find()
        await Article.updateMany({userId: decodedData.id}, articleModel )
        // const array = []
        // allArticles.map((item)=>{
        //
        //         array.push({userid: item.userId, idd: decodedData.id})
        // })

        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        return res.json({message: 'dwd'})
    }catch (e) {
        return res.json({message: "User data is didn't update"})
    }
}

module.exports.createArticle = async function(req, res){
    try{
        const newArticle = req.body;
        const decodedData = jwt.verify(newArticle.token, secret);
        const currentUser = await User.findOne({_id: decodedData.id})

        const article = new Article({
            firstname: currentUser.firstname,
            lastname: currentUser.lastname,
            avatar: currentUser.avatar,
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
        await article.save();
        return res.json({ message: currentUser.firstname})
    }catch (e) {
        return res.json({ message: 'New article didn t create' })
    }
}

module.exports.getAllArticles = async function(req, res){
    try{
        const all = await Article.find()
        return res.json({message: all})
    }catch (e){
        return res.json({message: 'don t get'})
    }
}

module.exports.getMyArticles = async function(req, res){
    try{
        const {token} = req.body;
        const decodedData = jwt.verify(token, secret);
        const currentUser = await User.findOne({_id: decodedData.id})
        const allArticles = await Article.find()
        const myArticles = await allArticles.filter(article => article.userId === currentUser.id)
        return res.json({message: myArticles})
    }catch (e) {
        return res.json({message: 'don t get'})
    }
}

module.exports.getPopularArticle = async function(req, res){
    try{
        const allArticles = await Article.find()
        if(!allArticles){
            return res.status(400).json({message: 'Articles not found in DataBase'})
        }
        const popularArticle = allArticles.reduce((acc, cur) => acc.views > cur.views ? acc : cur)
        return res.json({message: popularArticle})
    }catch (e) {

    }
}
module.exports.viewArticle = async function(req, res) {
    try {
        const {id} = req.body;
        const findArticle = await Article.findOne({_id: id})
        const newArticle = {
            views: findArticle.views + 1
        }
        await Article.findOneAndUpdate({_id: id}, newArticle)
        return res.json({message: 'view is increased'})
    } catch (e) {
        return res.json({message: 'dwdwd'})
    }
}