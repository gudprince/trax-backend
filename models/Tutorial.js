const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const TutorialSchema = new Schema({
    title: String,
    description: String,
    published: Boolean,      
    datePosted: { /* can declare property type with an object like this because we need 'default' */
        type: Date,
        default: new Date()
    },

});

const Tutorial= mongoose.model('Tutorial',TutorialSchema);
module.exports = Tutorial