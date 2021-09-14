const mongoose = require('mongoose')
const Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');


const CountrySchema = new Schema({
    name: {
        type: String,
        required: [true,'Please provide country name'],
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    dateCreated: {
        type: Date,
        default: new Date()
    },    
});

CountrySchema.plugin(uniqueValidator);
    
    // export model
const Country = mongoose.model('Country',CountrySchema);
module.exports = Country