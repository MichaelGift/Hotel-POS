const Table = require('../models/table.model')

const addTable = async (req, res) => {
    try {
        const table = await Table.create(req.body);
        res.status(200).json(table);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getTables = async (req, res) => {
    try {
        const tables = await Table.find({});
        res.status(200).json(tables);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getTableById = async (req, res) => {
    try {
        const table = await Table.findById(req.params.id);
        if (!table) return res.status(404).json({message: `Table with id ${req.params.id} does not exist`});
        res.status(200).json(table);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const deleteTable = async (req, res) => {
    try {
        const table = await Table.findByIdAndDelete(req.params.id);
        if (!table) return res.status(404).json({message: `Tables with id ${req.params.id} does not exist`});
        res.status(200).json({message: "Table deleted successfully"});
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const updateTable = async (req, res) => {
    try {
        const table = await Table.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if (!table) return res.status(404).json({message: `Tables with id ${req.params.id} does not exist`});
        res.status(200).json(table);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = {
    addTable, getTables, getTableById, deleteTable, updateTable
}