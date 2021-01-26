const express=require('express')
const app=express()
const cors=require('cors')

app.use(cors())
app.use(express.json())
const port=5000
require('./database/database')

app.use('/', require('./routes/users'))
app.use('/', require('./routes/vacations'))
app.use('/', require('./routes/followed_vacations'))
app.use('/', require('./auth/loginRegister'))

app.listen(port, console.log(`Go on ${port} , Good luck in the project`))