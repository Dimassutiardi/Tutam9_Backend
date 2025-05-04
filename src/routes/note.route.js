const noteController = require("../controllers/note.controller.js");
const express = require('express');
const router = express.Router();

router.post('/', noteController.createNote);
router.get('/', noteController.getNotes);
router.get('/:id', noteController.getNote);
router.put('/:id', noteController.updateNote);
router.delete('/:id', noteController.deleteNote);

module.exports = router;