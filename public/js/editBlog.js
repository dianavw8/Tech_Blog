const editButton = document.querySelector('#edit-blog-button');

editButton.addEventListener('click', function() {
  const blogId = this.getAttribute('data-blog-id');
  window.location.href = `/editBlog/${blogId}`;
});

// fetch("/editBlog", {
//   method: "GET",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify({ blogTitle, blogContent })
// })