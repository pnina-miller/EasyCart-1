var twilio = require('twilio');
const dotenv = require('dotenv')
dotenv.config();
// const Leader = require('../Models/Leader');
const mongoose = require('mongoose');
const nodemailer = require("nodemailer");

const accountSid = process.env.TWILLO_ACCOUNT_SID
const authToken = process.env.TWILLO_AUTH_TOKEN
const client = require('twilio')(accountSid, authToken);

let transporter, mailOptions;

module.exports = {
    smsSender: (req, res) => {
        const { phone } = req.body.contact
        ('sms sender',phone);
        client.messages.create({
            body: 'Welcome to https://easycart.direct!',
            to: phone,  // Text this number
            from: '+16184756798' // From a valid Twilio number
        })
        .then(message =>{
            ('sms send succesfuly');
            res.status(200).send('sms sended'+JSON.stringify(message))
        })
        .catch(error=>{
            ('sms sending failed',error);
            res.status(500).send('sms sending failed'+error)}
        )
       
    },

    mailSender: (req, res) => {
        const {contact}=req.body
        //אתחול המשתנים של שליחת המייל
        transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'leadersdashboard@gmail.com',
                pass: 'dashboard012',
            }
        });
        mailOptions = {
            from: 'leadersdashboard@gmail.com',
            to:contact.email,
            subject: 'הי, תודה על פניתך ניצור איתך קשר בהקדם',
            html:contact.name+" נושא פניתך:"+contact.subject
            
            ,
            // text:contact
        };
        //הפעלת הפונקציה
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.error('error on mailSender ',error);
            } else {
                console.info('Email sent: ' + info.response);
            }
        })
    }
}