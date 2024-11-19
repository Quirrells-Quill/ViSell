const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

// Route to list all items
router.get('/', itemController.getAllItems);

// Route to post a new item
router.post('/', itemController.createItem);

// Route to get details of a specific item by ID
router.get('/:id', itemController.getItemById);

module.exports = router;
