const mongose = require('mongoose');

const username = new mongoose.schema({
      Name:{
        typeString,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    verified:{
        type:Boolean,
        default:false
    },
    verficationToken:String,
    address:[
        {
           name:string,
           mobileNo:String,
           houseNo:String,
           street:String,
           landmark:String,
           city:String,
           country:string,
           postalcode:String
        }
    ],
    orders:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Order"
        }
    ],
    createdAt:{
       type:Data,
       default:Date.now,
    },


});

const User = mongoose.model('User',userSchema);

module.exports = User;