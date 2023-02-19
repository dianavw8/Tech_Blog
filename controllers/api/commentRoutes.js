const router = require('express').Router();
const { User } = require('../../models');
const { Blog } = require('../../models');
const { Comment } = require('../../models');

//comment on existing blogs
//save comments by clicking submit button redirected to dashboard
//comment username and date created must be shown

router.get("/:blogId", (req, res) => {
    const blogId = req.params.blogId;
  
    const blog = Blog.findOne({ where: { id: blogId} });
    if (!blog) {
      return res.status(404).send({ error: "Blog not found" });
    }
  
    res.status(200).json(blog);
  });

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

  router.put('/updateBlog/:blogId', async (req, res) => {
    const blogId = req.params.blogId;
  
    const blog = await Blog.findOne({ where: { id: blogId } });
    if (!blog) {
      return res.status(404).send({ error: `Blog ${blogId} not found` });
    }
  
    blog.title = req.body.blogTitle;
    blog.content = req.body.blogContent;
    await blog.save();
  
    res.send({ message: `Blog ${blogId} updated successfully` });
  });
  


  router.delete ('/deleteBlog/:blogId', async (req, res) => {
    const blogId = req.params.blogId;
  
    const blog = await Blog.findOne({ where: { id: blogId } });
    if (!blog) {
      return res.status(404).send({ error: `Blog ${blogId} not found` });
    }
  
    await blog.destroy();
  
    res.send({ message: `Blog ${blogId} deleted successfully` });
    
  });
  
module.exports = router;