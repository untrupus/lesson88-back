const express = require('express');
const router = express.Router();
const config = require("../config");
const Post = require('../models/Post');
const auth = require('../middleware/auth');


router.get('/', async (req, res) => {
    const result = await Post.find().populate({path: "user"});
    if (result) {
        res.send(result);
    } else {
        res.sendStatus(404);
    }
});

router.post('/', auth, config.upload.single("image"), async (req, res) => {
    const postData = req.body;
    if (req.file) {
        postData.image = req.file.filename;
    }
    postData.user = req.user._id;
    postData.datetime = new Date();
    const post = new Post(postData)
    try {
        await post.save();
        res.send(post);
    } catch (e) {
        res.status(400).send(e);
    }
});

module.exports = router;