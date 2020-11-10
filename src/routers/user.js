const express=require('express')
const User=require('../models/users.js')
const router = new express.Router()

router.post('/users', async (req,res)=>{

    const user=new User(req.body)
    try{
        await user.save()
        res.status(200).send(user)
    }catch(e){
        res.status(500).send("Unable to create user")
    }
})

router.get('/users',async (req,res)=>{

    try {
        const users= await User.find()
        res.status(200).send(users)
    }
    catch (e)
    {
        res.status(500).send("Unable to fetch users")
    }
   
})

router.get('/users/:id',async (req,res)=>{
    const _id=req.params.id
    console.log(_id)
    try {
        const user= await User.findById(_id)
        if(!user)
        {
         return  res.status(404).send("No user by given id")
        }
            res.status(200).send(user)
        
    }
    catch (e)
    {
        res.status(500).send("Unable to fetch users")
    }
    
})

router.patch('/user/:id',async (req,res)=>{

    const updates=Object.keys(req.body)
    console.log(req.params.id)
    const AllowedUpdates=["name","email","password","age"]
    const isValidOperation=updates.every((update)=>
        AllowedUpdates.includes(update)
    )
    if(!isValidOperation){
        return res.status(400).send({'error': 'invalid updates'})
    }
    
    try{
        const update= await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
        res.status(200).send(update)
    }
    catch(e){
        res.status(500).send("Unable to update")
    }
})

router.delete('/users/:id',async (req,res)=>{
    const _id=req.params.id
    console.log(_id)
    try {
       const user= await User.findByIdAndDelete(_id)
       if(!user)
       {
           return res.status(404).send("Unable to find user by given id")
       }

       res.status(200).send(user)
    }
    catch (e){
        res.status(500).send("Unable to delete user")
    }
})

module.exports = router