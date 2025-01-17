const mongoose = require('mongoose')
const {v4: uuidv4} = require('uuidv4')
const ticketSchema = new mongoose.Schema({
    code:{
        type: String,
        unique:true,
        default: ()=> uuidv4(),
        required: true
    },
    purchase_datetime:{
        type: Date,
        default: Date.now,
        required:true
    },
    amount:{
        type:number,
        required:true
    },
    purchaser:{
        type:String,
        required:true,
        validate: {
            validator: (email) =>{

                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
            },
            message:'El formato no es correcto'
        }
    }
})
module.exports = mongoose.model('ticket', ticketSchema)