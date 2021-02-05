const mongoose = require('mongoose')

const Schema =  mongoose.Schema;

const Profile = new Schema({
    user: {
       type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    
    Name: {
        type: String
    },
    Headline: {
        type: String
    },
    Website: {
        type: String
    },
    Country: {
        type: String
    },
    Image:{
       type:String
    },
    skills: {
       
        type: String

    },
    education: [
        {
            School: {
                type: String
            },
            Degree: {
                type: String
            },
            Program: {
                type: String
            },
            Current:{
                type:String,
                
            },
            StartDate: {
                type: Date
            },
            EndDate: {
                type: Date
            },
           
            Description: {
                type: String
            }

        }
    ],
    workexperience: [
        {
            Company: {
                type: String
            },
            Role: {
                type: String
            },
            location: {
                type: String
            },
            StartDate: {
                type: Date
            },
            EndDate: {
                type: Date
            },
            Description: {
                type: String
            }

        }
    ],
    githubusername: {
        type: String
    },
    linkedin: {         
            type: String
        },
    facebook: {
            type: String
        }
    
    
})

module.exports=mongoose.model('profile',Profile)