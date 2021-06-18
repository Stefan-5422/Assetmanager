const express = require('express')
const app = express()
const fileUpload = require('express-fileupload')

const storageRouter = require('./src/storage/storageController')
const uploadRouter  = require('./src/upload/uploadController')

app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(fileUpload({
    createParentPath: true
}));

app.use('/api/assets',storageRouter)
app.use('/api/upload', uploadRouter)

const storage = require('./src/storage/storageModel')
//const asset = new Asset()
//asset.deserialize({"id":1,"location":"storage/leg.png","checksum":""})

//asset.updatechecksum()



//storage.insert(asset)
//storage.removebyID(1).then(a => console.log(a))
//storage.getAll().then(a => console.log(a))


app.get("/",(req,res)=>{
    res.render('index')
})

app.listen("8080")