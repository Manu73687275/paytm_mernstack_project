// backend/routes/index.js
const express = require('express');
const userRoutes=require("./user")
const accountrouter=require("./account")

const router = express.Router();

router.use("/user",userRoutes)
router.use("/account",accountrouter)

module.exports = router;