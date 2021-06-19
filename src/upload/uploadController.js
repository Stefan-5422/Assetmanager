const express = require("express")
const router = express.Router()
const uploadModel = require("./uploadModell")
const userModel = require("../user/userModel")

router.post('/', async (req,res) => {
    if(!req.files || await userModel.getbyID(req.session.uid).then(a=>a.length) == 0) {
        res.send({
            status: false,
            message: 'No file'
        })
    }else {
        await uploadModel.handleUpload(req)
        res.redirect('/')
    }
})

module.exports = router