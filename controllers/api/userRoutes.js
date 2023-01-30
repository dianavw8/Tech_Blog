const router = require('express').Router();
const { User } = require('../../models');
const { Blog } = require('../../models');

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.post('/signup', async (req, res) => {
  try {
      const { email, password, name } = req.body
      const saltRounds = 10
      const newUser = new User({ email, password, name })
      await newUser.save()
      res.status(201).send('User created successfully')
  } catch (error) {
      console.log(error)
      res.status(500).send('Error creating user')
  }
})


router.post('/addBlog', async (req, res) => {
  try {
  const { blogTitle, blogContent } = req.body;
  const user_id = req.session.user_id;
  const created_at = new Date();
  const newBlog = new Blog({
      title: blogTitle,
      content: blogContent,
      created_at,
      user_id
  });
  await newBlog.save()
  res.status(201).send('Blog created successfully')
} catch (error) {
  console.log(error)
  res.status(500).send('Error creating blog')
}
});

router.get("/blogs/:blogId", (req, res) => {
  const blogId = req.params.blogId;

  const blog = Blog.findOne({ where: { id: blogId} });
  if (!blog) {
    return res.status(404).send({ error: "Blog not found" });
  }

  res.status(200).json(blog);
});
module.exports = router;
