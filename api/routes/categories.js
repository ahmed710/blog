const router= require('express').Router(); 
const { update } = require('../model/Post');
const Post = require('../model/Post');

router.post("/",async(req,res)=>{
    const newPost = new Post(req.body); 
    try {
        const savePost = await newPost.save(); 
        res.status(200).json(sevaPost)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports= router