const Category = require('../models/Category.js')
const path = require('path')


module.exports.index = async (req,res)=>{
    try {
        const category = await Category.find({}).populate('userid');
   
        
        res.render('category/index',{category, message: req.flash('success')})

    }
    catch(e){
        console.log(e)
    }
}

module.exports.find = async (req,res)=>{
    const category = await Category.findById(req.params.id).populate('userid');

    res.render('category/edit',{category})
}


module.exports.store = (req, res)=>{
    
    Category.create(req.body, (error, user) => {
        if(error){
            
            const validationErrors = Object.keys(error.errors).map(key =>
            error.errors[key].message)
            req.flash('validationErrors',validationErrors)
            req.flash('data',req.body)

    //req.session.validationErrors = validationErrors
    //console.log(error)
        return res.redirect('/category/create')
    }
    req.flash('success', 'Category Added Successfully ');
    
    return res.redirect('/category')
 
    })
}

module.exports.create = (req, res) =>{
    
    return res.render("category/create", {createPost: true})

}

module.exports.update = (req, res) =>{
    Category.findByIdAndUpdate(req.params.id, req.body, 
        (error, category) =>{
            if(error) {
                console.log(error)
            }
            req.flash('success', 'Category Updated Successfully ');
    
            return res.redirect('/category')
    })
} 


module.exports.delete = (req, res) =>{
    Category.findByIdAndDelete(req.params.id, (error, category) =>{
        req.flash('success', 'Category Deleted Successfully ');
        return res.redirect("/category")
    })
}  