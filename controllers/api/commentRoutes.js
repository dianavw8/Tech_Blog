const router = require('express').Router();
const { User } = require('../../models');
const { Blog } = require('../../models');
const { Comment } = require('../../models');

//create comment on existing blogs
//save update comments by clicking submit button redirected to dashboard to see blog and updatedcomments
//comment username and date created must be shown


  router.post('/addComment', async (req, res) => {
    try {
    const { commentText, blog_id } = req.body;
    const comments_user_id = req.session.user_id;
    const date_posted = new Date();
    const newComment = new Comment({
        blog_id,
        text: commentText,
        date_posted,
        comments_user_id
    });
    await newComment.save()

      // Fetch the comment with the associated user
      const commentWithUser = await Comment.findByPk(newComment.id, {
        include: { model: User },
      });
  
      res.status(201).json(commentWithUser);
  } catch (error) {
    console.log(error)
    res.status(500).send('Error creating comment')
  }
  });

  

  
module.exports = router;