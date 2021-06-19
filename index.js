const express = require('express')
const app = express()
const fileUpload = require('express-fileupload')

//Include top level routers
const backendRouter = require('./routes/backendRouter.js')
const frontendRouter = require('./routes/frontendRouter.js')

//set viewengine to render ejs templates
app.set('view engine', 'ejs')

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