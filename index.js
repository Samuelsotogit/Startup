const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
const DB = require('./database.js');

const authCookieName = 'token';

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
      // posts.forEach((post) => {
      //   console.log(post)
      //   console.log(id)
      //   if (post.id == id) {
      //     console.log(post);
      //     post.ratings.push(rating)
      //     let sum = post.ratings.reduce((acc, curr) => acc + curr, 0);
      //     post.rating = sum/post.ratings.length;
      //     posts = posts.sort((a, b) => b.rating - a.rating);
      //   }
      // });
  // console.log('posts:', posts); // Log the posts array
  // console.log('id:', id); // Log the id
  // console.log('posts[id]:', posts[id]); // Log the post at the specified index
  // console.log('post[id].ratings:', posts[id].ratings)
  if (posts[id]) {
      // Ensure the ratings array exists for the post
      if (!posts[id].hasOwnProperty("ratings")) {
        posts[id].ratings = []; // Initialize ratings array if it doesn't exist
      }
      posts[id].ratings.push(rating); // Store the new rating
      console.log('posts[id]:', posts[id]);
      // let sum = posts[id].ratings.reduce((acc, curr) => acc + curr, 0);
      // posts[id].rating = sum / posts[id].ratings.length; 
      posts[id].rating = calculateAverage(posts[id].ratings)// Calculate average rating
      console.log(posts[id].rating)
      // posts = posts.sort((a, b) => b.rating - a.rating);
      // localStorage.setItem('posts', JSON.stringify(posts));
      return posts; // Re-render posts after update
  } 
      // console.error('Invalid id:', id); // Log an error if id is out of range
}

function calculateAverage(numbers) {
  if (numbers.length === 0) {
      return 0; // Return 0 if the array is empty
  }
  
  var sum = 0;
  for (var i = 0; i < numbers.length; i++) {
      // Convert each string into a number using parseFloat
      var num = parseFloat(numbers[i]);
      // Check if the conversion resulted in a valid number
      if (!isNaN(num)) {
          sum += num;
      }
  }
  
  return sum / numbers.length;
}
