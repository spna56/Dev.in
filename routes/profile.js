const express = require('express');
const router = express();
const multer = require('multer')
const moment = require('moment');
const mongoose = require('mongoose')
const Profile = require('../models/Profile')
const Post =require('../models/Post')
const User=require('../models/User')

mongoose.set('debug', true)


//multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    }
    ,
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }

});

const filefilter = (req, res, cb) => {
//reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    }
    else {
        cb(null, false)
    }

}
const upload = multer({ storage: storage }, { filefilter: filefilter })




//show index
router.get('/index', async (req, res) => {
    const profile = await Profile.find({})
    res.render('profile/index', { profile, profile })
})


//show profile page
router.get('/profiles',(req,res)=>{
    res.render('profile/show')

})



//show dashboard
router.get('/dashboard', async (req, res) => {

    const profile = await Profile.findOne({ user: req.user.id })
        .populate('user')


    res.render('profile/dashboard', { profile: profile, moment: moment })
})


//show add page
router.get('/profile/add', (req, res) => {
    res.render('profile/add')
})


//add profile
router.post('/profile', upload.single('Image'), async (req, res) => {

    const newProfile = {
        user: req.user.id,
        Name: req.body.Name,
        Headline: req.body.Headline,
        Country: req.body.Country,
        Website: req.body.Website,
        githubusername: req.body.githubusername,
        linkedin: req.body.linkedin,
        facebook: req.body.facebook,
        skills: req.body.skills,
     //   Image:req.file.Image
        

    }
    if(req.file){
        const Image=req.file.path;
        newProfile.Image=Image

    }

    

    const data = await Profile.findOneAndUpdate({ user: req.user.id }, { $set: newProfile }, { new: true, upsert: true })

    res.redirect('/dashboard')
})

//show profile edit page
router.get('/profile/edit', async (req, res) => {
    const profile = await Profile.findOne({ user: req.user.id })

    res.render('profile/edit', { profile: profile })
})


//show education page
router.get('/profile/education/:id', async (req, res) => {
    const profile = await Profile.findById(req.params.id)
    res.render('profile/education', { profile: profile })

})


//add education
router.post('/profile/education/:id', async (req, res) => {

    const profile = await Profile.findById(req.params.id)

    const neweducation = {
        School: req.body.School,
        Degree: req.body.Degree,
        Program: req.body.Program,
        Current: req.body.Current,
        StartDate: new Date(),
        EndDate: new Date(),
        Description: req.body.Description

    }



    profile.education.unshift(neweducation)
    const data = await profile.save()
    res.redirect('/dashboard')

})

/*
//show education edit page
router.get('/profile/education/:id/edit/:education_id',async (req,res)=>{
   const profile=await Profile.findById(req.params.id)
    
   //whenever you have an array of objects
   const education=profile.education.find(
       education=>education.id===req.params.education_id
   );
 
res.render('profile/educationedit',{profile_id:req.params.id,education:education})
    

})

//update
router.put('/profile/:id/education/:education_id',async (req,res)=>{
  

    const newedu={
        School:req.body.School
    }
    const profile=await Profile.findById(req.params.id)

    const index=profile.education.findIndex(

        education=>education.id===req.params.education_id


        
    );
    profile.education[index]=newedu
    const data=await profile.save()
    console.log(data)
})
*/

//delete
router.delete('/profile/:id/education/:education_id', async (req, res) => {

    const profile = await Profile.findById(req.params.id);

    profile.education = profile.education.filter(
        ({ id }) => id !== req.params.education_id
    );

    await profile.save();

    res.redirect('/dashboard')


})

//show workexperience page
router.get('/profile/experience/:id', async (req, res) => {
    const profile = await Profile.findById(req.params.id)
    res.render("profile/workexperience", { profile: profile })
})

//add workexperience page
router.post('/profile/experience/:id', async (req, res) => {

    const profile = await Profile.findById(req.params.id)

    const newworkexperience = {
        Company: req.body.Company,
        Role: req.body.Role,
        Location: req.body.Location,
        Current: req.body.Current,
        StartDate: new Date(),
        EndDate: new Date(),
        Description: req.body.Description

    }



    profile.workexperience.unshift(newworkexperience)
    const data = await profile.save()

    res.redirect('/dashboard')

})

//DELETE workexperience
router.delete('/profile/:id/experience/:work_id', async (req, res) => {

    const profile = await Profile.findById(req.params.id);

    profile.workexperience = profile.workexperience.filter(
        ({ id }) => id !== req.params.work_id
    );

    await profile.save();

    res.redirect('/dashboard')


})

//DELETE PRofile
router.delete('/profile/delete', async (req,res)=>{
    await Profile.findOneAndDelete({user:req.user.id})

    await Post.deleteMany({user:req.user.id})

    await User.findOneAndDelete({_id:req.user.id})
    res.redirect('/')

})




module.exports = router
