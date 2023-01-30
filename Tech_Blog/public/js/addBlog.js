document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault();
    const blogTitle = document.getElementById("blogTitle").value;
    const blogContent = document.getElementById("blogContent").value;
    fetch("/api/users/addBlog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blogTitle, blogContent })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        document.location.replace('/dashboard');

    })
    .catch(error => {
        console.error(error);
        document.location.replace('/dashboard');

    });
});
