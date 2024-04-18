import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function MainFeed({userName}) {
  const navigate = useNavigate();
  const [posts, setPosts] = React.useState([]);
  const [socket, setSocket] = React.useState(null);
  function goBack() {
    navigate(-1);
    // window.history.back();
  }

  // Demonstrates calling a service asynchronously so that
  // React can properly update state objects with the results.
  React.useEffect(() => {
    async function redundant() {
    const response = await fetch('/api/post');
    let postsResponse = await response.json();
    setPosts(postsResponse);
  } 
  redundant();
  configureWebSocket();
}, []);

  // Demonstrates rendering an array with React
  let  PostsList = [];
if (posts.length) {
  let sortedPosts = sortPostsByRatings(posts);
  for (const [i, post] of sortedPosts.entries()) {
    PostsList.push(
      <div key={i}>
      <div className="post-inner-container">
        <p className="text-container">{post.userName}: {post.postContent}</p>
        <div className="stars-container" data-post-id={post._id}>
          <div onClick={() => handleStarClick(1, post._id)}> </div>
          <div onClick={() => handleStarClick(2, post._id)}> </div>
          <div onClick={() => handleStarClick(3, post._id)}> </div>
          <div onClick={() => handleStarClick(4, post._id)}> </div>
          <div onClick={() => handleStarClick(5, post._id)}> </div>
        </div>
      </div>
      <div className="post-rating-container">
        <span className="average-rating">Rating: {typeof post.rating === 'number' ? post.rating.toFixed(1) : 'N/A'}</span><br /> {/* Display the average rating */}
      </div>
      </div>
    );
  }
} else {
  PostsList.push(
    <div key='0'>
      <p>There are no current posts</p>
    </div>
  );
}

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
  // posts.push(post)
  setPosts([...posts,post])
  localStorage.setItem('posts', JSON.stringify(posts));
  // upload_post(post,posts.length-1);

  // display_notification(`${userName} made a new post!`);
  broadcastEvent(userName);
}

function broadcastEvent(from) {
  const event = {
    from: from,
  };
  
  socket.send(JSON.stringify(event));
};

async function handleStarClick(rating,id) {
  try {
    const results = await fetch(`/api/posts/${rating}/${id}`, {
      method: 'PUT',
      headers: {'content-type': 'application/json'},
    });
    // renderPosts(await results.json());
    setPosts(await results.json());
    markClickedStars(id, rating);
  } catch {
    // If there was an error then just track scores locally
    console.log('Unable to update rating');
  }
}

const [showForm, setShowForm] = useState(false);
function toggleForm() {
  setShowForm(!showForm);
}

function configureWebSocket() {
  const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
  let socketVar = new WebSocket(`${protocol}://${window.location.host}/ws`);
  socketVar.onmessage = async (event) => {
    const msg = JSON.parse(await event.data.text());
      display_notification(`${msg.from} made a new post!`);
  };
  setSocket(socketVar);
}

function sortPostsByRatings(posts) {
  return posts.sort((a, b) => b.rating - a.rating);
}

  return (
    <main className='container-fluid bg-secondary text-center'>
      <section className="main-feed-top-bar">
  <div><button className="back-button" onClick={goBack}>Previous</button></div>
  <div><h3 className="top-rated">Top Rated Posts</h3></div>
  <div id="Post-button-container"><button className="Post-button" onClick={toggleForm}>Post</button></div>
</section>
{ showForm ? 
      <div id="postForm">
        <h2>Make a Post!</h2>
        <form id="postFormContent">
          <label htmlFor="postContent">Enter your post:</label><br />
          <textarea id="postContent" rows="4" cols="50"></textarea><br />
          <button type="button" onClick={create_post}>Confirm</button>
        </form>
      </div> : ''}
      <div id="feed" className="feed-background">{PostsList}</div>
    </main>
  );
}



// export function MainFeed() {
  // function goBack() {
  //   // navigate(-1);
  //   window.history.back();
  // }

//   const [showForm, setShowForm] = useState(false);

  // function toggleForm() {
  //   setShowForm(!showForm);
  // }

//   const [posts, setPosts] = useState([]);
//   const [socket, setSocket] = useState(null);
//   const [userName, setUserName] = useState('');

//   useEffect(() => {
//     loadPosts();
//     configureWebSocket();
//     setUserName(localStorage.getItem("userName"));
//   }, []);

//   async function loadPosts() {
//     try {
//       const response = await fetch('/api/post');
//       const fetchedPosts = await response.json();
//       setPosts(sortPostsByRatings(fetchedPosts));
//     } catch {
//       console.log('Unable to get posts');
//     }
//   }

//   function configureWebSocket() {
//     const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
//     const newSocket = new WebSocket(`${protocol}://${window.location.host}/ws`);
//     setSocket(newSocket);

//     newSocket.onmessage = async (event) => {
//       const msg = JSON.parse(await event.data.text());
//       displayNotification(`${msg.from} made a new post!`);
//     };
//   }

//   async function createPost() {
//     const postContent = document.getElementById("postContent").value;
//     const newPost = {
//       userName: userName,
//       ratings: [],
//       rating: 0,
//       postContent: postContent
//     };

//     try {
//       const response = await fetch('/api/post', {
//         method: 'POST',
//         headers: {'content-type': 'application/json'},
//         body: JSON.stringify(newPost),
//       });
//       const createdPost = await response.json();
//       setPosts([...posts, createdPost]);
//       uploadPost(createdPost);
//       broadcastEvent(userName);
//     } catch {
//       console.log('Unable to create post');
//     }
//   }

//   return (
//     <main className='container-fluid bg-secondary text-center'>
//       <div id="postForm">
//         <h2>Make a Post!</h2>
//         <form id="postFormContent">
//           <label htmlFor="postContent">Enter your post:</label><br />
//           <textarea id="postContent" rows="4" cols="50"></textarea><br />
//           <button type="button" onClick={createPost}>Confirm</button>
//         </form>
//       </div>
//       <div id="feed" className="feed-background"></div>
//       <section className="main-feed-top-bar">
//   <div><button className="back-button" onClick={goBack}>Previous</button></div>
//   <div><h3 className="top-rated">Top Rated Posts</h3></div>
//   <div id="Post-button-container"><button className="Post-button" onClick={toggleForm}>Post</button></div>
// </section>
//     </main>
//   );
// }


// export function uploadPost(post) {
//   return (
//     <div className="post-outer-container">
//       <div className="post-inner-container">
//         <p className="text-container">{post.userName}: {post.postContent}</p>
//         <div className="stars-container" data-post-id={post._id}>
//           {[1, 2, 3, 4, 5].map(star => (
//             <div key={star} onClick={() => handleStarClick(star, post._id)}> </div>
//           ))}
//         </div>
//       </div>
//       <div className="post-rating-container">
//         <span className="average-rating">Rating: {typeof post.rating === 'number' ? post.rating.toFixed(1) : 'N/A'}</span><br />
//       </div>
//     </div>
//   );
// }