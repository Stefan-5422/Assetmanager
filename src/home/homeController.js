const express = require("express")
const router = express.Router()
const user = require("../user/userModel")

router.get("/", async(req,res)=>{
    if( await user.getbyID(req.session.uid).then(a=>a.length) == 0) {
        res.redirect('/login')
    }else {
        res.render('index')
    }
})

module.exports = router
