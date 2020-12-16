const express = require('express')
var bodyParser = require('body-parser')
const userModel = require('../models/user')
const app = express()

app.use(bodyParser.json())

app.get('/', async (req, res) => {
      const user = await userModel.find({})
      try {
            res.send(user)
      } catch (err) {
            res.status(500).send(err)
      }
})

app.post('/createuser', async (req, res) => {
      username = req.body.username
      email = req.body.email
      ans = await checkUser(username, email)
      try {
            if(ans == 2) {
                  res.send(400, "Username taken")
            }
            else if(ans == 1) {
                  res.send(400, "Email taken")
            }
            else {
                  const user = new userModel(req.body)
                  try {
                        await user.save()
                        res.send(user)
                  } catch (err) {
                        res.status(400).send(err)
                  }
            }
      } catch (err) {
            res.status(400).send(err)
      }
})

app.put('/updateuser', function (req, res) {
      res.send('update user')
})

app.delete('/deleteuser', function (req, res) {
      res.send('delete user')
})

async function checkUser(username,email) {
      let userNameFound = await userModel.find({username})
      let emailFound = await userModel.find({email})

      if(userNameFound) {
            return 2
      }
      else if(emailFound) {
            return 1
      }
      else {
            return 0
      }
}

module.exports = app