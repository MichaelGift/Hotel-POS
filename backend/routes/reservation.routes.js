const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservation.controller');

router.post('/', reservationController.addReservation);
router.get('/', reservationController.getReservations);
router.get('/:id', reservationController.getReservationById);
router.delete('/:id', reservationController.deleteReservation);
router.put('/:id', reservationController.updateReservation);

module.exports = router;