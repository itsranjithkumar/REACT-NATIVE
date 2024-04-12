const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
},
product:[
    {
        name:{
            type:String,
            required:true
        },
        quantity:{
            type:Number,
            required:true
        },
        price:{
            type:Number,
            required:true
        },
        image:{
            type:String,
            required:true
        },
    },
],
totalprice:{
    type:Number,
    required:true
},
shippingAddress:{
    name:{
         type:String,
         required:true
}, 
    mobileNo:{
        type:String,
        required:true,
    },
    houseNo:{
        type:String,
        required:true,
}, 
street:{
    type:String,
    required:true,
},
landmark:{
    type:String,
    required:true,
},
postalcode:{
    type:String,
    required:true,
},

},
paymentmethod:{
    type:String,
    required:true,
},
createdAt:{
    type:Date,
    default:Date.now
}
});


const order = mongoose.model('Order',orderSchema);

module.exports = order;

    