const express = require('express');
const router = express.Router();

var attendee_controller = require('../controllers/AttendeeController.js');

// GET request for getting a list of all attendees
router.get('/', attendee_controller.attendee_get_all);

// POST request for creating an attendee
router.post('/', attendee_controller.attendee_create);

// DELETE request to delete an attendee.
router.delete('/:id', attendee_controller.attendee_delete);

// PATCH request to update an attendee.
router.put('/:id', attendee_controller.attendee_update);

// GET request for a single attendee.
router.get('/:id', attendee_controller.attendee_get);

module.exports = router;