const mongoose = require('mongoose')
const Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt')


const UserSchema = new Schema({
    first_name: {
        type: String,
        required: [true,'Please provide first_name'],
    },
    last_name: {
        type: String,
        required: [true,'Please provide first_name'],
    },
    email: {
        type: String,
        required: [true,'Please provide email address'],
        unique: true
    },
    phone_number: {
        type: Number,
        required: [true,'Please provide phone number'],
    },
    country: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Country',
        required: [true,'Please provide country'],
    },
    address: {
        type: String,
        required: [true,'Please provide address'],
    },
    state: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'State',
        required: [true,'Please provide state'],
    },
    lga: {
        type: String,
        required: [true,'Please provide lga'],
    },
    password:  {
        type: String,
        required: [true,'Please provide password']

    },
    dateCreated: {
        type: Date,
        default: new Date()
    },   
    image: String,  
});

UserSchema.plugin(uniqueValidator, {message: 'email address is already taken'});


UserSchema.pre('save', function(next){
    const user = this
    bcrypt.hash(user.password, 10, (error, hash) => {
    user.password = hash
    next()
    })
})


    
    // export model
const User = mongoose.model('User',UserSchema);
module.exports = User
    