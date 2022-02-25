const User = require('../models/User');
const Role = require('../models/Role');
const bcrypt = require('bcryptjs');
const regExpForPassword = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$");

module.exports.registration = async function(req, res){
    try{
        const {firstname, lastname, email, password} = req.body;
        if(regExpForPassword.test(email)){
            return res.status(400).json({message: })
        }
        const candidate = await User.findOne({email});
        if(candidate){
            return res.status(400).json({message: 'Email already has taken'})
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
        res.json('log in work')
    }catch (e) {
        console.log(e)
        res.status(400).json({message: 'Log in error'})
    }
}

module.exports.getUsers = async function(req, res){
    try {
        const userRole = new Role()
        const adminRole = new Role({value: "ADMIN"})
        await userRole.save();
        await adminRole.save();
        res.json('server work')
    }catch (e) {
        console.log(e)
    }
}