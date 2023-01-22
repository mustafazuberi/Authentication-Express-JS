const express = require('express')
const app = express()
const authRoutes = require("./routes/auth")
const bodyParser = require('body-parser')
const session = require('express-session')

app.set("view engine","ejs")
app.set("views", "views")
app.use(bodyParser.urlencoded({ extended: false }))


app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
}))

app.use("/auth", authRoutes)


app.get('/', function (req, res) {
    res.render('home', {});
});









app.listen(4000, function () {
    console.log("Server is running on port " + 4000);
});