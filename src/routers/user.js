const express=require('express')
const User=require('../models/users.js')
const auth=require('../middleware/auth.js');
const { update } = require('../models/users.js')
const router = new express.Router()

router.post('/users', async (req,res)=>{

    const user=new User(req.body)
    try{
        await user.save()
        const token= await user.generateAuthToken()
        res.status(200).send({user,token})
    }catch(e){
        res.status(500).send(user)
    }
})

router.post('/users/login', async (req,res)=>{
    try {
        const user=await User.findByCredentials(req.body.email,req.body.password)
        const token= await user.generateAuthToken()
        res.status(200).send({user,token})
        }
        catch(e){
            res.status(404).send()
        }

})

router.get('/users/me',auth,async (req,res)=>{

    res.send(req.user)
   
})

router.post('/user/logout',auth,async (req,res)=>{
    try{
        req.user.tokens=req.user.tokens.filter((token)=>{
            return token.token!==req.token
        })
        await req.user.save()
        res.send()
    }
    catch (e){
        res.status(500).send()
    }

})

router.post('/user/logoutall',auth,async (req,res)=>{
    try{
        req.user.tokens=[]
        await req.user.save()
        res.send()
    }
    catch (e){
        res.status(500).send()
    }

})

// router.get('/users/:id',async (req,res)=>{
//     const _id=req.params.id
//     console.log(_id)
//     try {
//         const user= await User.findById(_id)
//         if(!user)
//         {
//          return  res.status(404).send("No user by given id")
//         }
//             res.status(200).send(user)
        
//     }
//     catch (e)
//     {
//         res.status(500).send("Unable to fetch users")
//     }
    
// })

router.patch('/user/me',auth,async (req,res)=>{

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
        const user= await req.user
        updates.forEach((update)=> user[update]=req.body[update])
        await user.save()
        res.status(200).send(req.user)
    }
    catch(e){
        res.status(500).send("Unable to update")
    }
})

router.delete('/users/me',auth,async (req,res)=>{
    try {
        await req.user.remove()
       res.status(200).send(req.user)
    }
    catch (e){
        res.status(500).send("Unable to delete user")
    }
})

module.exports = router