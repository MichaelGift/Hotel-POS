const Dish = require('../models/dish.model');

const addDish = async (req, res) => {
    try {
        const dish = await Dish.create(req.body)
        res.status(200).json(dish)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const getDishes = async (req, res) => {
    try {
        const dishes = await Dish.find({}).populate('ingredients.ingredient').sort({name: 1})
        res.status(200).json(dishes)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const getDishById = async (req, res) => {
    try {
        const dish = await Dish.findById(req.params.id)
        res.status(200).json(dish)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const deleteDish = async (req, res) => {
    try {
        const dish = await Dish.findByIdAndDelete(req.params.id)
        if (!dish) {
            res.status(404).json({message: "Dish not found"})
        }
        res.status(200).json({message: "Dish deleted successfully"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const updateDish = async (req, res) => {
    try {
        const dish = await Dish.findByIdAndUpdate(req.params.id, req.body)
        if (!dish) {
            res.status(404).json({message: "Dish not found"})
        }
        const updatedDish = await Dish.findById(req.params.id)
        res.status(200).json(updatedDish)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const serveDish = async (req, res) => {
    try {
        const dish = await Dish.findById(req.params.id).populate('ingredients.ingredient');

        if (!dish) return res.status(404).json({message: `Dish not found`});

        for (let item of dish.ingredients) {
            const ingredient = item.ingredient;
            const requiredQuantity = item.quantityRequired;

            if (ingredient.quantity < requiredQuantity) {
                return res.status(404).json({message: `Not enough ${ingredient.name} in stock`});
            }

            ingredient.quantity -= requiredQuantity;
            await ingredient.save();
        }
        res.status(200).json({message: "Dish served and ingredients updated"});
    } catch (error) {
        res.status(500).json({message: error.stack});
    }
}

module.exports = {
    addDish, getDishes, getDishById, deleteDish, updateDish, serveDish
}