const mongoose = require("mongoose");
const {nanoid} = require("nanoid");
const config = require("./config");
const User = require("./models/User");
const Post = require("./models/Post");
const Comment = require("./models/Comment");


mongoose.connect(config.db.url + "/" + config.db.name, {useNewUrlParser: true});

const db = mongoose.connection;

db.once("open", async () => {
    try {
        await db.dropCollection("posts");
        await db.dropCollection("comments");
        await db.dropCollection("users");
    } catch (e) {
        console.log("Collection were not presented!");
    }

    const [user, user1] = await User.create({
        username: "user",
        password: "123",
        token: nanoid()
    }, {
        username: "user1",
        password: "123",
        token: nanoid()
    });

    const [post1, post2, post3] = await Post.create({
        title: "Post 1",
        image: "img1.jpeg",
        description: "description",
        user: user._id,
        datetime: "2020-11-20T08:54:19.749Z"
    }, {
        title: "Post 2",
        description: "description",
        user: user._id,
        datetime: "2020-11-20T10:54:19.749Z"
    }, {
        title: "Post 3",
        image: "img2.jpg",
        description: "description",
        user: user1._id,
        datetime: "2020-11-20T12:54:19.749Z"
    });


    await Comment.create({
            user: user._id,
            post: post1._id,
            text: "comment 1",
            datetime: "2020-11-21T12:54:19.749Z"
        }, {
            user: user._id,
            post: post2._id,
            text: "comment 2",
            datetime: "2020-12-20T12:54:19.749Z"
        }, {
            user: user._id,
            post: post2._id,
            text: "comment 3",
            datetime: "2020-11-14T12:54:19.749Z"
        }, {
            user: user._id,
            post: post3._id,
            text: "comment 4",
            datetime: "2020-11-10T12:54:19.749Z"
        }, {
            user: user._id,
            post: post3._id,
            text: "comment 5",
            datetime: "2020-10-20T12:54:19.749Z"
        }, {
            user: user._id,
            post: post3._id,
            text: "comment 6",
            datetime: "2019-11-20T12:54:19.749Z"
        },
    );

    db.close();
});