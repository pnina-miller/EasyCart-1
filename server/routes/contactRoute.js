const express=require('express');
const router=express.Router();

const {
    smsSender,
    mailSender
}=require('../controller/contact');

router.post('/sms',smsSender);
router.post('/mail',mailSender);


module.exports=router;