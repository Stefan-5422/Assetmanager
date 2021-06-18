const express = require("express")
const router = express.Router()
const storage = require("./storageModel")

router.get('/id/:id', async (req,res)=> {
    console.dir(await storage.getbyID(req.params.id))
    res.send(await storage.getbyID(req.params.id))
})


//TODO: Remove temporary endpoint
router.get('/all', async (req,res) => {
    res.send(await storage.getAll())
})

module.exports = router