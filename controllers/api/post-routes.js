const router = require("express").Router();
const { Post } = require("../../models");

router.post('/', async (req, res) => {
    try {
        const newPost = await Post.create({
            ...req.body,
            user_id: req.session.userId
        });
        res.status(200).json(newPost);
    } catch (err) {
        res.status(500).json(err);
    }
});
router.post('/delete', async (req, res) => {
    try {
        const delPost = await Post.destroy(req.body);
        res.status(200).json(delPost);
    } catch (err) {
        res.status(500).json(err);
    }
});
module.exports = router;