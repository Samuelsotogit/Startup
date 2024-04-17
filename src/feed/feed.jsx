import React, { useState, useEffect } from 'react';

export function MainFeed() {
  const [posts, setPosts] = useState([]);
  const [socket, setSocket] = useState(null);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    loadPosts();
    configureWebSocket();
    setUserName(localStorage.getItem("userName"));
  }, []);

  async function loadPosts() {
    try {
      const response = await fetch('/api/post');
      const fetchedPosts = await response.json();
      setPosts(sortPostsByRatings(fetchedPosts));
    } catch {
      console.log('Unable to get posts');
    }
  }

  function configureWebSocket() {
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    const newSocket = new WebSocket(`${protocol}://${window.location.host}/ws`);
    setSocket(newSocket);

    newSocket.onmessage = async (event) => {
      const msg = JSON.parse(await event.data.text());
      displayNotification(`${msg.from} made a new post!`);
    };
  }

  async function createPost() {
    const postContent = document.getElementById("postContent").value;
    const newPost = {
      userName: userName,
      ratings: [],
      rating: 0,
      postContent: postContent
    };

    try {
      const response = await fetch('/api/post', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(newPost),
      });
      const createdPost = await response.json();
      setPosts([...posts, createdPost]);
      uploadPost(createdPost);
      broadcastEvent(userName);
    } catch {
      console.log('Unable to create post');
    }
  }

  return (
    <main className='container-fluid bg-secondary text-center'>
      <div id="postForm">
        <h2>Make a Post!</h2>
        <form id="postFormContent">
          <label htmlFor="postContent">Enter your post:</label><br />
          <textarea id="postContent" rows="4" cols="50"></textarea><br />
          <button type="button" onClick={createPost}>Confirm</button>
        </form>
      </div>
      <div id="feed" className="feed-background"></div>
      <section class="main-feed-top-bar">
  <div><button class="back-button" onclick="goBack()">Previous</button></div>
  <div><h3 class="top-rated">Top Rated Posts</h3></div>
  <div id="Post-button-container"><button class="Post-button" onclick="showPostForm()">Post</button></div>
</section>
    </main>
  );
}


export function uploadPost(post) {
  return (
    <div className="post-outer-container">
      <div className="post-inner-container">
        <p className="text-container">{post.userName}: {post.postContent}</p>
        <div className="stars-container" data-post-id={post._id}>
          {[1, 2, 3, 4, 5].map(star => (
            <div key={star} onClick={() => handleStarClick(star, post._id)}> </div>
          ))}
        </div>
      </div>
      <div className="post-rating-container">
        <span className="average-rating">Rating: {typeof post.rating === 'number' ? post.rating.toFixed(1) : 'N/A'}</span><br />
      </div>
    </div>
  );
}