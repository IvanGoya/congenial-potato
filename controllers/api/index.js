const router = require('express').Router();
const userRoutes = require('./user-routes');
const kanbanRoutes = require('./kanban-routes');

router.use('/user', userRoutes);
router.use('/kanban', kanbanRoutes);

module.exports = router;