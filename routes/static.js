const express = require('express');
const router = express.Router();

router.use(express.static('public'));
router.use("/images", express.static(__dirname + "public/images"));
router.use("/scripts", express.static(__dirname + "public/scripts"));
router.use("/styles", express.static(__dirname + "public/styles"));

module.exports = router;