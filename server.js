const express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
const app = express()
const mongoose = require('mongoose')
const ponkRouter = require('./routes/ponkRoutes')

app.use(cors())
app.use(bodyParser.json())
app.use(express.json())
app.use(ponkRouter)

mongoose.connect('mongodb+srv://ponk:ponker@ponk.ej3ii.mongodb.net/<dbname>?retryWrites=true&w=majority', {
  useNewUrlParser: true
});

app.listen(process.env.PORT || 3000)
