const { Pool, Client } = require('pg')
const express = require('express');
const path = require('path')
const bodyParser = require('body-parser')


const app = express();
const publicDirectoryPath = path.join(__dirname, '/views')
console.log(publicDirectoryPath)
app.set('view engine', 'html')

app.use(express.static(publicDirectoryPath))  
app.use(bodyParser.urlencoded({ extended: false })) 
app.use(bodyParser.json())


const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'Test',
  password: 'root',
  port: 5432,
})
client.connect()
app.get('',(req ,res)=>{
  res.render('index');
  res.send("HELLO"+req.body);
})

app.get('/create',(req ,res)=>{
  client.query(`CREATE TABLE test(
        AgentId int,
        UserName varchar(255),
        Password varchar(255))`,(err, res) => {
        console.log(err, res)
        client.end()
    })
    res.send("Create")
})

app.post('/insert',(req ,res)=>{
    const user = req.body;
    client.query(`insert into test (agentid, username , password ) values (${user.agentid} ,'${user.username}', '${user.password}')`,(err, res) => {
        console.log(err, res)
        client.end()
    })
    res.send("Insert")
})

app.post('/update',(req ,res)=>{
  const user = req.body;
  client.query(`UPDATE test SET username ='${user.username}';`,(err, res) => {
      console.log(err, res)
      client.end()
  })
  res.send("Update")
})

app.delete('/delete',(req ,res)=>{
  const user = req.body;
  client.query(`DELETE FROM test WHERE password = '${user.password}' ;`,(err, res) => {
      console.log(err, res)
      client.end()
  })
  res.send("delete")
})

app.listen(3000,()=>{
  console.log("server start on 3000")
});