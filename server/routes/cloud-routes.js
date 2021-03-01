const express = require('express')
const router = express.Router()

// JWT helper
const { verifyToken: auth } = require('../helpers/jwt-helper')

// Cloud Controllers
const { uploadFile } = require('../controllers/cloud.controllers')

router.post('/uploads', auth, uploadFile)

module.exports = router
