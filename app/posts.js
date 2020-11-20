const express = require('express');
const router = express.Router();
const config = require("../config");
const Post = require('../models/Post');
const auth = require('../middleware/auth');

router.get('/', async (req, res) => {
    const lookup = {
        $lookup: {
            from: "users",
            localField: "user",
            foreignField: "_id",
            as: "user"
        },
    };
    const newLookup = {
        $lookup: {
            from: "comments",
            localField: "_id",
            foreignField: "post",
            as: "comments"
        },
    };
    const result = await Post.aggregate([lookup, newLookup]).sort({"datetime": -1});
    if (result) {
        res.send(result);
    } else {
        res.sendStatus(404);
    }
});

router.get('/:id', async (req, res) => {

    const result = await Post.findById(req.params.id).populate({path: "user"});
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
        if ((post.description && !post.image) || (!post.description && post.image)) {
            await post.save();
            res.send(post);
        } else {
            res.status(400).send({message: "Fill in one field"});        }
    } catch (e) {
        res.status(400).send(e);
    }
});

module.exports = router;