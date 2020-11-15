const jwt=require('jsonwebtoken')
const User=require('../models/users.js')

const auth=async (req, res, next)=>{
    console.log("auth middleware")
    try{
        const token = req.header('Authorization').replace('Bearer ','')
        console.log(token)
        const decoded=jwt.verify(token,'thisismynewcourse')
        //console.log(decoded)
        const user=await User.findOne({_id:decoded._id,'tokens.token':token})
        if(!user)
        {
            throw new Error()
        }
        req.token=token
        req.user=user
        next()
    }
    catch (e)
    {
        res.status(401).send("Please authenticate")
    }
}

module.exports=auth