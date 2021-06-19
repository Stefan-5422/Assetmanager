const express = require("express")
const router = express.Router({mergeParams:true})

const storageRouter = require('../src/storage/storageController')
const uploadRouter  = require('../src/upload/uploadController')

router.use('/assets',storageRouter)
router.use('/upload', uploadRouter)


module.exports = router