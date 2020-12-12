const express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
const app = express()

app.use(cors())
app.use(bodyParser.json())
 
app.get('/', function (req, res) {
      res.send('HELLO PONK')
})

app.post('/', function (req, res) {
      res.send(200, req.body.title)
})

app.get('/getusers', function (req, res) {
      res.send('get users')
})

app.post('/createuser', function (req, res) {
      res.send('create user')
})

app.put('/updateuser', function (req, res) {
      res.send('update user')
})

app.delete('/deleteuser', function (req, res) {
      res.send('delete user')
})

app.listen(process.env.PORT || 3000)
