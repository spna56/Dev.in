const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const Schema = mongoose.Schema;

const User = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }

})

//plugin for passport-local-mongoose
User.plugin(passportLocalMongoose);



module.exports = mongoose.model("user", User);