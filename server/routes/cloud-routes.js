const express = require('express')
const router = express.Router()

// JWT helper
const { verifyToken: auth } = require('../helpers/jwt-helper')

// Cloud Controllers
const cloudCTRL = require('../controllers/cloud.controllers')

const multer = require('multer')
const multer_storage = multer.memoryStorage()
const upload = multer({ storage: multer_storage })

const cpUpload = upload.array('docs', 10)
router.post('/uploads', auth, cpUpload, cloudCTRL.uploadFile)

router.post('/get-files-info', auth, cloudCTRL.getFilesInfo)

router.get('/get-file/:id', auth, cloudCTRL.getFile)

router.get('/file-meta', auth, cloudCTRL.fileMetaData)

module.exports = router
