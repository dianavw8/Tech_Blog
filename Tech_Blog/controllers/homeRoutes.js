const router = require('express').Router();
const { Blog, User} = require('../models');

router.get('/', async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: [
        {
          model: User
        }
      ]
    });
    const blogs = blogData.map((blog) => blog.get({ plain: true}));
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


router.get("/editBlog/:blogId", (req, res) => {
  const blogId = req.params.blogId;

  const blog = Blog.findOne({ where: { id: blogId} });
  if (!blog) {
    return res.status(404).send({ error: "Blog not found" });
  }

  res.render('editBlog',{
    blog
 });
});

router.get('/dashboard', async (req, res) => {
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
    const blogs = blogData.map((blog) => blog.get({ plain: true}));
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

module.exports = router;
