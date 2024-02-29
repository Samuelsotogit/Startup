// Use object later to keep track of ratings and display top rated posts.
function create_post() {
        const userName = localStorage.getItem("userName");
        const postContent = document.getElementById("postContent").value;
        let posts = [];
        const postsText = localStorage.getItem('posts');
        if (postsText) {
          posts = JSON.parse(postsText);
        }
        let post = {"userName":userName, "rating":1 , "postContent" : postContent}
        posts.push(post)
        // console.log(post);
        localStorage.setItem('posts', JSON.stringify(posts));
        upload_post(post);

        display_notification(`${userName} made a new post!`);
}


function showPostForm() {
    document.getElementById('postForm').style.display = 'block';
  }

function upload_post(post) {
    var postContent = document.getElementById('postContent').value;
    var newPost = document.createElement('div');
    newPost.innerHTML = `
    <p>Post from ${post.userName}: ${postContent}</p>
    <fieldset class="star-rating">
        <label for="john_star1"></label>
        <input type="radio" id="john_star1" name="john_rating" value="1" />
        <label for="john_star2"></label>
        <input type="radio" id="john_star2" name="john_rating" value="2" />
        <label for="john_star3"></label>
        <input type="radio" id="john_star3" name="john_rating" value="3" />
        <label for="john_star4"></label>
        <input type="radio" id="john_star4" name="john_rating" value="4" />
        <label for="john_star5"></label>
        <input type="radio" id="john_star5" name="john_rating" value="5" />
        <span id="save-icon" class="material-symbols-outlined">
        bookmark
        </span>
    </fieldset>
    `;
    var feed = document.getElementById('feed');
    feed.prepend(newPost);
    document.getElementById('postForm').style.display = 'none';
  }

// posts.forEach(rating =>  {
//     upload_post(rating);
// });

let posts = [];
const postsText = localStorage.getItem('posts');
if (postsText) {
    posts = JSON.parse(postsText);
    posts.forEach(post => {
        upload_post(post);
    });
}

function display_notification(message) {
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.textContent = message;
    feed.prepend(notification);
    setTimeout(() => {
        notification.remove();
    }, 15000); 
}
