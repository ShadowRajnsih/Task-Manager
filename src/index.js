const express=require('express')
const User=require('../src/models/users.js')
const Task=require('../src/models/tasks.js')
require('../src/db/mongoose.js')
 const userRouter=require('../src/routers/user.js')
 const taskRouter=require('../src/routers/task.js')
const app=express()
app.use(express.json())
 app.use(userRouter)
 app.use(taskRouter)
const port=process.env.PORT || 3000


app.listen(port,()=>{
    console.log('Server is running on port'+port)
})