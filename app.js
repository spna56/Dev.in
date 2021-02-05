const express = require("express");
const app = express();
const methodOverride = require('method-override')
const index = require('./routes/index')
const post = require('./routes/post')
const profile=require('./routes/profile')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local')
const User = require('./models/User')

//express-session
app.use(require('express-session')({
    secret: "rusty",
    resave: false,
    saveUninitialized: false
}))

//mongodb connection
mongoose.connect('mongodb+srv://Username:<password>@cluster0-3w6sp.mongodb.net/devconnect?retryWrites=true&w=majority', () => {
    console.log(`Connected to the database`)
})

app.use('/uploads', express.static('uploads'));
app.use(express.static(__dirname+"/public"));






//method-override
app.use(methodOverride("_method"));


//passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//ejs
app.set('view engine', 'ejs');

//middleware bodyparser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//locals
app.use(function(req,res,next){
    res.locals.user=req.user;
    next();
})


//middleware for using other routes
app.use('/', index);
app.use('/', post);
app.use('/',profile);



const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server has started at ${PORT}`)
})