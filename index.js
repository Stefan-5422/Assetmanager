const express = require('express')
const app = express()
const fileUpload = require('express-fileupload')
const mongoose = require("mongoose")
const session = require("express-session")
const MongoStore = require("connect-mongo")

const connection = mongoose.connection

//start the database
const uri = 'mongodb://mongo:27017/asset' //change this to mongo before pushing
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})


//Include top level routers
const backendRouter = require('./routes/backendRouter.js')
const frontendRouter = require('./routes/frontendRouter.js')

//set viewengine to render ejs templates
app.set('view engine', 'ejs')

//Use sessions to track logins
app.use(session({
    secret: 'mysupersafesecretthatiwilldefinitlynotchangelater',
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
        mongoUrl: uri
    })
}))

//Enable body parser to be able to hande POST requests
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//Enable file upload using express-filupload
app.use(fileUpload({
    createParentPath: true
}));

//fire routers
app.use('/',frontendRouter)
app.use('/api',backendRouter)


app.listen("8080")