const User = require('../models/User.js')
const State = require('../models/State.js')
const Country = require('../models/Country.js')
const path = require('path')
const fs = require('fs')
const bcrypt = require('bcrypt')


module.exports.index = async (req,res)=>{
    const user = await User.find({})
    res.render('user/index',{user, message: req.flash('success')})
}

module.exports.getLga = async (req,res)=>{
    const stateLga = await State.findById(req.params.id)
    res.send(stateLga.lgas)
}

module.exports.create = async (req, res) =>{

    var username = ""
    var password = ""
    const data = req.flash('data')[0];
    if(typeof data != "undefined"){
        username = data.username
        password = data.password
    }
    const country = await Country.find({})
    const state = await State.find({})
    res.render('user/create', {
        
        //errors: req.session.validationErrors
        errors: req.flash('validationErrors'),
        username: username,
        password: password,
        country:country,
        state: state
        
        }) // render register.ejs
}


module.exports.store = async (req, res)=>{

    let target_image = req.files.image;
    var image = new Date().getTime() +'_'+target_image.name;

    target_image.mv(path.resolve(__dirname,'..','public/images/user',image),async (error)=>{
        console.log(error)
        try {
        await User.create({...req.body,image: '/images/user/' + image})

        req.flash('success', 'User Added Successfully ');

        res.redirect('/user')
        }
        catch(error) {
            const validationErrors = Object.keys(error.errors).map(key =>
                error.errors[key].message)
                req.flash('validationErrors',validationErrors)
               res.redirect('/user/create')
        }
    })
}

module.exports.find = async (req,res)=>{

    const state = await State.find({})
    const country = await Country.find({})
    const user = await User.findById(req.params.id).populate('state').populate('country');
    res.render('user/edit',{user, state, country, errors: req.flash('validationErrors')})
}

module.exports.update = async (req, res) =>{
    try{
        if (req.files) {

            if(req.body.password) {
                req.body.password = await bcrypt.hash(req.body.password, 10);
            }
            else {
                delete req.body.password;
            }
            let target_image = req.files.image;
            var image = new Date().getTime() +'_'+target_image.name;

            await target_image.mv(path.resolve(__dirname,'..','public/images/user',image));
           
                var oldImage = await User.findByIdAndUpdate(req.params.id, {...req.body,image: '/images/user/' + image})
                if(fs.existsSync('public/'+oldImage.image)) {
                    fs.unlinkSync('public/'+oldImage.image)
                }
                req.flash('success', 'User Updated Successfully ');
                res.redirect('/user')
        }
        else{
            var password =  req.body.password
            if(password) {
               
                hashPassword = await bcrypt.hash(password, 10);
                req.body.password =  hashPassword;
            }
            else {
                delete req.body.password;
            }
            delete req.body.image;
           
            await User.findByIdAndUpdate(req.params.id, req.body);
                req.flash('success', 'User Updated Successfully ');
                res.redirect('/user')
        }
    }
    catch(e){
        console.log(e.code)
        if(e.code ==11000) {
            req.flash('validationErrors','email address already exist')
        }
        res.redirect('back')
        
    }
}


module.exports.delete = (req, res) =>{
    User.findByIdAndDelete(req.params.id, (error, user) =>{
        
        if(fs.existsSync('public/'+user.image)) {
        fs.unlinkSync('public/'+user.image)
    }
    req.flash('success', 'User Deleted Successfully ');
    res.redirect('/User')
    })
} 


    
  

