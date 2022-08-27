const express = require('express');
const router=express.Router();
const { body, validationResult } = require('express-validator');
const Note = require('../models/Note');
const fetchuser = require('../middleware/fetchuser');



// Route1: Fetch all Notes using: GET"/api/notes/getuser. Login required
router.get('/fetchnotes',fetchuser,async (req,res)=>{
    try {
        const notes= await Note.find({user:req.user.id});
        res.json(notes);
    } catch (error){
        console.log(error.message);
        res.status(500).send("Some Internal Server error occured in route1 fetch notes")
      }
})

// Route2: Add a new Note using : POST "/api/notes/addnote". login required
router.post('/addnote',fetchuser,[
    body('title','Enter Valid title').isLength({ min: 4 }),
    body('description','Description Should be more Than 5 characters').isLength({ min: 5 })
], async (req,res)=>{
try {
    const {title,description,tag}=req.body;
 // If there is errors , return bad request and the errors

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // console.log(req.body)
    // console.log(user)
    const note = new Note({
        title,description,tag,user: req.user.id
    })

    const savedNote= await note.save()
    res.json(savedNote)
    // console.log(savedNote);

} catch (error){
    console.log(error.message);
    res.status(500).send("Some Internal Server error occured in route2 new note ")
  }
})


// Route3 -Update Notes using : PUT:/api/notes/updatenote/:id. login required
router.put('/updatenote/:id',fetchuser, async (req,res)=>{
    const {title,description,tag}=req.body;
    try {
        // Create a new object
        const newNote={};
        if(title){newNote.title=title};
        if(description){newNote.description=description};
        if(tag){newNote.tag=tag};

        // Find the note to  be Updated and update it

        let note= await Note.findById(req.params.id);
        if(!note){
            return res.status(404).send("Not Found")
        }
        if(note.user.toString()!== req.user.id){
            return res.status(401).send("You are Not Allowed")
        }

        note=await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true}) // new:true used to ensure that the new content will be updated 
        res.send({note})        
    } catch (error){
        console.log(error.message);
        res.status(500).send("Some Internal Server error occured in route3 update note ")
      }
})

// Route4- Delete An existing note using:  DELETE:/api/notes/deletenote/:id

router.delete('/deletenote/:id',fetchuser, async (req,res)=>{
    try {
        // Find the note to  be Delete it
        let note= await Note.findById(req.params.id);
        if(!note){
            return res.status(404).send("Not Found")
        }

        // Detect whether the same user who own this note is occuring the process
        if(note.user.toString()!== req.user.id){
            return res.status(401).send("You are Not Allowed")
        }

        note=await Note.findByIdAndDelete(req.params.id) 
        res.send({"Success":"Note Has Been Deleted",note:note})        
    } catch (error){
        console.log(error.message);
        res.status(500).send("Some Internal Server error occured in route4 delete note ")
      }
})


module.exports=router;