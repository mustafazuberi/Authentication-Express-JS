const userModel = require("../models/user")
const bcrypt = require('bcrypt')
var session = require('express-session')



exports.getSignin = (req, res) => {
    res.render("signin")
}
exports.getSignup = (req, res) => {
    res.render("signup")
}
exports.getHome = (req, res) => {
    res.render("home")
}

exports.postSignup = async (req, res) => {
    userModel.storeUser(req.body)
    const users = await userModel.fetchAll()
    const matched = users.find(u => u.email === req.body.email)
    if (matched) {
        return res.send("Email already exists")
    }
    await userModel.storeUser(req.body)
    console.log(req.body)
    res.redirect("/auth/signin")
}


exports.postSignin = async (req, res) => {
    try {
        const userCred = req.body
        const user = await userModel.getUser(userCred.email)
        const result = await bcrypt.compare(userCred.password,user.password)
        console.log(result,user)
        if (result) {
            req.session.user = userCred.email
            // res.send("Loggined Successfully")
            res.redirect("/auth/home")
        } else {
            res.send("Inavlid email and password")
        }
    } catch (e) {
        res.send(e)
    }
}