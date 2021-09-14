const mongoose = require('mongoose')
const Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);


const CategorySchema = new Schema({
    name: {
        type: String,
        required: [true,'Please provide category name'],
    },
    slug: { type: String, slug: "name" },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    dateCreated: {
        type: Date,
        default: new Date()
    },    
});

CategorySchema.plugin(uniqueValidator);
    
    // export model
const Category = mongoose.model('Category',CategorySchema);
module.exports = Category
    