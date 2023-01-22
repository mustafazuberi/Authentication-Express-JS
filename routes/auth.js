const express = require('express')
const router = express.Router()
const authController = require("../controllers/users")

router.get('/signin', authController.getSignin)
router.get('/signup', authController.getSignup)
router.get('/home', authController.getHome)

router.post('/signup',authController.postSignup)

router.post('/signin',authController.postSignin)






module.exports = router;
