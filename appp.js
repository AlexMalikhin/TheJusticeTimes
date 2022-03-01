const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./routes/authRouter')
const PORT = process.env.PORT || 5001
const cors = require('cors')



const app = express()

app.use(express.json())
app.use(cors({origin:'http://localhost:3000'}))
app.use('/auth', authRouter)
const start = async () => {
    try{
        await mongoose.connect("mongodb+srv://user:user@cluster0.opqqx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",)
        app.listen(PORT, ()=> console.log(`flcawlfd ${PORT}`))
    }catch (e){
        console.log(e)
    }
}

start()