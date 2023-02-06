const router= require('express').Router(); 
const { update } = require('../model/Post');
const Post = require('../model/Post');

router.post("/",async(req,res)=>{
    const newPost = new Post(req.body); 
    try {
        const savePost = await newPost.save(); 
        res.status(200).json(savePost)
    } catch (error) {
        res.status(500).json(error)
    }
})

//update post 
router.put("/:id",async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id)
        if( post.username=== req.body.username){
            try{
                const updatePost= await Post.findByIdAndUpdate(
                    req.params.id
                    ,{
                        $set : req.body
                    },{
                        new: true,
                    }
                )
                res.status(200).json(updatePost)
            }catch(error){
                res.status(200).json(error)
            }
        }else{
            res.status(401).json("You can update only ur post ")
        }
    }catch(error){
        res.status(500).json(error)
    }
})


//get all posts 
router.get("/", async (req,res)=>{
    const username = req.query.user; 
    const catName = req.query.cat ;
    try {
        let posts 
        if(username){
            posts = await Post.find({username: username})
        }else if (catName){
            posts = await Post.find({
                categories:{
                    $in: [catName],
                },
            })
        }else{
            posts = await Post.find()
        }
        res.status(404).json(posts)
    } catch (error) {
        res.status(404).json(error)
    }
})
module.exports= router