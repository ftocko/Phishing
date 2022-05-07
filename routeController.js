const express = require('express')
var router = express.Router()
var mailer = require('nodemailer');

router.get("/emailGenerator",(req,res)=>{

    res.render(__dirname+"/views/mail.html",{
    })

})

router.post("/sendMail",(req,res)=>{

  //res.send(req.body.email)

  var transporter = mailer.createTransport({
    service: 'Gmail',
    port: 25,
    auth: {
      user: 'filip.tocko85@gmail.com',
      pass: 'xxxxx'
    },
    tls: {
        rejectUnauthorized: false
    }
    
  })

  var email = req.body.email

  var mailOptions = {
    from: 'filip.tocko85@gmail.com',
    to: email,
    subject: 'Site exploring',
    html: '<p>Explore this site by clicking <a href="http://localhost:2500/api/phishing">here</a> </p>'
  }

  transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          res.json({"Error":"Error during e-mail sending"})
        } else {
          console.log('E-mail is successfully sent: ' + info.response);
          res.json({"Email":"E-mail is successfully sent!"})
        }
    })
})

router.get('/phishing',(req,res)=>{
  res.render(__dirname+"/views/phishing_site.html",{
  })
})

router.post('/rewardData',(req,res)=>{
  var firstName = req.body.firstName
  var lastName = req.body.lastName
  var email = req.body.email
  var cardNumber = req.body.cardNumber

  var jsonData = {"firstName":firstName, "lastName":lastName,"email":email,"cardNumber":cardNumber}
  res.json(jsonData)

})

module.exports = router