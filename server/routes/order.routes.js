const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');

router.post('/', orderController.addOrder);
router.get('/', orderController.getOrders);
router.get('/:id', orderController.getOrderById);
router.delete('/:id', orderController.deleteOrder);
router.put('/:id', orderController.updateOrder);

module.exports = router;