const express = require("express");
const router = express.Router();
const members = require("../../Members");


// Get all members
router.get("/", (req,res)=>{
    res.json(members)
});

// Get a specific member
router.get("/:id",(req,res)=>{
    var found = members.some(member => member.id === +req.params.id);
    if(found) res.json(members.filter(member => member.id === +req.params.id))
    else{
        res.status(404).json({msg:"Ooopps! Member Not found with that Id"})
    }
});


// Add a member through Post method
router.post("/",(req, res) => {
    const newMember = {
        id:req.body.id,
        name:req.body.name,
        email:req.body.email,
        core:req.body.core
    }

    if(!newMember.name || !newMember.email){
        res.status(404).json({msg:"Please add your name or email address !!"})
    }else{
        members.push(newMember);
        res.json(members);
    }
});

// Update a member
router.put("/:id",(req,res) => {
    var found = members.some(member => member.id === +req.params.id);

    if(found){
        const updMember = req.body;
        members.forEach(member => {
            if(member.id === +req.params.id){
                member.name = updMember.name ? updMember.name : member.name;
                member.email = updMember.email ? updMember.email : member.email;

                res.json({msg:"Member updated successul !!",member})
            }
        })

    }else{
        res.status(404).json({msg:"Ooopps! Member Not updated !!"}) 
    }
});



module.exports = router;