const mongoose = require('mongoose')
const Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');


const StateSchema = new Schema({
    state: {
        type: String,
        required: [true,'Please provide state name'],
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    lgas: [String],
    dateCreated: {
        type: Date,
        default: new Date()
    },    
});

StateSchema.plugin(uniqueValidator);
    
    // export model
const State = mongoose.model('State',StateSchema);
module.exports = State