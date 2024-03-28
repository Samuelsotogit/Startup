const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const ObjectId = require('mongodb').ObjectId


  // Connect to the database cluster
  const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
  const client = new MongoClient(url);
  const db = client.db('rental');
  const userCollection = db.collection('user');
  const postsCollection = db.collection('posts');

  // Test that you can connect to the database
  (async function testConnection() {
    await client.connect();
    await db.command({ ping: 1 });
  })().catch((ex) => {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  });


  function getUser(username) {
    return userCollection.findOne({ username: username});
  }

  // I created this function to retrieve the email associated with the given username entered upon login.
  function emailExists(email) {
    return userCollection.findOne({ email: email });
  }
  

  function getUserByToken(token) {
    return userCollection.findOne({ token: token});
  }

  async function createUser(username, email, password) {
    const passwordHash = await bcrypt.hash(password, 10);
    
    const user = {
      username: username,
      email: email,
      password: passwordHash,
      token: uuid.v4(),
    };
    await userCollection.insertOne(user);

    return user;
  }

  async function addPost(post) {
    await postsCollection.insertOne(post);
    return post;
  }
  
  async function getPost() {
  // Query the documents
  const query = { "rating": { $gt: 0, $lt: 5 } };
  const options = {
    post: { post: -1 },
    limit: 1,
  };
    // const cursor = collection.find(query, options);
  // const rentals = await cursor.toArray();
  // rentals.forEach((i) => console.log(i));
};

async function getAllPost() {
  const posts_array = await postsCollection.find().toArray()
  return posts_array
};

// async function updatePost(id, rating) {
//   rating = parseInt(rating);
//   // await postsCollection.updateOne({'_id': ObjectId(id) },{$set:{rating}})
//   await postsCollection.updateOne(
//     { '_id': ObjectId(id) },
//     { 
//         $push: { 'ratings': rating }, // Append the new rating to the 'ratings' array
//         $set: { 'rating': { $avg: ['$rating', rating] } } // Calculate the average rating
//     }
// );
// }

const updatePost = async (postId, newRating) => {
  try {
      // Find the post by its ObjectId
      const post = await postsCollection.findOne({ '_id': ObjectId(postId) });
      if (!post) {
          throw new Error('Post not found');
      }

      // Push the new rating into the 'ratings' array
      post.ratings.push(newRating);

      // Calculate the average rating
      const sum = post.ratings.reduce((acc, curr) => acc + curr, 0);
      const averageRating = sum / post.ratings.length;

      // Update the 'rating' field of the post
      post.rating = averageRating;

      // Update the post in the database
      await postsCollection.updateOne(
          { '_id': ObjectId(postId) },
          { $set: { 'ratings': post.ratings, 'rating': averageRating } }
      );

      // Return the updated post
      return post;
  } catch (error) {
      throw error; // Handle the error appropriately
  }
};

module.exports = { updatePost };



async function find_maxId() {
  return postsCollection.countDocuments();
};


module.exports = {
  getUser,
  getUserByToken,
  createUser,
  addPost,
  getPost,
  find_maxId,
  getAllPost,
  updatePost,
};

// main().catch(console.error);