const express = require("express");
const router = express.Router();
const upload = require("../storage/storage");

const { register, login } = require("../controllers/authController");

router.post("/register", upload.single("picture"), register);

router.post("/login", login);

router.post("/logout");

router.get("/refresh");

module.exports = router;
