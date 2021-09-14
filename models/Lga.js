const mongoose = require('mongoose')
const Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');


const LgaSchema = new Schema({
    name: {
        type: String,
        required: [true,'Please provide Lga name'],
    },
    Users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    dateCreated: {
        type: Date,
        default: new Date()
    },    
});

LgaSchema.plugin(uniqueValidator);
    
    // export model
const Lga = mongoose.model('Lga',StateSchema);
module.exports = Lga