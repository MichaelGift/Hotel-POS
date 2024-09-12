const Reservation = require('../models/reservation.model');

const addReservation = async (req, res) => {
    try {
        const reservation = await Reservation.create(req.body);
        res.status(200).json(reservation);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find({})
            .populate('tables')
            .populate('user');

        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getReservationById = async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id)
            .populate('tables')
            .populate('user');

        if (!reservation) return res.status(404).json({message: `No reservation with id: ${req.params.id} found`})
        res.status(200).json(reservation)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const deleteReservation = async (req, res) => {
    try {
        const reservation = await Reservation.findByIdAndDelete(req.params.id);
        if (!reservation) return res.status(404).json({message: `No reservation with id: ${req.params.id} found`});
        res.status(200).json({message: "Reservation deleted successfully"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const updateReservation = async (req, res) => {
    try {
        const reservation = await Reservation.findByIdAndUpdate(req.params.id, req.body, {new: true})
            .populate('tables')
            .populate('user');

        if (!reservation) return res.status(404).json({message: `No reservation with id: ${req.params.id} found`});
        res.status(200).json(reservation);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = {
    addReservation, getReservations, getReservationById, deleteReservation, updateReservation
}