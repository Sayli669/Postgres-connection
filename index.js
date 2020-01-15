// const { Pool , Client } = require('pg');
// const connectionString = 'postgressql://postgres:root@localhost:5432/test';

// const client = new Client({
//     connectionString:connectionString
// })

// client.connect();



const { Pool, Client } = require('pg')
const connectionString = 'postgresql://postgres:root@localhost:5432/template1'
// const pool = new Pool({
//   connectionString: connectionString,
// })
// pool.query('SELECT NOW()', (err, res) => {
//   console.log(err, res)
//   pool.end()
// })
const client = new Client({
  connectionString: connectionString,
})
client.connect(()=>{
    console.log("connected")
})
// client.query(`CREATE TABLE Persons(
//     PersonID int,
//     LastName varchar(255),
//     FirstName varchar(255))`,(err, res) => {
//     console.log(err, res)
//     client.end()
// })

// client.query(`INSERT INTO Persons (personid,lastname,firstname)VALUES (
//     2,
//     'PISAL',
//     'SAYLI')`,(err, res) => {
//     console.log(err, res)
//     client.end()
// })

client.query(`SELECT * FROM PERSONS`,(err, res) => {
    console.log(err, res)
    client.end()
})