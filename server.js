const express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
const app = express()
const {MongoClient} = require('mongodb')

app.use(cors())
app.use(bodyParser.json())
 
app.get('/', function (req, res) {
      main()
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

async function main(){
      /**
       * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
       * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
       */
      const uri = "mongodb+srv://ponk:ponker@ponk.ej3ii.mongodb.net/<dbname>?retryWrites=true&w=majority";
   
  
      const client = new MongoClient(uri);
   
      try {
          // Connect to the MongoDB cluster
          await client.connect();
   
          // Make the appropriate DB calls
          await  listDatabases(client);
   
      } catch (e) {
          console.error(e);
      } finally {
          await client.close();
      }
}

async function listDatabases(client){
      databasesList = await client.db().admin().listDatabases();
   
      console.log("Databases:");
      databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

app.listen(process.env.PORT || 3000)
