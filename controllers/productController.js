const Product = require('../models/Product.js')
const category = require('../models/Category.js')
const productModel = require('../models/Model.js')
const path = require('path')
const fs = require('fs')

module.exports.index = async (req,res)=>{
    const product = await Product.find({}).populate('categoryId').populate('modelId');
    res.render('product/index',{product, message: req.flash('success')})
}

module.exports.find = async (req,res)=>{

    const cat = await category.find({})
    const model = await productModel.find({})
    const product = await Product.findById(req.params.id).populate('categoryId').populate('modelId');
    res.render('product/edit',{product, cat, model})
}


module.exports.store = (req, res)=>{

    let target_image = req.files.image;
    var image = new Date().getTime() +'_'+target_image.name;
    req.body.status = Boolean(req.body.status);
    req.body.feature = Boolean(req.body.feature)
    target_image.mv(path.resolve(__dirname,'..','public/images/product',image),async (error)=>{
        console.log(error)
        await Product.create({...req.body,image: '/images/product/' + image})

        req.flash('success', 'Product Added Successfully ');

        res.redirect('/product')
    })
}

module.exports.create = async (req, res) =>{
    
    const cat = await category.find({})
    const model = await productModel.find({})
    return res.render("product/create", {model,cat})
}

module.exports.update = async (req, res) =>{
    if (req.files) {

        let target_image = req.files.image;
        var image = new Date().getTime() +'_'+target_image.name;
        console.log(image.name)
        req.body.status = Boolean(req.body.status);
        req.body.feature = Boolean(req.body.feature)
        target_image.mv(path.resolve(__dirname,'..','public/images/product',image),async (error)=>{
            console.log(error)
            var oldImage = await Product.findByIdAndUpdate(req.params.id, {...req.body,image: '/images/product/' + image})
            if(fs.existsSync('public/'+oldImage.image)) {
                fs.unlinkSync('public/'+oldImage.image)
            }
            req.flash('success', 'Product Updated Successfully ');

            res.redirect('/product')
        })
    }
    else {
        const prod = await Product.findById(req.params.id);
       
        req.body.feature = Boolean(req.body.feature)
        req.body.status = Boolean(req.body.status);

        await Product.findByIdAndUpdate(req.params.id, {...req.body, image: prod.image});
        req.flash('success', 'Product Updated Successfully ');
        res.redirect('/product')
    }

} 


module.exports.delete = (req, res) =>{
    Product.findByIdAndDelete(req.params.id, (error, product) =>{
        
        if(fs.existsSync('public/'+product.image)) {
            fs.unlinkSync('public/'+product.image)
        }
        req.flash('success', 'Product Deleted Successfully ');
        res.redirect('/product')
    })
} 