const Order = require('../models/order.model');

const addOrder = async (req, res) => {
    try {
        const order = await Order.create(req.body);
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).populate(
            {
                path: 'dishes.dish',
                populate: {
                    path: 'ingredients.ingredient',
                    model: 'Ingredient'
                }
            });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({message: `Order id ${req.params.id} not found`})
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) return res.status(404).json({message: `Order id ${req.params.id} not found`})
        res.status(200).json({message: "Order successfully defeated"});
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const updateOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, req.body).populate({
            path: 'dishes.dish',
            populate: {
                path: 'ingredients.ingredient',
                model: 'Ingredient'
            }
        });
        if (!order) return res.status(404).json({message: `Order id ${req.params.id} not found`})
        const updatedOrder = await Order.findById(req.params.id).populate('dishes.dish');
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = {
    addOrder, getOrders, getOrderById, deleteOrder, updateOrder
}