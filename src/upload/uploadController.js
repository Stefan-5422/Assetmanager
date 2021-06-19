const express = require("express")
const router = express.Router()
const uploadModell = require("./uploadModell")

router.post('/', async (req,res) => {
    if(!req.files) {
        res.send({
            status: false,
            message: 'No file'
        })
    }else {
        await uploadModell.handleUpload(req)
        res.redirect('/')
    }
})

module.exports = router