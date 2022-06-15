const router = require('express').Router();
const { User, Post, Comment } = require('../models');


router.get('/user/:id', async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {
      include: [
        {
          model: user,
          attributes: ['name'],
        },
      ],
    });

    const user = userData.get({ plain: true });

    res.render('user', {
      ...user,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: User }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/post/:id', async (req,res) => {
  try{
    const postData = await Post.findByPk(req.params.id, {
      include: [User, {
        model: Comment,
        include: [User]
      }]
    })
    if(postData) {
      const post = postData.get({ plain: true })
      res.render('single-post', {post})
    } else {
      res.status(404).json({message: 'Post Not Found!'})
    }
  }
  catch(err) {
    res.status(500).json(err);
  }
})



router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }
  res.render('login');
});

router.get('/logout', (req, res) => {
  // If the user logges out, redirect the request sign in
  if (req.session.logged_out) {
    res.redirect('/login');
    return;
  }
  res.render('logged out');
});

router.get('/signup', async (res,req) => {
  if(req.session.logged_in) {
    res.redirect('/')
    return;
  }
  res.render('signup')
})

module.exports = router;
