const Ingredient = require('../models/ingredient.model');

const addIngredient = async (req, res) => {
    try {
        const ingredient = await Ingredient.create(req.body)
        res.status(200).json(ingredient)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const getIngredients = async (req, res) => {
    try {
        const ingredients = await Ingredient.find({}).sort({name: 1})
        res.status(200).json(ingredients)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const getIngredientById = async (req, res) => {
    try {
        const ingredient = await Ingredient.findById(req.params.id)
        res.status(200).json(ingredient)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const deleteIngredient = async (req, res) => {
    try {
        const ingredient = await Ingredient.findByIdAndDelete(req.params.id)
        if (!ingredient) {
            res.status(404).json({message: "Ingredient not found"})
        }
        res.status(200).json({message: "Ingredient deleted successfully"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const updateIngredient = async (req, res) => {
    try {
        const ingredient = await Ingredient.findByIdAndUpdate(req.params.id, req.body)
        if (!ingredient) {
            res.status(404).json({message: "Ingredient not found"})
        }
        const updatedIngredient = await Ingredient.findById(req.params.id)
        res.status(200).json(updatedIngredient)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = {
    addIngredient,
    getIngredients,
    getIngredientById,
    deleteIngredient,
    updateIngredient
}