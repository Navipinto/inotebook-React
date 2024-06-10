const express = require("express");
const fetchUser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const Notes = require("../models/Notes");

//Router 01:Fetch all notes using: GET(/api/notes/fetchallnotes) login required
router.get(
    "/fetchallnotes", fetchUser,
    async (req, res) => {
        try {
          const notes = await Notes.find({ user: req.user.id });
          res.send(notes);
        } catch (error) {
            console.error((error = error.message));
            res.status(500).send("Internal Server Error");
        }
    })

//Router 02:adding new notes using: POST(/api/notes/addnotes) login required
router.post(
  "/addnotes",fetchUser,
  [
    body("title","title should have minimum length 3").isLength({ min: 3 }),
    body("description","description should have minimum length 5").isLength({ min: 5 }),
  ],
//if any errors are there while giving inputs will be identified here
  async (req, res) => {

    try {
      const errors = await validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { title, description, tag } = req.body;

      const notes = new Notes({
        title,
        description,
        tag,
        user:req.user.id
      });

      const savedNote = await notes.save();
      res.send(savedNote);
    } catch (error) {
        console.error((error = error.message));
        res.status(500).send("Internal Server Error");
    }
})

//Router 03:updating the notes using: PUT(/api/notes/updatenotes) login required
router.put(
  "/updatenotes/:id",fetchUser,
//if any errors are there while giving inputs will be identified here
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;

      //create new notes
      const newNote = {};

      if (title) {
        newNote.title = title;
      }
      if (description) {
        newNote.description = description;
      }
      if (tag) {
        newNote.tag = tag;
      }

      //check the user
      let notes = await Notes.findById(req.params.id);
      if (!notes) {
        res.status(401).send("User not found");
      }
      if (notes.user.toString() !== req.user.id) {
        res.status(401).send("Not allowed");
      }

      notes = await Notes.findByIdAndUpdate(
        req.params.id,
        { $set: newNote },
        { new: true }
      );
      res.send({ notes });
    } catch (error) {
        console.error((error = error.message));
        res.status(500).send("Internal Server Error");
    }
  })

//Router 0:deleting the notes using: DELETE(/api/notes/deletenotes) login required
router.delete(
  "/deletenotes/:id",fetchUser,
//if any errors are there while giving inputs will be identified here
  async (req, res) => {
    try {
      let notes = await Notes.findById(req.params.id);
      if (!notes) {
        res.status(401).send("User not found");
      }
      if (notes.user.toString() !== req.user.id) {
        res.status(401).send("Not allowed");
      }

       notes= await Notes.findByIdAndDelete(req.params.id);
       res.send("Deleting the node succesful")
    }
    catch(error)
    {
      console.error((error = error.message));
      res.status(500).send("Internal Server Error");
    }
    })

      
module.exports = router;