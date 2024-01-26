const express = require('express');
const router = express.Router();
const body_parser = require('body-parser');
const contactsController = require("../controllers/contacts")



// middlewares
router.use(body_parser.json());
router.use(body_parser.urlencoded({ extended: true }));

// get all contacts from database
router.get('/fetchall', contactsController.get_all_contacts);

// get a particular contact from database by
router.get('/fetch/:query', contactsController.get_contact_by_id);

// saving data to database
router.post('/save', contactsController.save_contact);

module.exports = router;