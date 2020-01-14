const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

router.get('/', async (req,res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch(err) {
        res.status(500).json({ message: err })
    }
});

router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });

    try {
        const savedPost = await post.save()
        res.status(200).json(savedPost)
    } catch (err) {
        res.status(500).json({ message: err})
    }
});

router.get('/:postId', async (req, res) => {
    console.log(req.params.postId)

    try {
        const post = await Post.findById(req.params.postId);
        if(post) {
            res.status(200).send(post)
        } else {
            res.status(404).json({ message: "Post not found" })
        }
    } catch(err) {
        res.status(404).json({ message: err })
    }
});

router.delete('/:postId', async (req, res) => {
    try {
        const removedPost = await Post.remove({_id: req.params.postId})
        res.status(200).json(removedPost)
    } catch(err) {
        res.status(404).json({ message: err })
    }
});

router.patch('/:postId', async (req, res) => {
    try {
        const updatedPost = await Post.updateOne(
            {_id:req.params.postId}, 
            {$set: {title: req.body.title, description: req.body.description}});
        res.status(200).json(updatedPost)            
        
    } catch(err) {
        res.status(404).json({ message: err })
    }
});

module.exports = router;