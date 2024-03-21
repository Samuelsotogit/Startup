let posts = [];

async function create_post() {
  const userName = localStorage.getItem("userName");
  const postContent = document.getElementById("postContent").value;
  let post = {
    "userName": userName,
    "ratings": [], // Ensure that ratings array is initialized
    "rating": 0,
    "postContent": postContent
    };
    try {
      let response = await fetch('/api/post', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(post),
      });
      post = await response.json();

    } catch {
      // If there was an error then just track scores locally
      console.log('Unable to get post');
    }

  posts.push(post)
  localStorage.setItem('posts', JSON.stringify(posts));
  upload_post(post,posts.length-1);

  display_notification(`${userName} made a new post!`);
}

function showPostForm() {
    document.getElementById('postForm').style.display = 'block';
  }

function upload_post(post) {
    console.log(post);
    let postContent = document.getElementById('postContent').value;
    let newPost = document.createElement('div');
    newPost.classList.add("post-outer-container");
    newPost.innerHTML = `<div class = "post-inner-container">
    <p class = "text-container">${post.userName}: ${post.postContent}</p>
    <div onclick="handleStarClick(1,${post.id})"> ${post.id} 1 star</div>
    <div onclick="handleStarClick(2,${post.id})"> ${post.id} 2 star</div>
    <div onclick="handleStarClick(3,${post.id})"> ${post.id} 3 star</div>
    <div onclick="handleStarClick(4,${post.id})"> ${post.id} 4 star</div>
    <div onclick="handleStarClick(5,${post.id})"> ${post.id} 5 star</div>
    </div>
    <div class = "post-rating-container">
    <span class = "average-rating">Rating: ${post.rating.toFixed(1)}</span><br> <!-- Display the average rating -->
    </div>
    `;
    // let newPost = make_post(post)
    let feed = document.getElementById('feed');
    feed.prepend(newPost);
    document.getElementById('postForm').style.display = 'none';

    // Uncheck all radio buttons (remove any pre-selection)
    // changed
    newPost.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.checked = false;
    });
}

// Event Listener
async function handleStarClick(rating,id) {
  // let star = event.target;
  // console.log(event.target.parentElement);
  // console.log(star.closest('.star-rating').dataset)
  console.log(id);
  // const id2 = star.closest('.star-rating').dataset.id;
  // console.log(id2);
  // const rating = parseInt(star.value);
  // updateRating(id, rating);
  try {
    const results = await fetch(`/api/posts/${rating}/${id}`, {
      method: 'PUT',
      headers: {'content-type': 'application/json'},
    });
    renderPosts(await results.json());
  } catch {
    // If there was an error then just track scores locally
    console.log('Unable to update rating');
  }
}

// Function to render posts
function renderPosts(posts) {
  console.log(posts);
  const feed = document.getElementById("feed");
  feed.innerHTML = '';
  // for (let i = posts.length - 1; i >= 0; i--) {
    for (let i = 0;i < posts.length; i++) {
      upload_post(posts[i]);
  }
}


// Function to sort posts based on the rating
function sortPostsByRatings(posts) {
  return posts.sort((a, b) => a.rating - b.rating);
}

async function display_notification(message) {
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.textContent = message;
    feed.prepend(notification);
    setTimeout(() => {
        notification.remove();
    }, 15000); 
}


async function load_posts() {
try {
  const response = await fetch('/api/post');
  posts = await response.json();
  localStorage.setItem('posts', JSON.stringify(scores));
} catch {
  // If there was an error then just track scores locally
  console.log('Unable to get post');
}
    posts = sortPostsByRatings(posts);
    renderPosts(posts);
}

load_posts()

{/* <fieldset id="starRating${post.ratings}" class="star-rating" data-post-index="${post.id}">
        <label for="star1"></label>
        <input type="radio" id="star1" onclick = "handleStarClick(1,${post.id})" name="rating" value="1" />
        <label for="star2"></label>
        <input type="radio" id="star2" onclick = "handleStarClick(2,${post.id})" name="rating" value="2" />
        <label for="star3"></label>
        <input type="radio" id="star3" onclick = "handleStarClick(3,${post.id})" name="rating" value="3" />
        <label for="star4"></label>
        <input type="radio" id="star4" onclick = "handleStarClick(4,${post.id})" name="rating" value="4" />
        <label for="star5"></label>
        <input type="radio" id="star5" onclick = "handleStarClick(5,${post.id})" name="rating" value="5" />
        <span id="save-icon" class="material-symbols-outlined">
        bookmark
        </span>
    </fieldset> */}