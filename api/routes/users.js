const express = require('express');
const router = express.Router();
const userController = require('../controllers/controller');

router.get('/', userController.getAll)
router.get('/', userController.topTen)
router.get('/:username', userController.getUser)
router.post('/', userController.createNewUser)
router.patch('/', userController.updateScore)

module.exports = router
