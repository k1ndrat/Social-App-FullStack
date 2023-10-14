const express = require("express");
const router = express.Router();
const verifyJWT = require("../middleware/verifyJWT");
const upload = require("../storage/storage");

const {
    createPost,
    getFeedPosts,
    getUserPosts,
    likePost,
} = require("../controllers/postsController");

router
    .get("/", verifyJWT, getFeedPosts)
    .get("/:userId/posts", verifyJWT, getUserPosts)
    .post("/", verifyJWT, upload.array("images"), createPost)
    .patch("/:id/like", verifyJWT, likePost);

module.exports = router;
