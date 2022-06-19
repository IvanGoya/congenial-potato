const router = require("express").Router();
const { Post } = require("../../models");

router.post('/', async (req, res) => {
    try {
        const newPost = await Post.create({
            ...req.body,
            user_id: req.session.userId
        });
        res.status(200).json(newPost);
        console.log(newPost);
    } catch (err) {
        res.status(400).json(err);
    }
});
module.exports = router;