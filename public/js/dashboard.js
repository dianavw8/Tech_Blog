document.getElementById("add-blog-btn").addEventListener("click", function() {
    document.location.replace('/addBlog');

});

// the fetch request is sent to the /api/users/addBlog endpoint just like before. If the request is successful, the user is redirected to the /dashboard endpoint where their new blog will be posted. If there's an error, the error is logged to the console.
// document.querySelector("form").addEventListener("submit", function(event) {
//     event.preventDefault();
//     const blogTitle = document.getElementById("blogTitle").value;
//     const blogContent = document.getElementById("blogContent").value;
//     fetch("/api/users/addBlog", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ blogTitle, blogContent })
//     })
//       .then(response => response.json())
//       .then(data => {
//         console.log(data);
//         document.location.replace("/dashboard");
//       })
//       .catch(error => {
//         console.error(error);
//       });
//   });
  



// document.getElementById("edit-blog-btn").addEventListener("click", function() {
//     var blogId = blog.id;
//     console.log(blogId);
//     //document.location.replace(`/editBlog?blogId=${blogId}`);
//   });