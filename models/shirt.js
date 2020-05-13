const mongoose = require('mongoose');
const Schema = mongoose.Schema

const shirtSchema = mongoose.Schema({
    name:{
        required:true,
        type:String,
        maxlength:100
    },
    price: {
        required: true,
        type: Number,
        maxlength: 255
    },
    size: {
        required: true,
        type: String,
        maxlength: 255 
    },
    images: {
        type: Array,
        default: []
    }
         
    }, {timestamps:true, collection: 'Shirt'});

    const Shirt = mongoose.model('Shirt', shirtSchema);
    module.exports = {Shirt}


