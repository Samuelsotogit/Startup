// Use object later to keep track of ratings and display top rated posts.
function create_post() {
        const userName = localStorage.getItem("userName");
        const postContent = document.getElementById("postContent").value;
        let posts = [];
        const postsText = localStorage.getItem('posts');
        if (postsText) {
          posts = JSON.parse(postsText);
        }
        let post = {"userName":userName, "rating":0 , "postContent" : postContent}
        posts.push(post)
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
    <p>Post from ${post.userName}: ${post.postContent}</p>
    <fieldset class="star-rating">
        <label for="star1"></label>
        <input type="radio" id="star1" name="rating" value="1" />
        <label for="star2"></label>
        <input type="radio" id="star2" name="rating" value="2" />
        <label for="star3"></label>
        <input type="radio" id="star3" name="rating" value="3" />
        <label for="star4"></label>
        <input type="radio" id="star4" name="rating" value="4" />
        <label for="star5"></label>
        <input type="radio" id="star5" name="rating" value="5" />
        <span id="save-icon" class="material-symbols-outlined">
        bookmark
        </span>
    </fieldset>
    `;
    var feed = document.getElementById('feed');
    feed.prepend(newPost);
    document.getElementById('postForm').style.display = 'none';
  }

let posts = [];
const postsText = localStorage.getItem('posts');
if (postsText) {
    posts = JSON.parse(postsText);
    posts.forEach(post => {
        upload_post(post);
    });
}

const star1 = document.getElementById("star1")
const star2 = document.getElementById("star2")
const star3 = document.getElementById("star3")
const star4 = document.getElementById("star4")
const star5 = document.getElementById("star5")

// Define a function to update the rating of a post
function updateRating(postIndex, rating) {
  // Retrieve the posts from local storage
  let posts = JSON.parse(localStorage.getItem('posts'));

  // Update the rating and increment the number of ratings of the specified post
  posts[postIndex].rating += rating;
  posts[postIndex].num_of_ratings++;

  // Update the local storage with the modified posts
  localStorage.setItem('posts', JSON.stringify(posts));
}

// Add event listeners to stars to update the rating when clicked
star1.addEventListener("click", () => {
  const postIndex = 0; // Adjust this index according to your implementation
  updateRating(postIndex, 1);
});

star2.addEventListener("click", () => {
  const postIndex = 0; // Adjust this index according to your implementation
  updateRating(postIndex, 2);
});

star3.addEventListener("click", () => {
  const postIndex = 0; // Adjust this index according to your implementation
  updateRating(postIndex, 3);
});

star4.addEventListener("click", () => {
  const postIndex = 0; // Adjust this index according to your implementation
  updateRating(postIndex, 4);
});

star5.addEventListener("click", () => {
  const postIndex = 0; // Adjust this index according to your implementation
  updateRating(postIndex, 5);
});

// Function to sort posts based on the number of ratings
function sortPostsByRatings(posts) {
  return posts.sort((a, b) => b.num_of_ratings - a.num_of_ratings);
}

// Example usage: Sort posts based on the number of ratings (This is a sorted array of posts)
let sortedPosts = sortPostsByRatings(posts);


// function keep_count(event) {
//   const count = 0;

// }

// star1.addEventListener("click",keep_count)
// star2.addEventListener("click",keep_count)
// star3.addEventListener("click",keep_count)
// star4.addEventListener("click",keep_count)
// star5.addEventListener("click",keep_count)

async function display_notification(message) {
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.textContent = message;
    feed.prepend(notification);
    setTimeout(() => {
        notification.remove();
    }, 15000); 
}


