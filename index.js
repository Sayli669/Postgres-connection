const { Pool, Client } = require('pg')
const express = require('express');
const path = require('path')
const bodyParser = require('body-parser')
const social = require('./JsonData/social_response_log')

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
  database: 'CircleOneSocialDB',
  password: 'root',
  port: 5432,
})
client.connect()

app.post('/insert',(req ,res)=>{
    const user = social[0];
    // console.log(`${user.id}`)
    // const user = req.body;
    client.query(`insert into social_response_log values (
      ${user.id}, ${user.social_inbox_id}, ${user.created_by},
      '${user.created_on}', '${user.message}', '${user.image_link}',
      '${user.remark}', ${user.customer_id}, ${user.work_queue_log_id},
      ${user.status}, ${user.modified_by}, '${user.modified_on}' )` ,
      (err, res) => {
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