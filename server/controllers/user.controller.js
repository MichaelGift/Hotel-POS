const User = require('../models/user.model')

const addUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({message: `User with id: ${req.params.id} could not found`});
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({message: `User with id: ${req.params.id} could not found`});
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if (!user) return res.status(404).json({message: `User with id: ${req.params.id} could not found`});
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = {
    addUser, getUsers, getUserById, deleteUser, updateUser
}