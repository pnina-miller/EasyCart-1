const service = require("../service/contact");

//get phone and send SMS to this phone
const smsSender = async (req, res) => {
  const { contact } = req.body;
  service
    .smsSender(contact)
    .then((sms) => {
      res.status(200).json({ sendSMS: sms });
    })
    .catch((err) => {
      res.status(500).json({ message: "can't send SMS", error: err });
    });
};

//get email and send mail to this address
const mailSender = async (req, res) => {
  const { contact } = req.body;
  service
    .mailSender(contact)
    .then((info) => {
      res.status(200).json({ sendMail: info });
    })
    .catch((err) => {
      res.status(500).json({ message: "can't send mail", error: err.message });
    });
};

module.exports = {
  smsSender,
  mailSender,
};
