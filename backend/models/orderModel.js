import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    userId:{type:String,required:true},
    // items:{type:Array,required:true},

    items: [
        {
            name: { type: String, required: true },  
            itemId: { type: String, required: true },
            quantity: { type: Number, required: true },
            size: { type: String, required: true }  // Add size field here
        }
    ],
    amount:{type:Number,required:true},
    address:{type:Object,required:true},
    status:{type:String,default:"Order Processing"},
    date:{type:Date,default:Date.now()},
    payment:{type:Boolean,default:false}
})

const orderModel = mongoose.models.order || mongoose.model("order",orderSchema)

export default orderModel;