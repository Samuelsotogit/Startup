const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');
const bcrypt = require('bcrypt');
const uuid = require('uuid');


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
  
  async function getTopRated() {
  // Query the documents
  const query = { "rating": { $gt: 0, $lt: 5 } };
  const options = {
    post: { post: -1 },
    limit: 10,
  };

  const cursor = collection.find(query, options);
  const rentals = await cursor.toArray();
  rentals.forEach((i) => console.log(i));
}

async function find_maxId() {
  return postsCollection.countDocuments();
};


module.exports = {
  getUser,
  getUserByToken,
  createUser,
  addPost,
  getTopRated,
  find_maxId,
};

// main().catch(console.error);