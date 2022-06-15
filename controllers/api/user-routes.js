const router = require("express").Router();
const { User } = require("../../models");

router.post("/", async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password,
    });
    req.session.save(() => {
      req.session.userId = newUser.id;
      req.session.username = newUser.username;
      req.session.loggedIn = true;
      res.json(newUser);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    if (!user) {
      res.status(400).json({ message: "User not found!" });
      return;
    }
    const validatePassword = user.checkPassword(req.body.password);
    if (!validatePassword) {
      res.status(400).json({ message: "User not found!" });
      return;
    }
    req.session.save(() => {
      req.session.userId = newUser.id;
      req.session.username = newUser.username;
      req.session.loggedIn = true;
      res.json({ user, message: "You are logged in!" });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
router.post("/logout", (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            req.status(200).end();
        })
    } else {
        req.status(404).end();
    }
});

module.exports = router;