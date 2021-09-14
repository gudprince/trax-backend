const mongoose = require('mongoose')
const Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);


const ModelSchema = new Schema({
    name: {
        type: String,
        required: [true,'Please provide model name'],
    },
    slug: {
        type: String,
        slug: 'name',
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    }],
    dateCreated: {
        type: Date,
        default: new Date()
    },     
});

ModelSchema.plugin(uniqueValidator);
    
    // export model
const Model = mongoose.model('Model',ModelSchema);
module.exports = Model