const express = require("express")
const router = express.Router({mergeParams:true})

router.use('/static',express.static('public'))


router.get("/",(req,res)=>{
    res.render('index')
})

module.exports = router