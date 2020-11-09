const mongoose=require('mongoose')
const { default: validator } = require('validator')


const User=mongoose.model('User',
{name:{type:String,
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

module.exports =User