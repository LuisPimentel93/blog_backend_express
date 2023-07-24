const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
require('dotenv').config()

const profileControllers = require('./controllers/Profile')
// middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/profile', profileControllers)
// app.post('/signup' , (req,res) => {
//     const{username, email, firstname, lastname, password} = req.body
//     res.json({requestData:{username, email, firstname, lastname, password}})
// })

// db connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('DB connected'))
    .catch(err => console.error(err));
    

    const PORT = process.env.PORT || 8080

    app.listen(PORT, console.log(`listening on port ${PORT}`))