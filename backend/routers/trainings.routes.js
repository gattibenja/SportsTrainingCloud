const express = require('express');
const router = express.Router();
const registrosController = require('../controllers/trainings.controller');
const { authMiddleware } = require('../middlewares/authMiddleware');

router.post('/create', authMiddleware, registrosController.createRegister);
router.get('/get', authMiddleware, registrosController.getRegisters);
router.get('/user/:userId', authMiddleware, registrosController.getRegistersByUser);
router.get('/all', authMiddleware, registrosController.getAllRegisters);

module.exports = router;
