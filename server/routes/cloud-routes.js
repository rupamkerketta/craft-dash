const express = require('express')
const router = express.Router()

// JWT helper
const { verifyToken: auth } = require('../helpers/jwt-helper')

// Cloud Controllers
const {
	uploadFile,
	getFilesInfo,
	getFile
} = require('../controllers/cloud.controllers')

router.post('/uploads', auth, uploadFile)

router.post('/get-files-info', auth, getFilesInfo)

router.get('/get-file/:id', auth, getFile)

module.exports = router
