if(process.env.NODE_ENV !== 'production'){
  require('dotenv').load()
}

const express = require('express')
const app = express()
const expressLayout = require('express-ejs-layouts')

const indexRouter = require("./routes/index")

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layout/layout')
app.use(expressLayout)
app.use(express.static('public'))

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', error => console.error(error))
db.on('open', () => console.log('Connected to Mongoose'))

app.use('/', indexRouter)

app.listen(process.env.PORT || 3000)
