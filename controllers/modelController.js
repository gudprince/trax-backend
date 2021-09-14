const productModel = require('../models/Model.js')
const path = require('path')

module.exports.index = async (req,res)=>{
    const model = await  productModel.find({});
    
        res.render('model/index',{model, message: req.flash('success')})
}

module.exports.find = async (req,res)=>{
    const model = await  productModel.findById(req.params.id);
    return res.render('model/edit',{model})
}


module.exports.store = (req, res)=>{
    productModel.create(req.body, (error, model) => {
    if(error){
        const validationErrors = Object.keys(error.errors).map(key =>
        error.errors[key].message)
        req.flash('validationErrors',validationErrors)
        req.flash('data',req.body)

    //req.session.validationErrors = validationErrors
        return res.redirect('/model/create')
    }
    req.flash('success', 'Model Added Successfully ');
    
    return res.redirect('/model')
    })
}

module.exports.create = (req, res) =>{

        return res.render("model/create", {
            createPost: true
    })
}

module.exports.update = (req, res) =>{
    productModel.findByIdAndUpdate(req.params.id, req.body
    , (error, model) =>{
        if (error) {
            console.log(error)
        }
        req.flash('success', 'Model Updated Successfully ');
    
        return res.redirect('/model')
    })
} 


module.exports.delete = (req, res) =>{
    productModel.findByIdAndDelete(req.params.id, (error, model) =>{
        req.flash('success', 'Model Deleted Successfully ');
    
        return res.redirect('/model')
    })
} 