const User = require('../models/User.js')
const passwordReset = require('../models/passwordReset.js')
const bcrypt = require('bcrypt')
const crypto = require("crypto");
const sendEmail = require("../mail/passwordReset");


module.exports.login = (req, res) =>{
    res.render('user/login', {
        error: req.flash('error'),
        message: req.flash('success')
    })
}

module.exports.logout = (req, res) =>{
    req.session.destroy(() =>{
        res.redirect('/auth/login')
    })
}



module.exports.loginUser = (req, res) =>{
    const { email, password } = req.body;
    User.findOne({email: email}, (error,user) => {
        if (user){  
            bcrypt.compare(password, user.password, (error, same) =>{
                if(same){ // if passwords match
                    
                    req.session.userId = user._id
                    res.redirect('/product')
                }
                else{
                    req.flash('error', 'Invalid email/pasword');
                    res.redirect('/auth/login')
                }
            })
        }
        else{
            req.flash('error', 'Invalid email/pasword');
            res.redirect('/user/login')
        }
    })
}

module.exports.forgotPassword = async (req, res) =>{
    
    try {
       
        const user = await User.findOne(req.body);
        if (!user) {
            req.flash('error', 'account not found');
            return res.redirect('/auth/password-reset');
        }

        let token = await passwordReset.findOne({ userId: user._id });
        if (!token) {
            token = await new passwordReset({
                userId: user._id,
                token: crypto.randomBytes(32).toString("hex"),
            }).save();
        }

        const link = `http://localhost:4000/auth/recovery-password/${user._id}/${token.token}`;
        await sendEmail(user.email, "Password reset", link);

        req.flash('success', 'password reset link sent successfully');
        return res.redirect('back');
        
    } catch (error) {
        req.flash('error', error);
        return res.redirect('/auth/password-reset');
    }
}

module.exports.passwordReset = async (req, res) =>{
    try {
        
        const user = await User.findById(req.params.userId);
        
        if (!user) {
            req.flash('error', 'invalid link or expired');
            return res.redirect('/auth/login');
        }
        const token = await passwordReset.findOne({
            userId: user._id,
            token: req.params.token,
        });
        if (!token) {
            return res.status(400).send("Invalid link or expired");
        }

        req.body.password = await bcrypt.hash(req.body.password, 10);
        await User.findByIdAndUpdate(req.params.userId, req.body);
        await token.delete();

        req.flash('success', 'password changed successfully');
        return res.redirect('/auth/login');

    } catch (error) {
        res.send("An error occured");
        console.log(error);
    }
}

module.exports.passwordForm = (req, res) =>{
    
    res.render('user/forgotPassword', {
        error: req.flash('error'),
        message: req.flash('success')
    })
    
}

module.exports.passwordResetForm = (req, res) =>{
   
    res.render('user/passwordResetForm', {
        error: req.flash('error'),
        token: req.params.token,
        userId:  req.params.userId,
        message: req.flash('success')
    })
    
}