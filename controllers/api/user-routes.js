const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async(req, res) => {
    try {

    } catch(err) {
        res.status(500).json(err);
    }
});
router.post('/login', async(req, res) => {
    try {

    } catch(err) {
        res.status(500).json(err);
    }
});
router.post('/logout', (req, res) => {});

module.exports = router;