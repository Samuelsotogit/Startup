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

  function updateRating(postIndex, rating) {
    let posts = JSON.parse(localStorage.getItem('posts'));
    posts[postIndex].ratings.push(rating); // Store the new rating
    let sum = posts[postIndex].ratings.reduce((acc, curr) => acc + curr, 0);
    posts[postIndex].rating = sum / posts[postIndex].ratings.length; // Calculate average rating
    localStorage.setItem('posts', JSON.stringify(posts));
    renderPosts(posts); // Re-render posts after update
}

function upload_post(post, postIndex) {
    var postContent = document.getElementById('postContent').value;
    var newPost = document.createElement('div');
    newPost.classList.add("post-outer-container");
    newPost.innerHTML = `<div class = "post-inner-container">
    <p>Post from ${post.userName}: ${post.postContent}</p>
    <fieldset id="starRating${postIndex}" class="star-rating">
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
    </div>
    <div class = "post-rating-container">
    <span class = "average-rating">Rating: ${post.rating.toFixed(1)}</span><br> <!-- Display the average rating -->
    </div>
    `;
    var feed = document.getElementById('feed');
    feed.prepend(newPost);
    document.getElementById('postForm').style.display = 'none';

    // Uncheck all radio buttons (remove any pre-selection)
    newPost.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.checked = false;
    });
}

// Function to render posts
function renderPosts(posts) {
    const feed = document.getElementById("feed");
    feed.innerHTML = '';
    posts.forEach((post, index) => {
        upload_post(post, index); // Pass index to upload_post function
    });
}


let posts = [];
const postsText = localStorage.getItem('posts');
if (postsText) {
    posts = JSON.parse(postsText);
    posts = sortPostsByRatings(posts);
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

  posts = sortPostsByRatings(posts);
  const feed = document.getElementById("feed");
  feed.innerHTML = '';
  posts.forEach(post => {
    upload_post(post);
  });
}

// Add event listeners to stars to update the rating when clicked
star1.addEventListener("click", () => {
  const postIndex = 1;
  updateRating(postIndex, 1);
});

star2.addEventListener("click", () => {
  const postIndex = 1; 
  updateRating(postIndex, 2);
});

star3.addEventListener("click", () => {
  const postIndex = 1; 
  updateRating(postIndex, 3);
});

star4.addEventListener("click", () => {
  const postIndex = 1; 
  updateRating(postIndex, 4);
});

star5.addEventListener("click", () => {
  const postIndex = 1; 
  updateRating(postIndex, 5);
});

// Function to sort posts based on the number of ratings
function sortPostsByRatings(posts) {
  return posts.sort((a, b) => b.num_of_ratings - a.num_of_ratings);
}

// Sort posts based on the number of ratings (This is a sorted array of posts)
let sortedPosts = sortPostsByRatings(posts);

async function display_notification(message) {
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.textContent = message;
    feed.prepend(notification);
    setTimeout(() => {
        notification.remove();
    }, 15000); 
}


