const router= require('express').Router(); 
const User = require('../model/User'); 
const Post = require('../model/Post'); 
const bcrypt = require('bcrypt'); 

//update 
router.put("/:id",async(req,res)=>{
    if (req.body.userId=== req.params.id){
        if(req.body.password){
            const salt = await bcrypt.genSalt(10)
            req.body.password= await bcrypt.hash(req.body.password,salt )
        }
        try{
            const updateUser= await  User.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                {
                    new: true, 
                }
            )
            res.status(200).json(updateUser)
        }catch(err){
            res.json(500).json(error)
        }
    } else {
        res.status(401).json("You can update your account ")
    }
})

//delete 

router.delete("/:id",async(req,res)=>{
    if (req.body.userId === req.params.id){
        try{
        const user= await User.findById(req.params.id)
        try {
        await  Post.deleteMany({ username : user.username })

        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been deleted...")
        } catch (error) {
            res.json(500).json(error)
        }}catch(error){
            res.status(404).json("user not found ")
        }
    }else{
        res.status(401).json("You can delete only your account ....")
    }
})


//get User 
router.get("/:id",async (req,res)=>{
    try{
        const user = await User.findById(req.params.id)
        const { password, ...other} = user._doc
        res.status(200).json(other)
    }catch(error){
        res.status(400).json(other)
    }
})
module.exports= router