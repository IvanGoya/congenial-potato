const router = require('express').Router();
const withAuth = require('../utils/auth');
const { User, Post, Comment } = require('../models');

router.get('/', async (req, res) => {
  try {
    const bugData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['first_name', 'last_name']
        }
        // {
        //   model: Comment
        // }
      ]
    })
    const bugs = bugData.map((bug) => 
      bug.get({ plain: true })
    )

    res.render('homepage', {
      bugs,
      loggedIn: req.session.loggedIn
    })
  } catch (err) {
    res.status(500).json(err)
  }
})


router.get('/user/:id', async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const user = userData.get({ plain: true });

    res.render('user', {
      ...user,
      loggeIn: req.session.loggeIn
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
      include: [{ model: user }],
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
        model: 'comment',
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
  if (req.session.loggedIn) {
    res.redirect('/profile');
    return;
  }
  res.render('login');
});

router.get('/logout', (req, res) => {
  // If the user logs out, redirect the request sign in
  if (req.session.logged_out) {
    res.redirect('/login');
    return;
  }
});

router.get('/signup', async (res,req) => {
  if(req.session.loggedIn) {
    res.redirect('/')
    return;
  }
  res.render('signup')
})

module.exports = router;
