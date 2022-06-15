const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async(req, res) => {
    try {
        const newUser = await User.create({
            username: req.body.username,
            password: req.body.password
        })
        req.session.save(() => {
            req.session.userId = newUser.id;
            req.session.username = newUser.username;
            req.session.loggedIn = true;
            res.json(newUser);
        })
    } catch(err) {
        res.status(500).json(err);
    }
});
router.post('/login', async(req, res) => {
    try {
        const user = await User.findOne({
            where: {
                username: req.body.username
            }
        })
        
    } catch(err) {
        res.status(500).json(err);
    }
});
router.post('/logout', (req, res) => {});

module.export = router;