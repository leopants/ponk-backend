const express = require('express')
var bodyParser = require('body-parser')
const userModel = require('../models/user')
const app = express()

app.use(bodyParser.json())

app.get('/', function (req, res) {
      res.send("Hello ponk")
})

app.get('/getusers', async (req, res) => {
      const user = await userModel.find({})
      try {
            res.send(user)
      } catch (err) {
            res.status(500).send(err)
      }
})

app.get('/checkuser', async (req, res) => {
      usernameOrEmail = req.body.usernameOrEmail
      userPassword = req.body.password
      try {
            const user = await userModel.find({usernameOrEmail})
            if(user.length > 0) {
                  if(userPassword == user[0].password) {
                        res.send(200)
                  }
                  else {
                        res.status(400).send('Passwords do not match')
                  }
            }
            else {
                  res.status(400).send('Username or email incorrect')
            }
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

app.put('/updateuser', async (req, res) => {
      try {
            username = req.body.username
            user = await userModel.find({username})
            userID = user[0]._id
            await userModel.findByIdAndUpdate(userID, req.body)
            res.send(200)
      } catch (err) {
            res.status(404).send(err)
      }
})

app.delete('/deleteuser', async (req, res) => {
      try {
            username = req.body.username
            user = await userModel.find({username})
            userID = user[0]._id
            const userToDelete = await userModel.findByIdAndDelete(userID, req.body)
            if (!userToDelete) {
                  res.status(404).send("No item found")
            }
            res.status(200).send()
      } catch (err) {
            res.status(400).send(err)
      }
})

async function checkUser(username,email) {
      let userNameFound = await userModel.find({username})
      let emailFound = await userModel.find({email})
      
      if(userNameFound.length > 0) {
            return 2
      }
      else if(emailFound.length > 0) {
            return 1
      }
      else {
            return 0
      }
}

module.exports = app