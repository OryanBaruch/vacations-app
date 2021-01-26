const mysql=require('mysql')
const dotenv=require('dotenv')
dotenv.config({path:'./.env'}) 

const connection=mysql.createConnection({
    host:process.env.DATABASE_HOST, 
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE
})


connection.connect((err)=>{
    if(err) return console.log('Error in connection', err)  
    console.log('SQL is connected')
})

module.exports=connection