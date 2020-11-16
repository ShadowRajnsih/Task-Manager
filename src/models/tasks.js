const mongoose=require('mongoose')
const { default: validator } = require('validator')

const taskSchema=new mongoose.Schema(
{task:{type:String,
    required:true,
    trim:true
},
status:{type:Boolean,
    default:false
},
owner:{
    required:true,
    type:mongoose.Schema.Types.ObjectID
}},{
    timestamps:true
})

const Task=mongoose.model('Task',taskSchema)

module.exports =Task