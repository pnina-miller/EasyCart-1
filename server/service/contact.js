const Repository = require("../repository/repository");
var twilio = require("twilio");
const dotenv = require("dotenv");
dotenv.config();
// const Leader = require('../Models/Leader');
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const accountSid = process.env.TWILLO_ACCOUNT_SID;
const authToken = process.env.TWILLO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

let transporter, mailOptions;

const smsSender = (contact) => {
  return new Promise(async (resolve, reject) => {
    client.messages
      .create({
        body: "Welcome to https://easycart.direct!",
        to: contact.phone, // Text this number
        from: "+16184756798", // From a valid Twilio number
      })
      .then((res) => resolve(message))
      .catch((error) => {
        reject(error.message);
      });
  });
};

const mailSender = (contact) => {
  return new Promise(async (resolve, reject) => {
    //אתחול המשתנים של שליחת המייל
    transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "leadersdashboard@gmail.com",
        pass: "dashboard012",
      },
    });
    mailOptions = {
      from: "leadersdashboard@gmail.com",
      to: contact.email,
      subject: "הי, תודה על פניתך ניצור איתך קשר בהקדם",
      html: contact.name + " נושא פניתך:" + contact.subject,
    };
    //הפעלת הפונקציה
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        reject(error);
      } else {
        resolve(info);
      }
    });
  });
};

module.exports = {
  smsSender,
  mailSender,
};
