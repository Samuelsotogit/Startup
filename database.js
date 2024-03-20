const { MongoClient } = require('mongodb');
const config = require('../dbConfig.json');
const bcrypt = require('bcrypt');
const uuid = require('uuid');

async function main() {
  // Connect to the database cluster
  const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
  const client = new MongoClient(url);
  const db = client.db('rental');
  const userCollection = db.collection('user');
  const postsCollection = db.Collection('posts');

  // Test that you can connect to the database
  (async function testConnection() {
    await client.connect();
    await db.command({ ping: 1 });
  })().catch((ex) => {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  });


  function getUser(email) {
    return userCollection.findOne({ emial: email});
  }

  function getUserByToken(token) {
    return userCollection.findOne({ token: token});
  }

  async function createUser(email, password) {
    const passwordHash = await bcrypt.hash(password, 10);
    
    const user = {
      email: email,
      password: passwordHash,
      token: uuid.v4(),
    };
    await userCollection.insertOne(user);

    return user;
  }

  function addPost(post) {
    postsCollection.insertOne(post);
  }

  // Insert a document
  const house = {
    name: 'Beachfront views',
    summary: 'From your bedroom to the beach, no shoes required',
    property_type: 'Condo',
    beds: 1,
  };
  await collection.insertOne(house);

  // Query the documents
  const query = { property_type: 'Condo', beds: { $lt: 2 } };
  const options = {
    sort: { score: -1 },
    limit: 10,
  };

  const cursor = collection.find(query, options);
  const rentals = await cursor.toArray();
  rentals.forEach((i) => console.log(i));
}

main().catch(console.error);