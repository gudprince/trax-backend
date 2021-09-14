const express = require('express')
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload')
const expressSession = require('express-session');
const flash = require('connect-flash');

var productRouter = require('./routes/productRouter');
var userRouter = require('./routes/userRouter');
var authRouter = require('./routes/authRouter');
var categoryRouter = require('./routes/categoryRouter');
var modelRouter = require('./routes/modelRouter');
var tutorialRouter = require('./routes/tutorialRouter');
var cors = require('cors')

const auth = require('./middleware/authMiddleware');


const bodyParser = require('body-parser')
mongoose.connect('mongodb://localhost/trax_database', {useNewUrlParser: true});


const app = new express()
app.use(cors())
const ejs = require('ejs')
app.set('view engine','ejs')
app.use(fileUpload())

app.use(express.static('public'))


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use(flash());

app.use(expressSession({
    secret: 'keyboard cat'
}))
    
global.loggedIn = null;
app.use("*", (req, res, next) => {
    loggedIn = req.session.userId;
    next()
});

app.use('/product', auth, productRouter);
app.use('/user', auth, userRouter);
app.use('/category',auth, categoryRouter);
app.use('/model', auth, modelRouter);
app.use('/auth', authRouter);
app.use('/tutorials',tutorialRouter);


app.use((req, res) => res.render('notfound'));
      
app.listen(4000, ()=>{
    console.log('App listening on port 4000')
})

