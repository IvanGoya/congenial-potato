const router = require("express").Router();
const { Post } = require("../../models");
const withAuth = require("../../utils/auth");

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
router.delete('/:id', withAuth, async (req, res) => {
    try {
        console.log('3');
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id
            },
        });
        console.log('4');
        console.log(postData);
        if (!postData) {
            res.status(404).json({ message: 'No post found!' });
            return;
        }

        res.status(200).json(postData);
        } catch (err) {
        res.status(500).json(err);
    }
});
router.put('/', async (req, res) => {
    try {
        const updatedPost = await Post.update(
            { completed: req.body.newStatus },
            { where: { id: req.body.postId } }
        )

        res.status(200).json(updatedPost)
    } catch(err) {
        res.status(500).json(err)
    }
})
module.exports = router;