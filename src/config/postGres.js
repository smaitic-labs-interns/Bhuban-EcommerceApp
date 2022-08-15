const { Client } = require('pg')
require('dotenv').config();

// const con = async() => {
//     await client.connect()
// }

const client = new Client({
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
  })
client.connect((err)=>{
    if(err) throw err;
})

module.exports = client