const router = require('express').Router();
const { Blog, User, Comment} = require('../models');

router.get('/', async (req, res) => {
  try {
    const MAX_CONTENT_LENGTH = 330;

    const blogData = await Blog.findAll({
      include: [
        {
          model: User
        }
      ]
    });

    const blogs = blogData.map((blog) => {
      const blogObject = blog.get({ plain: true });
      if (blogObject.content.length <= MAX_CONTENT_LENGTH) {
        blogObject.truncatedContent = blogObject.content;
      } else {
        blogObject.truncatedContent = blogObject.content.substring(0, MAX_CONTENT_LENGTH) + '... Read More';
      }
      return blogObject;
    });

    res.render('homepage', {
      blogs,
      logged_in: req.session.logged_in
    });

  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/login', (req, res) => {

  res.render('login');
});

router.get('/addBlog', (req, res) => {

  res.render('addBlog');
});

// router.get('/editBlog', (req, res) => {

//   res.render('editBlog');
// });


router.get ('/editBlog/:blogId', async (req, res) => {
  const blogId = req.params.blogId;

  const blog = await Blog.findOne({ where: { id: blogId} });
  if (!blog) {
    return res.status(404).send({ error: `Blog ${blogId} not found` });
  }
    
      res.render('editBlog',{
        blog: blog.toJSON()
    });
});

router.get('/commentBlog/:blogId', async (req, res) => {
  const blogId = req.params.blogId;
  

  const blog = await Blog.findOne({ 

    where: { id: blogId} ,
    
    include: [
      {
        model: User
      },
      {
        model: Comment,
        include: [User] // Include the User associated with each Comment
      }
    ]

  });

  if (!blog) {
    return res.status(404).send({ error: `Blog ${blogId} not found` });
  }
    
      res.render('commentBlog',{
        blog: blog.toJSON()
    });
});


// router.post('/editBlog/:blogId', async (req, res) => {
//   const blogId = req.params.blogId;

//   const blog = await Blog.findOne({ where: { id: blogId } });
//   if (!blog) {
//     return res.status(404).send({ error: `Blog ${blogId} not found` });
//   }

//   // Update the blog with the new data
//   blog.title = req.body.title;
//   blog.content = req.body.content;
//   await blog.save();

//   // Redirect to the dashboard after the update is complete
//   res.redirect('/dashboard');
// });

router.get('/dashboard', async (req, res) => {
  if (!req.session.logged_in) {
    return res.redirect('/login');
  }

  try {
    const blogData = await Blog.findAll({
      where: {
        user_id: req.session.user_id
      },
      include: [
        {
          model: User
        }
      ]
    });
    const blogs = blogData.map((blog) => blog.get({ plain: true }));
    res.render('dashboard', {
      blogs,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/signup', (req, res) => {

  res.render('signup');

});

router.post('/signup', async (req, res) => {
  try {
      const { email, password, name } = req.body
      const newUser = new User({ email, password, name })
      await newUser.save()

  // Set session
  req.session.user_id = newUser.id;
  req.session.logged_in = true;

  res.status(201).send('User created successfully')

  } catch (error) {
      console.log(error)
      res.status(500).send('Error creating user')
  }
});


module.exports = router;
