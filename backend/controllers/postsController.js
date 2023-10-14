const User = require("../models/User");
const Post = require("../models/Post");

const createPost = async (req, res) => {
    try {
        const { userId, description, picturePath } = req.body;
        console.log({ userId, description, picturePath });
        const user = await User.findById(userId);
        console.log({
            userId,
            description,
            picturePath,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            userPicturePath: user.picturePath,
            likes: {},
            comments: [],
        });
        const newPost = new Post({
            userId,
            description,
            picturePath,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            userPicturePath: user.picturePath,
            likes: {},
            comments: [],
        });

        await newPost.save();

        const posts = await Post.find().sort({ createdAt: -1 });
        res.status(201).json(posts);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};

const getFeedPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });

        res.status(200).json(posts);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;
        const posts = await Post.find({ userId });

        res.status(200).json(posts);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

const likePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const post = await Post.findById(id);

        const isLiked = post.likes.get(userId);

        if (isLiked) {
            post.likes.delete(userId);
        } else {
            post.likes.set(userId, true);
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            {
                likes: post.likes,
            },
            { new: true }
        );

        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

module.exports = {
    createPost,
    getFeedPosts,
    getUserPosts,
    likePost,
};
