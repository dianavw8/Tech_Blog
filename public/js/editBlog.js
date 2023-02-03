const editButton = document.querySelector('#edit-blog-button');

editButton.addEventListener('click', function() {
  const blogId = this.getAttribute('data-blog-id');
  window.location.href = `/editBlog/${blogId}`;
});
