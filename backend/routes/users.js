const express = require("express");
const router = express.Router();
const verifyJWT = require("../middleware/verifyJWT");

const {
    getUser,
    getUserFriends,
    addRemoveFriend,
} = require("../controllers/usersController");

router
    .get("/:id", verifyJWT, getUser)
    .get("/:id/friends", verifyJWT, getUserFriends)
    .patch("/:id/:friendId", verifyJWT, addRemoveFriend);

module.exports = router;
