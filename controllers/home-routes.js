const router = require('express').Router();
const withAuth = require('../utils/auth');
const { User, Post, Kanban, Comment } = require('../models');
const session = require('express-session');
const { sequelize } = require('../models/Post');

router.get('/', async (req, res) => {
  try {
    const bugData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['first_name', 'last_name', 'id']
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
      loggedIn: req.session.loggedIn,
      userId: req.session.userId
    })
  } catch (err) {
    res.status(500).json(err)
  }
})


router.get('/user/:id', async (req, res) => {
  try {
    const userData = await Post.findAll({
      include: {
        model: User,
        attributes: ['first_name', 'last_name']
      },
      where: {
        user_id: req.params.id
      }
    });
    let hasPosts = true
    console.log(userData)
    if (userData[0]) {
      console.log('Getting to true')
      const userPosts = userData.map((posts) => posts.get({ plain: true }));
      const userInfo = userPosts[0].user
      const userPageId = userPosts[0].user_id
      const loggedUser = req.session.userId
      res.render('profile', {
        hasPosts,
        userPosts,
        userInfo,
        userPageId,
        loggedUser,
        loggedIn: req.session.loggedIn,
        userId: req.session.userId
      });
    } else {
      console.log('getting here')
      hasPosts = false;
      res.render('profile', {
        hasPosts,
        loggedIn: req.session.loggedIn,
        userId: req.session.userId
      })
    }
    
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
    const postData = await sequelize.query(
      `SELECT
      post.id,
      post.title,
      post.post_body,
      post.created_at AS 'post_created_at',
      postUser.first_name AS 'poster_first',
      postUser.last_name AS 'poster_last',
      comment.comment_body,
      comment.created_at,
      commentUser.first_name,
      commentUser.last_name

      FROM post
      LEFT JOIN comment ON post.id = comment.post_id
      JOIN user postUser ON post.user_id = postUser.id
      LEFT JOIN user commentUser ON comment.user_id = commentUser.id

      WHERE post.id = ${req.params.id};
      `)
  //     {
  //     include: [
  //       {
  //         model: Comment,
  //         attributes: ['comment_body', 'createdAt'],
  //         include: [
  //           {
  //             model: User,
  //             attributes: ['first_name', 'last_name']
  //           }
  //         ]
  //       },
  //       {
  //         model: User,
  //         attributes: ['first_name', 'last_name']
  //       }
  //   ]
  // })
  console.log(postData[0])
    if(postData[0]) {
      // const post = postData.get({ plain: true })
      const post = postData[0] 
      // const comments = post.comment
      const postTitle = post[0].title
      const postBody = post[0].post_body
      const postTime = post[0].post_created_at
      let hasComment = false;
      if (post[0].comment_body != null) {
        hasComment = true
      }
      res.render('post', {
        post,
        postTitle,
        postBody,
        postTime,
        hasComment,
        loggedIn: req.session.loggedIn,
        userId: req.session.userId
      })
    } else {
      res.status(404).json({message: 'Post Not Found!'})
    }
  }
  catch(err) {
    res.status(500).json(err);
  }
})

router.get('/board', async (req,res) => {
  try {
    console.log('1board')
    const boardData = await Kanban.findAll({
      include: [
        {
          model: Post,
          // attributes: ['first_name', 'last_name']
        },
      ],
    });
    console.log('2board')
    const boardItems = boardData.map((board) => board.get({ plain: true }));
    res.render('kanban', {
      boardItems
    });
  } catch(err) {
    res.status(500).json(err);
  }
});

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
