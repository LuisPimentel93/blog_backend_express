const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
require('dotenv').config()
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const secret = 'wdibwehrbvwkbefhbwhefbhvwbefhbvh2efbjnvbwefjbv'


const profileControllers = require('./controllers/Profile')

// middleware
app.use(cors({credentials:true,origin:'http://localhost:3000'}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/profiles', profileControllers)

app.get('/profile', (req,res) =>{
    const { token } = req.cookies
          jwt.verify(token, secret, {}, (err, info) => {
            if(err) throw err
            res.json(info)
          } )
})




// db connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('DB connected'))
    .catch(err => console.error(err));
    

    const PORT = process.env.PORT || 8080

    app.listen(PORT, console.log(`listening on port ${PORT}`))