const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.post('/', userController.addUser);
router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
router.delete('/:id', userController.deleteUser);
router.put('/:id', userController.updateUser);

module.exports = router;