const BlogPost = require('../models/BlogPost.js')
const fileUpload = require('express-fileupload')
const path = require('path')

module.exports.find = async (req,res)=>{
const blogpost = await BlogPost.findById(req.params.id).populate('userid');
console.log(blogpost)
    res.render('post',{blogpost})
}


module.exports.store = (req,res)=>{
let image = req.files.image;
image.mv(path.resolve(__dirname,'..','public/assets/img',image.name),async (error)=>{
await BlogPost.create({
    ...req.body, 
    image: '/assets/img/' + image.name,
    userid: req.session.userId})
    
    req.flash('success', 'Model Added Successfully ');
    res.redirect('/')
})
}

module.exports.newPost = (req, res) =>{
    if(req.session.userId){
        return res.render("create", {
            createPost: true
        });
    }
    res.redirect('/user/auth/login')
}