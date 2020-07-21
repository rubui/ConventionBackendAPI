var express = require('express');
var router = express.Router();

var speaker_controller = require('../controllers/speakerController');

//ROUTER FOR SPEAKERS

// GET request for list of all speaker.
router.get('/speakers', speaker_controller.speaker_get_all);

// POST request for creating a speaker
router.post('/speakers', speaker_controller.speaker_create);

// DELETE request to delete a speaker.
router.delete('/speakers/:id', speaker_controller.speaker_delete);

// GET request to update Speaker.
router.patch('/speakers/:id', speaker_controller.speaker_update);

// GET request for one Speaker.
router.get('/speakers/:id', speaker_controller.speaker_get);


module.exports = router;