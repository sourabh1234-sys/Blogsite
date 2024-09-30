const express = require('express');
const path = require("path");
const ejs = require('ejs')
const userroute = require('./router/user')
const blogroute = require('./router/blog')
const mongoose = require('mongoose')
const  cookiePaser = require('cookie-parser')
const {checkauthenticationcookie } = require('./middleware/authentication')
const Blog = require('./model/blog')


const app = express()
const PORT = 8000


mongoose.connect('mongodb://127.0.0.1:27017/blogsite')
.then((e)=> console.log("MongoDB Connected"))


app.set("view engine", 'ejs')
app.set("views", path.resolve( "views"));



app.use(express.urlencoded({ extended: false }));
app.use(cookiePaser())
app.use(checkauthenticationcookie('token'))
app.use(express.static(path.resolve("./public")))


app.get('/' ,  async (req , res) => {
    const allblog = await Blog.find({})
    return res.render('home' , {
        user : req.user,
        blogs : allblog
    })
})

app.use('/user' , userroute )
app.use('/blog' , blogroute)

app.listen(PORT , ( ) => console.log(PORT) )
