const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')
const { default: validator } = require('validator')
const userSchema = new mongoose.Schema({name:{type:String,
    required:true ,
    trim:true},
    email:{type:String,required:true,trim:true,lowercase:true,validate(value){
        if(!validator.isEmail(value)){
            throw new Error('Email is invalid')
        }
    }},
    age:{type:Number,
        default:0,
        validate(value){
            if(value<0)
            {
                throw new Error('Age cannot be less than zero')
            }
        }
    
    },password:{
        type:String,
        required:true,
        minlength:8,
        trim:true,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Password cannot contain word "Password" ')
    
            }
        }
    }})

    userSchema.pre('save',async function(next)
    { 
        const user=this
        console.log('Just before saving')

        if(user.isModified('password')){
            user.password=await bcrypt.hash(user.password,8)
        }
        next()
    })

const User=mongoose.model('User',userSchema)


module.exports =User