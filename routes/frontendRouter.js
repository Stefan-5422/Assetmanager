const express = require("express")
const router = express.Router({mergeParams:true})

const userRouter = require('../src/user/userController')
const homeRouter = require('../src/home/homeController')

router.use('/static',express.static('public'))
router.use('/asset',express.static('storage',{
    extensions:['png','jpg','jpeg','mp4'],
}))

router.use('/',userRouter.frontend)
router.use('/',homeRouter)



module.exports = router