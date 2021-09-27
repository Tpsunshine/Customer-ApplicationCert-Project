const express = require("express");
const router = express.Router();
const chalk = require("chalk");
const sgMail = require("@sendgrid/mail");
const bodyparser = require("body-parser");
sgMail.setApiKey("SG.KUd4Am-6SEmSZrRAvud-Lw.GY9dkLKB232f4qEAEdraLCSqDu-j-jVAOV9YYrG9a2E");

router.use(bodyparser.urlencoded({extended:true}))


router.get("/",(req,res)=>{

    res.render("contactus",{data:""});

})

router.post("/sendemail",(req,res)=>{
    console.log("Entered post request");
    console.log(chalk.yellow(req.body.email));
     var toemail =req.body.emailID;
    var emailbody = req.body.emailbody;
    var message={
                 to: toemail,
                from:"tpdawnsun@gmail.com",
                subject:"Imp email from 24X7",
                text: emailbody
                            }
    sgMail.send(message);
     res.render("contactus",{data:"email is sent successfully"});
});


module.exports = router;