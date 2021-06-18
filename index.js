const express = require('express')
const app = express()

const storage = require('./src/storage/storageModel')

storage.getAll().then(a=> console.log(a)).then( a => {
storage.deleteId(1).then(a => console.log("del")).then ( a => {
storage.getAll().then(a=> console.log(a))
})
})

app.get("/",(req,res)=>{
    res.send("hello")
})

app.listen("8080")