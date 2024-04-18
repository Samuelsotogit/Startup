import React, { useState, useEffect } from 'react';


// export function Scores() {
//   const [scores, setScores] = React.useState([]);

//   // Demonstrates calling a service asynchronously so that
//   // React can properly update state objects with the results.
//   React.useEffect(() => {
//     fetch('/api/post')
//       .then((response) => response.json())
//       .then((scores) => {
//         setScores(scores);
//         localStorage.setItem('scores', JSON.stringify(scores));
//       })
//       .catch(() => {
//         const scoresText = localStorage.getItem('scores');
//         if (scoresText) {
//           setScores(JSON.parse(scoresText));
//         }
//       });
//   }, []);

//   // Demonstrates rendering an array with React
//   const scoreRows = [];
// if (scores.length) {
//   for (const [i, score] of scores.entries()) {
//     scoreRows.push(
//       <div className="post-inner-container">
//         <p className="text-container">{post.userName}: {post.postContent}</p>
//         <div className="stars-container" data-post-id={post._id}>
//           <div onClick={() => handleStarClick(1, post._id)}> </div>
//           <div onClick={() => handleStarClick(2, post._id)}> </div>
//           <div onClick={() => handleStarClick(3, post._id)}> </div>
//           <div onClick={() => handleStarClick(4, post._id)}> </div>
//           <div onClick={() => handleStarClick(5, post._id)}> </div>
//         </div>
//       </div>
//       <div className="post-rating-container">
//         <span className="average-rating">Rating: {typeof post.rating === 'number' ? post.rating.toFixed(1) : 'N/A'}</span><br /> {/* Display the average rating */}
//       </div>
//     );
//   }
// } else {
//   scoreRows.push(
//     <tr key='0'>
//       <td colSpan='4'>Be the first to score</td>
//     </tr>
//   );
// }


//   return (
//     <main className='container-fluid bg-secondary text-center'>
//       <table className='table table-warning table-striped-columns'>
//         <thead className='table-dark'>
//           <tr>
//             <th>#</th>
//             <th>Name</th>
//             <th>Score</th>
//             <th>Date</th>
//           </tr>
//         </thead>
//         <tbody id='scores'>{scoreRows}</tbody>
//       </table>
//     </main>
//   );
// }


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