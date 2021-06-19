const express = require("express")
const crypto = require("crypto-js")
const {v1} = require('uuid')

const berouter = express.Router()
const ferouter = express.Router()
const userModel = require("./userModel")
const User = require('../user')

berouter.post("/register", async (req,res) => {
    //add new user to database if none with username already exist
    if(await userModel.getbyName(req.body.name).then(a=>a.length) == 0) {
        const user = new User();
        user.deserialize({
            name: req.body.name,
            id: v1(),
            password: crypto.SHA256(req.body.password).toString(),
            images: []
        })
        userModel.insert(user)
        //TODO: update this to render an error message in the register Page
        res.redirect("/login")
    }
    res.render("register",{error:"Username already exists"})
})

berouter.post("/auth", async (req,res) => {
    //find user and authenthicate
    if(await userModel.getbyName(req.body.name).then(a=>a.length) > 0) {
        if(await userModel.authenthicate(req.body.name,crypto.SHA256(req.body.password).toString())) {
        //TODO: update this to do something
            req.session.uid = await userModel.getbyName(req.body.name).then(a=>a[0].id)
            res.redirect("/")
        }else {
            //TODO: update this to render an error message in the login Page
            res.render("login",{error:"Wrong username or password"})
        }
    }else {
        //TODO: update this to render an error message in the login Page
        res.render("login",{error:"Wrong username or password"})
    }
})

ferouter.get("/profile", async (req,res) => {
    //load the users profile page
    if( await userModel.getbyID(req.session.uid).then(a=>a.length) > 0) {
        const user = new User();
        user.deserialize(await userModel.getbyID(req.session.uid).then(a=>a[0]))
        res.render("profile", {user})
    }else {
        res.redirect("/login")
    }
})

ferouter.get("/register", (req,res) => {
    //render the register page
    res.render("register",{error:""})
})

ferouter.get("/login",(req,res) => {
    //render the login page
    res.render("login",{error:""})
})

ferouter.get("/logout",(req,res) => {
    req.session.destroy(()=> {
        res.redirect("/login")
    })
})

module.exports.backend  = berouter
module.exports.frontend = ferouter