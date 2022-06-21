const router = require("express").Router();
const { Comment } = require("../../models");
//const withAuth = require('../../utils/auth');

router.post("/", async (req,res) => {
    try {
        const newComment = await Comment.create( {
            comment_body: req.body.comment_body,
            post_id: req.body.postId,
            user_id: req.session.userId
        });
        res.status(200).json(newComment)
        console.log(newComment)
    }
    catch(err) {
        res.status(500).json(err);
    }
});

module.exports = router;