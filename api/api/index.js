const express = require("express");
const router = express.Router();

router.use("/user", require("./user.js"));

router.use("/post", require("./post.js"));

router.use("/comment", require("./comment.js"));

module.exports = router;
