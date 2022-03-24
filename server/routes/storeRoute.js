const router = require("express").Router();
const {
    createStore,
    getStore,
} = require('../controller/store')
router.post("/createStore", createStore);
router.post("/getStore", getStore);
module.exports = router;
