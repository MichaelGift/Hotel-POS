const express = require('express');
const router = express.Router();
const tableController = require('../controllers/table.controller')

router.post('/', tableController.addTable);
router.get('/', tableController.getTables);
router.get('/:id', tableController.getTableById);
router.put('/:id', tableController.updateTable);
router.delete('/:id', tableController.deleteTable);

module.exports = router