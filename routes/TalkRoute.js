var express = require('express');
var router = express.Router();

var talk_controller = require('../controllers/TalkController.js'); 

//ROUTERS FOR TALKS

//GET request for a list of all the talks
router.get('/', talk_controller.talk_get_all);

// POST request for creating a talk
router.post('/', talk_controller.talk_create);

// PATCH request to update a talk given its ID
router.put('/:id', talk_controller.talk_update);

// DELETE request to delete a talk
router.delete('/:id', talk_controller.talk_delete);

// GET request to specific talk
router.get('/:id', talk_controller.talk_get);

router.patch('/:id/add/', talk_controller.talk_add_new_attendee);

module.exports = router;