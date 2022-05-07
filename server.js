var express = require("express")
const app = express()
var http = require('http')
var ejs = require('ejs')
var routeController = require('./routeController')
const bodyParser = require("body-parser");
const ngrok = require('ngrok');

app.engine('html', ejs.renderFile) //FOR HTML RENDER
app.set('view engine', 'html') //FOR HTML RENDER

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json()) //FORM POST PARAMS AS JSON

app.get('/api',(req,res)=>{
    res.send("Welcome!")
})

app.use('/api',routeController);

const port = 2500

app.listen(port,()=>{
    console.log("Server is started on port "+port+"...")
})