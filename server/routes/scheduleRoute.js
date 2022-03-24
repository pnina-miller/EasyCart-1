const router = require("express").Router();

const {
 job
} = require("../models/schedule");

router.post("/job", job);

module.exports = router;
