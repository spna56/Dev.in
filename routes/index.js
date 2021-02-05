const express = require("express");
const router = express();
const User = require('../models/User');
const passport = require("passport");


//landing
router.get('/', (req, res) => {
    res.render('landing')

})


//show signup page
router.get('/register', (req, res) => {
    res.render("register")
})

//show login page
router.get('/login', (req, res) => {
    res.render("login")
})


//logic for signup page
router.post('/register', (req, res) => {
    User.register(new User({ username: req.body.username, email: req.body.email }), req.body.password, (err, user) => {
        if (err) {
            console.log(err);
        } else {

            passport.authenticate("local")(req, res, () => {
                res.redirect('/login')
            })
            console.log(user)
        }

    })

})

//logic for login page
router.post('/login', passport.authenticate("local", {
    successRedirect: "/posts",
    failureRedirect: "/login"
}), (req, res) => {
    res.json({ success: true, message: "You are logged in" })
})

//logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/')
})

module.exports = router;