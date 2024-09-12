const express = require('express');
const router = express.Router();
const ingredientController = require('../controllers/ingredient.controller');

router.post('/', ingredientController.addIngredient);
router.get('/', ingredientController.getIngredients);
router.get('/:id', ingredientController.getIngredientById);
router.delete('/:id', ingredientController.deleteIngredient);
router.put('/:id', ingredientController.updateIngredient);

module.exports = router;