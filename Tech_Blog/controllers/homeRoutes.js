const router = require('express').Router();
const { Blog } = require('../models');

router.get('/', async (req, res) => {
  try {
    const blogData = await Blog.findAll({});
    const blogs = blogData.map((blog) => blog.get({ plain: true}));
    res.render('homepage', {
       blogs, 
       logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;
