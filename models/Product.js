const mongoose = require('mongoose')
const Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);


const ProductSchema = new Schema({
    name: {
        type: String,
        required: [true,'Please provide product name'],
    },
    description: {
        type: String,
        required: [true,'Please provide product description'],
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true,'Please provide category'],
    },
    modelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Model',
        required: [true,'Please provide model'],
    },
    price: {
        type: Number,
        required: [true,'Please provide price'],
    },
    slug: {
        type: String,
        slug: 'name',
    },
    dateCreated: {
        type: Date,
        default: new Date()
    },   
    image: {
        type: String, 
        required: [true, 'Please provide an image'],
    },
    feature: {
        type: Boolean,
        default: false
    },
    status: {
        type: Boolean,
        default: false
    }
});

ProductSchema.plugin(uniqueValidator);
    
    // export model
const Product = mongoose.model('Product',ProductSchema);
module.exports = Product
    