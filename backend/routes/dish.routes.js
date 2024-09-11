const express = require('express');
const router = express.Router();
const dishController = require('../controllers/dish.controller');

router.post('/', dishController.addDish);
router.get('/', dishController.getDishes);
router.get('/:id', dishController.getDishById);
router.delete('/:id', dishController.deleteDish);
router.put('/:id', dishController.updateDish);
router.put('/serve/:id', dishController.serveDish)

module.exports = router;