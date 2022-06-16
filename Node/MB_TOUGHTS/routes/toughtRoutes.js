const express = require('express')
const router = express.Router()
const ToughtController = require('../controllers/ToughtController')

// Controller
router.get('/', ToughtController.showTought)


// Exportando o Router
module.exports = router
