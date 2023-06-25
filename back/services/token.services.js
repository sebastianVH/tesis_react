import jwt from "jsonwebtoken";
import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient("mongodb://127.0.0.1:27017");
const db = client.db("testTesis1");
const tokensCollection = db.collection("tokens");

async function createToken(account) {
  const token = jwt.sign(account, "secret-key");
  await tokensCollection.insertOne({
    token,
    account: new ObjectId(account._id),
  });

  return token;
}

async function verifyToken(token) {
  try {
    const account = jwt.verify(token, "secret-key");

    const tokenFind = await tokensCollection.findOne({
      token,
      account: new ObjectId(account._id),
    });

    if (!tokenFind) {
      return false;
    }

    return account;
  } catch (err) {
    return false;
  }
}

async function removeToken(token, account) {
  return tokensCollection.deleteOne({
    token,
    account: new ObjectId(account._id),
  });
}

export { createToken, verifyToken, removeToken };
