let posts = [];
let socket;
const userName = localStorage.getItem("userName");
async function create_post() {
  const postContent = document.getElementById("postContent").value;
  let post = {
    "userName": userName,
    "ratings": [], // Ensure that ratings array is initialized
    "rating": 0,
    // "average_rating": {},
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

  // display_notification(`${userName} made a new post!`);
  broadcastEvent(userName, post_event, {});
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
    <div onclick="handleStarClick(1,'${post._id}')"> '${post._id}' 1 star</div>
    <div onclick="handleStarClick(2,'${post._id}')"> '${post._id}' 2 star</div>
    <div onclick="handleStarClick(3,'${post._id}')"> '${post._id}' 3 star</div>
    <div onclick="handleStarClick(4,'${post._id}')"> '${post._id}' 4 star</div>
    <div onclick="handleStarClick(5,'${post._id}')"> '${post._id}' 5 star</div>
    </div>
    <div class = "post-rating-container">
    <span class = "average-rating">Rating: ${typeof post.rating === 'number' ? post.rating.toFixed(1) : 'N/A'}</span><br> <!-- Display the average rating -->
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

  // Functionality for peer communication using WebSocket

const post_event = "post-event";
function configureWebSocket() {
  const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
  socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
  // socket.onopen = (event) => {
  //   console.log("Websocket Opened");
  // };
  // socket.onclose = (event) => {
  //   console.log("Websocket Closed");
  // };
  socket.onmessage = async (event) => {
    const msg = JSON.parse(await event.data.text());
      display_notification(`${msg.from} made a new post!`);
  };
}

function broadcastEvent(from) {
  const event = {
    from: from,
  };
  socket.send(JSON.stringify(event));
};

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

configureWebSocket();
