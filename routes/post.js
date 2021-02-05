const express = require("express");
const router = express();
const Post = require('../models/Post')
const { isloggedin } = require('../middleware/index')



//show posts
router.get('/posts', async (req, res) => {
    const post = await Post.find({})
    .populate('user')
    res.render("posts/index", { post: post })

})

// show add post page
router.get('/posts/new', isloggedin, (req, res) => {
    res.render("posts/add")
})



//logic  for add post
router.post('/posts', async (req, res) => {
    const newPost = new Post({
        title: req.body.title,
        image: req.body.image,
        description: req.body.description,
        user: req.user._id
    })

    const data = await newPost.save()
    res.redirect("/posts")

})


//delete post
router.delete('/posts/:id', async (req, res) => {
    await Post.findByIdAndRemove(req.params.id)
    res.redirect('/posts')


})


//show comment page
router.get('/posts/comment/:id/new', (req, res) => {
    Post.findById(req.params.id)
        .populate('user')
        .populate('comments.commentuser')

        .exec((err, post) => {
            if (err) {
                console.log(err)
            }
            else {
                res.render("posts/show", { post: post })
            }
        })

})



//create a comment
router.post('/post/comment/:id', async (req, res) => {
    var posts = await Post.findById(req.params.id)
    const newComment = {
        commentbody: req.body.commentbody,
        commentuser: req.user.id
    }
    posts.comments.unshift(newComment)
    var post = await posts.save()
    res.redirect(`/posts/comment/${post._id}/new`)

})




//delete a comment
router.delete('/post/:id/comment/:comment_id', async (req, res) => {

    const post = await Post.findById(req.params.id);

    post.comments = post.comments.filter(
        ({ id }) => id !== req.params.comment_id
    );

    await post.save();

    res.redirect(`/posts/comment/${req.params.id}/new`)


})


//like a post
router.put('/post/like/:id', async (req, res) => {

    const post = await Post.findById(req.params.id)

    if (post.likes.some(like => like.user.toString() === req.user.id)) {

    }
    else {
        post.likes.unshift({ user: req.user.id })
        const data = await post.save()

    }
    res.redirect("/posts")




})




module.exports = router;