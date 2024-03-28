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
apiRouter.get('/post', async (_req, res) => {
  const posts = await DB.getAllPost();
  res.send(posts);
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

// Gets the rating from MongoDB, uses it to give the right post an updated rating.

apiRouter.put('/posts/:rating/:id', async (req, res) => {
  try {
      const postId = req.params.id;
      const newRating = parseInt(req.params.rating);

      // Update the post with the new rating
      const updatedPost = await DB.updatePost(postId, newRating);

      // Retrieve all posts (assuming this function retrieves all posts)
      const posts = await DB.getAllPost();

      // Send the updated posts back as the response
      res.json(posts);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
  }
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

// SubmitPost (Create a Post)
secureApiRouter.post('/post', async (req, res) => {
  let max_id = await DB.find_maxId();
  let post = req.body;
  post.id = await max_id+1;
  let updatedPost = await DB.addPost(post);
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

function updateRating(posts, id, rating) {
  if (posts[id]) {
      // Ensure the ratings array exists for the post
      if (!posts[id].hasOwnProperty("ratings")) {
        posts[id].ratings = []; // Initialize ratings array if it doesn't exist
      }
      posts[id].ratings.push(rating); // Store the new rating
      posts[id].rating = calculateAverage(posts[id].ratings)// Calculate average rating
      return posts; // Re-render posts after update
  } 
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

// async function alertMessage(message) {
//   let alert = document.createElement('div');
//   alert.classList.add('alert');
//   alert.textContent = message;
//   loginPage.prepend(alert);
//   setTimeout(() => {
//       alert.remove();
//   }, 10000); 
// }