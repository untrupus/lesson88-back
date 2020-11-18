const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Comment = require('../models/Comment');

router.get('/', async (req, res) => {
    let query;
    if (req.query.post) {
        query = {post: req.query.post}
    }
    const result = await Comment.find(query).sort({"datetime": 1}).populate({path: "user"});
    if (result) {
        res.send(result);
    } else {
        res.sendStatus(404);
    }
});

router.post('/', auth, async (req, res) => {
    const commentData = req.body;
    commentData.user = req.user._id;
    const comment = new Comment(commentData)
    try {
        await comment.save();
        res.send(comment);
    } catch (e) {
        res.status(400).send(e);
    }
});

module.exports = router;