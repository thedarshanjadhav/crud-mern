const express = require('express');
const router = express.Router();
const tableController = require('../controllers/table');

// crete
router.post("/data-create", tableController.createTable);
// read
router.get('/data-read', tableController.readTable);
// update
router.put('/data-update/:id', tableController.updateTable);
// delete
router.delete("/data-delete/:id", tableController.deleteTable);

module.exports = router;