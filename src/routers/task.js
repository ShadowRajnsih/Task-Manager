const express=require('express')
const Task=require('../models/tasks.js')
const router = new express.Router()


router.post('/tasks',async (req,res)=>{

    const task=new Task(req.body)
    try {
       await  task.save()
       res.status(200).send("Task successfully created")
    }
    catch (e){
        res.status(400).send("Unable to create tasks")
    }

})

router.get('/tasks',async (req,res)=>{

    try {
        const results=await Task.find({})
        if(!results)
        {
            res.status(404).send("No tasks available")
        }
        else 
        {
            res.send(results)
        }

    }
    catch (e){
        res.status(500).send("Unable to fetch tasks")
    }
})

router.get('/tasks/:id',async (req,res)=>{
    const _id=req.params.id
    console.log(_id)
    try{
        const task=await Task.findById(_id)
        if(!task)
        {
            res.status(404).send("No tasks by given id")
        }
        else 
        {
            res.send(task)
        }

    }
    catch (e){
        res.status(500).send("Unable to fetch tasks")

    }
})


router.patch('/task/:id',async (req,res)=>{
    const updates=Object.keys(req.body)
    console.log(req.params.id)
    const AllowedUpdates=["task","status"]
    const isValidOperation=updates.every((update)=>
        AllowedUpdates.includes(update)
    )
    if(!isValidOperation){
        return res.status(400).send({'error': 'invalid updates'})
    }
    
    try{
        const task= await Task.findById(req.params.id)
        updates.forEach((update)=> task[update]=req.body[update])
        await task.save()
        //const update= await Task.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
        if(!task)
        {
          return res.status(404).send()
        }
        res.status(200).send(task)
    }
    catch(e){
        res.status(500).send("Unable to update")
    }
})



router.delete('/tasks/:id',async (req,res)=>{
    const _id=req.params.id
    console.log(_id)
    try {
        const task=await Task.findByIdAndDelete(_id)
        if(!task)
       {
           return res.status(404).send("Unable to find task by given id")
       }

       res.status(200).send(task)
    }
    catch (e){
        res.status(500).send("Unable to delete task")
    }

})

module.exports =router