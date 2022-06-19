const router = require('express').Router();
const userRoutes = require('./user-routes');
const kanbanRoutes = require('./kanban-routes');
const postRoutes = require('./post-routes');

router.use('/user', userRoutes);
router.use('/kanban', kanbanRoutes);
router.use('/post', postRoutes)

module.exports = router;