const express=require('express')
const User=require('../src/models/users.js')
const Task=require('../src/models/tasks.js')
require('../src/db/mongoose.js')
// const userapp=require('../src/apps/user.js')
// const taskapp=require('../src/apps/task.js')
const app=express()
app.use(express.json())
// app.use(userapp)
// app.use(taskapp)
const port=process.env.PORT || 3000


app.listen(port,()=>{
    console.log('Server is running on port'+port)
})