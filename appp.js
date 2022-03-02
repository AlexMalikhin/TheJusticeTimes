const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routes/authRouter');
const userRouter = require('./routes/userRouter');
const articleRouter = require('./routes/articleRouter');
const PORT = process.env.PORT || 5001;
const cors = require('cors');

const app = express()
app.use(express.json())
app.use(cors())
app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/article', articleRouter)
const start = async () => {
    try{
        await mongoose.connect("mongodb+srv://user:user@cluster0.opqqx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",)
        app.listen(PORT, ()=> console.log(`flcawlfd ${PORT}`))
    }catch (e){
        console.log(e)
    }
}

start()