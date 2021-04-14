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

const multer = require('multer')
const multer_storage = multer.memoryStorage()
const upload = multer({ storage: multer_storage })

// const cpUpload = upload.fields([{ name: 'docs', maxCount: 10 }])
const cpUpload = upload.array('docs', 10)
router.post('/uploads', auth, cpUpload, uploadFile)

router.post('/get-files-info', auth, getFilesInfo)

router.get('/get-file/:id', auth, getFile)

module.exports = router
