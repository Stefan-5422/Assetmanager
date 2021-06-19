const express = require("express")
const router = express.Router({mergeParams:true})

const storageRouter = require('../src/storage/storageController')
const uploadRouter  = require('../src/upload/uploadController')
const userRouter    = require('../src/user/userController')

router.use('/assets',storageRouter)
router.use('/upload', uploadRouter)
router.use('/user', userRouter.backend)

module.exports = router