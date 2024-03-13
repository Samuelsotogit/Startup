const express = require('express');
const app = express();

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// GetPosts
apiRouter.get('/post', (_req, res) => {
  res.send(posts);
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

apiRouter.post('/post', (req, res) => {
  let post = req.body
  post.id = counter;
  post.ratings = [];
  counter++;
  posts.push(post)
  res.send(post)
  // res.sendStatus(200)
});

apiRouter.put('/posts/:rating/:id', (req, res) => {
  updateRating(req.params.id,req.params.rating)
  res.send(posts)
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});


// JS

let posts = [];

let counter = 0;

function updateRating(id, rating) {
      posts.forEach((post) => {
        console.log(post)
        console.log(id)
        if (post.id == id) {
          console.log(post);
          post.ratings.push(rating)
          let sum = post.ratings.reduce((acc, curr) => acc + curr, 0);
          post.rating = sum/post.ratings.length;
          posts = posts.sort((a, b) => b.rating - a.rating);
        }
      });
  // console.log('posts:', posts); // Log the posts array
  // console.log('id:', id); // Log the id
  // console.log('posts[id]:', posts[id]); // Log the post at the specified index
  // console.log('post[id].ratings:', posts[id].ratings)
  // if (posts[id]) {
  //     // Ensure the ratings array exists for the post
  //     if (!id.hasOwnProperty("ratings")) {
  //         posts[id].ratings = []; // Initialize ratings array if it doesn't exist
  //     }
  //     posts[id].ratings.push(rating); // Store the new rating
  //     let sum = posts[id].ratings.reduce((acc, curr) => acc + curr, 0);
  //     posts[id].rating = sum / posts[id].ratings.length; // Calculate average rating
  //     posts = posts.sort((a, b) => b.rating - a.rating);
      // localStorage.setItem('posts', JSON.stringify(posts));
      return posts; // Re-render posts after update
  } 
      // console.error('Invalid id:', id); // Log an error if id is out of range
  
