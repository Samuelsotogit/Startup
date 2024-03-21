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

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

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


// apiRouter.post('/post', (req, res) => {
//   let post = req.body
//   post.id = counter;
//   post.ratings = [];
//   counter++;
//   posts.push(post)
//   res.send(post)
//   // res.sendStatus(200)
// });

apiRouter.put('/posts/:rating/:id', (req, res) => {
  updateRating(req.params.id,req.params.rating)
  res.send(posts)
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// CreateAuth token for a new user
apiRouter.post('/auth/create', async (req, res) => {
  if (await DB.getUser(req.body.username)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await DB.createUser(req.body.username, req.body.email, req.body.password);

    // Set the cookie
    setAuthCookie(res, user.token);

    res.send({
      id: user._id,
    });
  }
});

// GetAuth token for the provided credentials
apiRouter.post('/auth/login', async (req, res) => {
  const user = await DB.getUser(req.body.username);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      setAuthCookie(res, user.token);
      res.send({ id: user._id });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// DeleteAuth token if stored in cookie
apiRouter.delete('/auth/logout', (_req, res) => {
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// GetUser returns information about a user
apiRouter.get('/user/:email', async (req, res) => {
  const user = await DB.getUser(req.params.email);
  if (user) {
    const token = req?.cookies.token;
    res.send({ email: user.email, authenticated: token === user.token });
    return;
  }
  res.status(404).send({ msg: 'Unknown' });
});

// secureApiRouter verifies credentials for endpoints
var secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
  authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

// GetScores
secureApiRouter.get('/scores', async (req, res) => {
  const scores = await DB.getHighScores();
  res.send(scores);
});

// SubmitScore
secureApiRouter.post('/post', async (req, res) => {
  let post = req.body;
  // const post = { ...req.body, ip: req.ip };
  let updatedPost = await DB.addPost(post);
  console.log(updatedPost);
  res.send(updatedPost);
});

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

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
