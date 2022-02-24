const express = require('express');
const config = require('config');
const mongoose = require('mongoose');

const app = express()

app.use('/api/auth', require('./routes/auth.routes'))

const PORT = 5002

async function start() {
    try{
        await mongoose.connect(config.get('mongoUrl'))
        app.listen(5002, ()=> console.log(`App has been started on port ${PORT}...`))
    }catch (e) {
        console.log('error', e.message)
        process.exit(1)
    }
}
start()
