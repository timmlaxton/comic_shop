const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2')
const productSchema = mongoose.Schema({
    name:{
        required: true,
        type: String,
        maxlength:100
    },
    title:{
        required: true,
        type: String,
        maxlength:100
    },
    character:{
        type: Schema.Types.ObjectId,
        ref: 'Character',
        required: true
    },
    issue: { 
        required: true,
        type: Number,
        type: String,
        maxlength:100,
        maxlength: 255
    },
    description: {
        required: true,
        type: String,
        maxlength: 1000000
    },
    price: {
        required: true,
        type: Number,
        maxlength: 255
    },
    publisher: {
        type: Schema.Types.ObjectId,
        ref: 'Publisher',
        required: true
    },
    catergory: {
        type: Schema.Types.ObjectId,
        ref: 'Catergory',
        required: true
    },
    amount:{
        type: Number,
        maxlength: 100,
        default: 0
    },
    sold:{
        type: Number,
        maxlength: 100,
        default: 0
   
    },
    publish: {
        required: true,
        type: Boolean
    },
    images: {
        type: Array,
        default: []
    },
    available: {
        type: String,
        maxlength: 100,
        required: true
    }

}, {timestamps:true,  collection:'Product'});
productSchema.plugin(mongoosePaginate)
const Product = mongoose.model('Product', productSchema);
module.exports = {Product}