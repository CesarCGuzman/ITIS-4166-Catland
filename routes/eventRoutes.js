// Modules
const express = require('express');
const controller = require('../controllers/eventController.js');
const { fileUpload } = require('../middlewares/fileUpload');
const { isLoggedIn, isAuthor } = require('../middlewares/auth');
const { validateId } = require('../middlewares/validator');

// Create a router
const router = express.Router();


//GET /events: index
router.get('/', controller.index);

//GET /events/new: send html form for creating a new event
router.get('/new', isLoggedIn, controller.new);

//POST /events: create a new event
router.post('/', isLoggedIn, fileUpload, controller.create);

//GET /events/:id: show a specific event
router.get('/:id', validateId, controller.show);

//GET /events/:id/edit: send html form for editing a specific event
router.get('/:id/edit', isLoggedIn, validateId, isAuthor, controller.edit);

//PUT /events/:id: update a specific event
router.put('/:id',  isLoggedIn, validateId, isAuthor, fileUpload, controller.update);

//DELETE /events/:id: delete a specific event
router.delete('/:id',  isLoggedIn, validateId, isAuthor, controller.delete);

// Export the router
module.exports = router;