const router = require('express').Router();
const userRoutes = require('./user-routes');
const kanbanRoutes = require('./kanban-routes');
const postRoutes = require('./post-routes');
const commentRoutes = require('./comment-routes')

router.use('/user', userRoutes);
router.use('/kanban', kanbanRoutes);
router.use('/post', postRoutes)
router.use('/comment', commentRoutes)

module.exports = router;