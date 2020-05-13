const mongoose = require('mongoose');

const standingSchema = mongoose.Schema({
    name:{
        required: true,
        type: String,
        maxlength:100
    },
    surname:{
        required: true,
        type: 'String',
        maxlength:100
    },
    address:{
        required: true,
        type: String,
        maxlength:1000
    },
    city:{
        required: true,
        type: String,
        maxlength:100
    },
    postcode:{
        required: true,
        type: String,
        maxlength:100
    },
    email: { 
        required: true,
        type: String,
        maxlength: 255
    },
    description: {
        required: true,
        type: String,
        maxlength: 1000000
    },
    phone: {
        required: true,
        type: Number,
        maxlength: 255
    }
}, {  collection: 'Standing'})


const Standing = mongoose.model('Standing', standingSchema)

module.exports = {Standing}